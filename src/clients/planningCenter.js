const axios = require('axios').default;
const qs = require('qs');

const http = axios.create({
  baseURL: 'https://api.planningcenteronline.com',
  auth: {
    username: process.env.PLANNING_CENTER_APP_ID,
    password: process.env.PLANNING_CENTER_SECRET
  },
  paramsSerializer: (query) => qs.stringify(query)
});

class PlanningCenterApi {

  /**
   * @param {object} params
   * @param {string=} params.search_name                            Search by Name (first, last, combination)
   * @param {string=} params.search_name_or_email                   Search by Name (first, last, combination) or Email
   * @param {string=} params.search_name_or_email_or_phone_number   Search by Name (first, last, combination), Email, or Phone Number
   */
  async listPersons (params) {
    const { data } = await http.get('/people/v2/people', { params });
    return data;
  }

  /**
   * @param {object} params
   * @param {string} params.given_name
   * @param {string} params.first_name
   * @param {string} params.nickname
   * @param {string} params.middle_name
   * @param {string} params.last_name
   * @param {string} params.birthdate
   * @param {string} params.anniversary
   * @param {string} params.gender
   * @param {string} params.grade
   * @param {string} params.child
   * @param {string} params.school_type
   * @param {string} params.graduation_year
   * @param {string} params.site_administrator
   * @param {string} params.accounting_administrator
   * @param {string} params.people_permissions
   * @param {string} params.membership
   * @param {string} params.inactivated_at
   * @param {string} params.status
   * @param {string} params.medical_notes
   * @param {string} params.avatar
   * @param {string} params.primary_campus_id
   * @param {string} params.remote_id
   */
  async createPerson (params) {
    const { data } = await http.post('/people/v2/people', params);
    return data;
  }

  /**
   * Create a phone number for a person.
   *
   * @param {number} personId 
   * @param {object} params 
   * @param {string} params.number
   * @param {string=} params.carrier
   * @param {string=} params.location
   * @param {string=} params.primary
   */
  async createPhoneNumber (personId, params) {
    const { data } = await http.post(`/people/v2/people/${personId}/phone_numbers`, params);
    return data;
  }

  /**
   * Create an email for a user.
   *
   * @param {number} personId 
   * @param {object} params 
   * @param {string} params.address
   * @param {string=} params.location
   * @param {string=} params.primary
   */
  async createEmail (personId, params) {
    const { data } = await http.post(`/people/v2/people/${personId}/emails`, params);
    return data;
  }
}

module.exports = new PlanningCenterApi();
