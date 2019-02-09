const Airtable = require('airtable');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);
const table = airtable('CG Placement Requests');

const list = async (groupName) => {
  const placements = await table.select({
    filterByFormula: `AND(FIND("${groupName}", {Placement}) > 0, {Archived} = FALSE())`
  }).all();
  return placements;
};

module.exports.list = list;
