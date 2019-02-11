const communityGroupController = require('./controller/communityGroupController');
const loginController = require('./controller/loginController');
const configController = require('./controller/configController');
const neighborhoodController = require('./controller/neighborhoodController');
const { authenticate } = require('./middleware/auth');

module.exports = (app) => {
  app.get('/community_groups', authenticate, communityGroupController.fetchCommunityGroups);
  app.put('/community_groups/:groupId', authenticate, communityGroupController.updateCommunityGroup);

  app.get('/neighborhoods', authenticate, neighborhoodController.list)

  app.get('/me', authenticate, (req, res) => res.json(req.user));

  app.get('/configs', configController.getConfigs);

  app.post('/email_login_link', loginController.emailLoginLink);
  app.put('/login', loginController.login);
  app.get('/', (req, res) => res.send('hi'));
};
