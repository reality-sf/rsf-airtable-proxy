const Airtable = require('airtable');
const createAirtableFilter = require('../util/createAirtableFilter');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);
const table = airtable('Newcomers Attendance');

const create = async (body) => {
  const created = await table.create(body);
  return created;
};

const find = async (params) => {
  const rows = await table.select({
    filterByFormula: createAirtableFilter({
      ...params,
      ['Date of Attendance']: params['Date of Attendance'] + 'T00:00:00.000Z'
    })
  }).firstPage();
  return rows;
};

const fetch = async (id) => {
  const row = await table.find(id);
  return row;
};

module.exports = {
  create,
  find,
  fetch
};
