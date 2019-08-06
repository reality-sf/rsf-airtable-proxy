const handleErrors = require('../../util/handleErrors');
const peopleDao = require('../../dao/people');
const _ = require('lodash');

const ALLOWED_FIELDS = [
  'First Name',
  'Last Name',
  'Email',
  'Phone Number',
  'Newcomers Attendance'
];

/**
 * TODO: This should be a privileged operation
 */
module.exports.createPerson = handleErrors(async (req, res) => {
  const person = await peopleDao.create(_.pick(req.body, ALLOWED_FIELDS));
  return res.json(person);
});

/**
 * TODO: This should be a privileged operation
 */
module.exports.updatePerson = handleErrors(async (req, res) => {
  const person = await peopleDao.fetch(req.params.personId);
  await person.updateFields(_.pick(req.body, ALLOWED_FIELDS));
  return res.status(201).json({ message: 'Updated' });
});
