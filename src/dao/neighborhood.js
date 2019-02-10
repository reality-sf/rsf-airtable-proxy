const Airtable = require('airtable');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);
const table = airtable('Neighborhoods');

const list = async () => {
  const records = await table.select({ fields: ['Name', 'Record ID'] }).all();
  return records;
};

module.exports.list = list;
