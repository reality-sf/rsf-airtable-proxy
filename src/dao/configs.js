const Airtable = require('airtable');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);
const table = airtable('Configuration');

const get = async () => {
  const configs = await table.select().all();
  return configs.reduce((acc, cfg) => {
    return {
      ...acc,
      [cfg.fields.Name]: cfg.fields.Value
    };
  }, {});
};

module.exports.get = get;
