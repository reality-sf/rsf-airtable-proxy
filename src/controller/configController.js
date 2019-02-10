const configDao = require('../dao/configs');

module.exports.getConfigs = async (req, res) => {
  const configs = await configDao.get();
  res.json(configs);
};
