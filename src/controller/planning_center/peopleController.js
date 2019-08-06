const api = require('../../clients/planningCenter');
const handleErrors = require('../../util/handleErrors');

module.exports.findPerson = handleErrors(async (req, res) => {
  const response = await api.listPersons(req.query);
  return res.json(response.data);
});

module.exports.createPhoneNumber = handleErrors(async (req, res) => {
  const response = await api.createPhoneNumber(req.params.personId, req.body);
  return res.json(response.data);
});

module.exports.createEmail = handleErrors(async (req, res) => {
  const response = await api.createEmail(req.params.personId, req.body);
  return res.json(response.data);
});
