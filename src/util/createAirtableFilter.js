/**
 * Create an airtable filter string from an object. Uses an OR.
 *
 * @example
 * createAirtableFilter({ 'Email': 'bob@bob.com', 'Phone Number': '(123) 456-7890' });
 * // => OR({Email} = "bob@bob.com", {Phone Number} = "(123) 456-7890");
 * 
 * @param {{ [key: string]: string }} props 
 */
const createAirtableFilter = (props) => {
  const filters = Object.keys(props).map((key) => {
    return `{${key}} = "${props[key]}"`;
  });
  return `OR(${filters.join(', ')})`;
};

module.exports = createAirtableFilter;
