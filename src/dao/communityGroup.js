const Airtable = require('airtable');
// const { toObservable } = require('../util/airtable');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);
const table = airtable('Community Groups');

/**
 * List all community groups that belong to this person.
 */
const list = async (name) => {
  const groups = await table.select({
    filterByFormula: `FIND("${name}", {Leaders}) > 0`
  }).all();
  return groups;
};

/**
 * Fetch a single community group
 * @param {string} id   The AirTable id of this group
 */
const fetch = async (id) => {
  const group = await table.find(id);
  return group;
};

module.exports.list = list;
module.exports.fetch = fetch;
