const api = require('../../clients/planningCenter');
const handleErrors = require('../../util/handleErrors');

// @ts-check

module.exports.createPerson = handleErrors(async (req, res) => {
  const response = await api.createPerson(req.body);
  return res.json(response.data);
});

module.exports.findPerson = handleErrors(async (req, res) => {
  const response = await api.listPersons(req.query);
  return res.json(response.data);
});

module.exports.listPhoneNumber = handleErrors(async (req, res) => {
  const response = await api.listPhoneNumber(req.params.personId);
  return res.json(response.data);
});

module.exports.createPhoneNumber = handleErrors(async (req, res) => {
  const response = await api.createPhoneNumber(req.params.personId, req.body);
  return res.json(response.data);
});

module.exports.listEmail = handleErrors(async (req, res) => {
  const response = await api.listEmail(req.params.personId);
  return res.json(response.data);
});

module.exports.createEmail = handleErrors(async (req, res) => {
  const response = await api.createEmail(req.params.personId, req.body);
  return res.json(response.data);
});
