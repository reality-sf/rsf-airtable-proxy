const Airtable = require('airtable');
const Boom = require('boom');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_CG_BASE);

const table = airtable('People');

/**
 * Retrieve a person by email address.
 */
const fetch = async (email) => {
  const [person] = await table.select({
    filterByFormula: `{Email} = "${email}"`
  }).firstPage();
  if (!person) {
    return Promise.reject(Boom.notFound(`Unable to find person with email address ${email}`));
  }
  return person;
};

module.exports.fetch = fetch;

