const axios = require('axios').default;
const _ = require('lodash');

const http = axios.create({
  baseURL: 'https://developer.planning.center'
});

class PlanningCenterApi {

  /**
   * 
   * @param {object} params
   * @param {string=} params.search_name                            Search by Name (first, last, combination)
   * @param {string=} params.search_name_or_email                   Search by Name (first, last, combination) or Email
   * @param {string=} params.search_name_or_email_or_phone_number   Search by Name (first, last, combination), Email, or Phone Number
   */
  async listPersons (params) {
    const queryParams = _.mapKeys(params, (key) => `where[${key}]`);
    const { data } = await http.get('/people/v2/people', { params: queryParams });
    return data;
  }
}

module.exports = new PlanningCenterApi();
