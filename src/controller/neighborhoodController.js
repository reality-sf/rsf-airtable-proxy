const neighborhoodDao = require('../dao/neighborhood');
const handleErrors = require('../util/handleErrors');
const log = require('../clients/logger').createLogger('neighborhoodController');

const list = handleErrors(log)(async (req, res) => {
  const neighborhoods = await neighborhoodDao.list();
  return res.json(neighborhoods.map((n) => n.fields));
});

module.exports.list = list;
