const Airtable = require('airtable');
const Boom = require('boom');
const createAirtableFilter = require('../util/createAirtableFilter');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);

const table = airtable('People');

/**
 * Fetch a single person.
 *
 * @param {string} id     The airtable id of this person
 */
const fetch = async (id) => {
  const person = await table.find(id);
  return person;
};

/**
 * Retrieve a person by details.
 * @param {object} params
 * @param {string=} params.Email
 * @param {string=} params['Phone Number']
 */
const find = async (params) => {
  const [person] = await table.select({
    filterByFormula: createAirtableFilter(params)
  }).firstPage();
  if (!person) {
    return Promise.reject(Boom.notFound(`Unable to find person with email address ${email}`));
  }
  return person;
};

/**
 * Create a person
 * @param {*} params 
 */
const create = async (params) => {
  const person = await table.create(params);
  return person;
};

module.exports = {
  fetch,
  find,
  create
};
