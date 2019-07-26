const api = require('../clients/planningCenter');
const handleErrors = require('../util/handleErrors');

module.exports.findPerson = handleErrors(async (req, res) => {
  const response = await api.listPersons(req.query);
  return res.json(response.data);
});
