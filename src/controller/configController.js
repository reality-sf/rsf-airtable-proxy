const configDao = require('../dao/configs');
const handleErrors = require('../util/handleErrors');

module.exports.getConfigs = handleErrors(async (req, res) => {
  const configs = await configDao.get();
  res.json(configs);
});
