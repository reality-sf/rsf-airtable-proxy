const peopleDao = require('./src/dao/people');
const cgDao = require('./src/dao/communityGroup');

module.exports = apex(async (e, ctx) => {
  const person = await peopleDao.fetch(req.user.email);
  const groups = await cgDao.list(person.fields.Name);
  res.json(groups.map(g => g.fields));
  return {
    status: 200,
    body: JSON.stringify(groups.map(g => g.fields)),
    headers: {
      'Content-Type': 'application/json'
    }
  };
})

exports.handle = async (e, ctx) => {
};
