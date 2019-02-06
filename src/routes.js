const communityGroupController = require('./controller/communityGroupController');
const loginController = require('./controller/loginController');
const { authenticate } = require('./middleware/auth');

module.exports = (app) => {
  app.get('/community_groups', authenticate, communityGroupController.fetchCommunityGroups);
  app.put('/community_groups/:groupId', authenticate, communityGroupController.updateCommunityGroup);

  app.get('/me', authenticate, (req, res) => res.json(req.user));

  app.post('/email_login_link', loginController.emailLoginLink);
  app.put('/login', loginController.login);
  app.get('/', (req, res) => res.send('hi'));
};
