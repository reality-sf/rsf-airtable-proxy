const handleError = require('../util/handleErrors');
const axios = require('axios');
const { createLogger } = require('../clients/logger');
const jsonwebtoken = require('jsonwebtoken');
const peopleDao = require('../dao/people');
const tokenDao = require('../dao/token');

const log = createLogger('loginController');

const MAX_TOKEN_TTL = 1000 * 60 * 60 * 24 * 30; // 1 month

/**
 * Send an email to this person with a one-time use link to be able to edit the form. The link itself will become
 * revoked if:
 * 1. The link expires. Each link has a TTL of 1 month
 * 2. The link is clicked, which exchanges the link for a JWT.
 */
module.exports.emailLoginLink = handleError(log)(async (req, res) => {
  const person = await peopleDao.fetch(req.body.email);
  const token = await tokenDao.create(req.body.email);
  await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
    link: `${process.env.PUBLIC_URL}/?token=${token.fields.token}`,
    to: `${person.fields.Name} <${req.body.email}>`,
    name: person.fields['First Name']
  });
  res.status(201).end();
});

/**
 * Expire all tokens that have been generated for this user.
 */
const expireTokens = async (email) => {
  const tokens = await tokenDao.list(email);
  await Promise.all(tokens.map((token) => {
    return token.destroy();
  }));
};

/**
 * A "login" action exchanges a one-time token for a jwt. This will revoke all outstanding tokens for this email
 * address.
 */
module.exports.login = handleError(log)(async (req, res) => {
  const token = await tokenDao.fetch(req.body.token);
  if (token.fields.issuedAt > new Date(Date.now() + MAX_TOKEN_TTL).toISOString()) {
    return res.status(403).json({ message: 'This token has already expired' });
  }
  const person = await peopleDao.fetch(token.fields.email);
  await expireTokens(token.fields.email);
  const jwt = jsonwebtoken.sign({
    name: person.fields.Name,
    email: person.fields.Email,
    id: person.id
  }, process.env.JWT_SIGNING_KEY, { expiresIn: '1 day' });
  return res.status(200).json({ jwt });
});
