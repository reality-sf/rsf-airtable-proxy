const airtable = require('./controller/airtable');
const planningCenter = require('./controller/planning_center');
const configController = require('./controller/configController');
const loginController = require('./controller/loginController');
const { authenticate } = require('./middleware/auth');

module.exports = (app) => {
  app.get('/airtable/community_groups', authenticate, airtable.communityGroupController.fetchCommunityGroups);
  app.put('/airtable/community_groups/:groupId', authenticate, airtable.communityGroupController.updateCommunityGroup);

  app.get('/airtable/neighborhoods', authenticate, airtable.neighborhoodController.list);

  app.post('/airtable/people', airtable.peopleController.createPerson);
  app.put('/airtable/people/:personId', airtable.peopleController.updatePerson);

  app.get('/airtable/attendance', airtable.attendanceController.find);
  app.post('/airtable/attendance', airtable.attendanceController.create);
  app.put('/airtable/attendance/:attendanceId', airtable.attendanceController.update);

  app.get('/planning_center/people', planningCenter.peopleController.findPerson);
  // app.post('/planning_center/people', planningCenter.peopleController.createPerson);
  app.post('/planning_center/people/:personId/email', planningCenter.peopleController.createEmail);
  app.post('/planning_center/people/:personId/phone_numbers', planningCenter.peopleController.createPhoneNumber);

  app.get('/me', authenticate, (req, res) => res.json(req.user));

  app.get('/configs', configController.getConfigs);

  app.post('/email_login_link', loginController.emailLoginLink);
  app.put('/login', loginController.login);
  app.get('/', (req, res) => res.send('hi'));
};
