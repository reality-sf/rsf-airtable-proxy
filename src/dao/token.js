const Airtable = require('airtable');
const crypto = require('crypto');
const Boom = require('boom');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BACKEND_BASE);

const table = airtable('tokens');

const genTokenStr = () => crypto.randomBytes(16).toString('hex');

/**
 * Given an email address, create a new token.
 *
 * @param {string} email  The email address
 */
const create = async (email) => {
  const tokenStr = genTokenStr();
  const token = await table.create({
    token: tokenStr,
    email,
    issuedAt: new Date().toISOString()
  });
  return token;
};

/**
 * List all tokens that belong to this email address.
 *
 * @param {string} email  The email address
 */
const list = async (email) => {
  const tokens = await table.select({
    filterByFormula: `{email} = "${email}"`
  }).all();
  return tokens;
};

/**
 * Fetch a token
 * 
 * @param {string} token    The token string
 */
const fetch = async (token) => {
  const [record] = await table.select({
    filterByFormula: `{token} = "${token}"`
  }).firstPage();
  if (!record) {
    return Promise.reject(Boom.notFound('Unable to find a matching token. It either doesn\'t exist, or has already been used'));
  }
  return record;
};

module.exports.create = create;
module.exports.list = list;
module.exports.fetch = fetch;
