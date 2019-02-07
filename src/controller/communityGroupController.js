const { createLogger } = require('../clients/logger');
const handleErrors = require('../util/handleErrors');
const _ = require('lodash');
const peopleDao = require('../dao/people');
const cgDao = require('../dao/communityGroup');

const log = createLogger('communityGroupController');

const ALLOWED_FIELDS = [
  'Capacity Available',
  'Members',
  'Meeting Night',
  'Meeting Start Time',
  'Meeting End Time',
  'Cross Streets',
  'Meeting Address'
];

/**
 * Fetch Community Groups where the leader belongs to this email address.
 */
module.exports.fetchCommunityGroups = handleErrors(log)(async (req, res) => {
  const person = await peopleDao.fetch(req.user.email);
  const groups = await cgDao.list(person.fields.Name);
  res.json(groups.map(g => g.fields));
});

/**
 * Update a community group. Only fields within `ALLOWED_FIELDS` are actually updated.
 */
module.exports.updateCommunityGroup = handleErrors(log)(async (req, res) => {
  const group = await cgDao.fetch(req.params.groupId);
  const leaders = group.fields.Leaders || [];
  if (!leaders.includes(req.user.id)) {
    return res.status(403).json({ message: 'Alas, you are not a leader of this group and unable to modify it.' });
  }
  await group.updateFields({
    ..._.pick(req.body, ALLOWED_FIELDS),
    'Last Update': new Date().toDateString()
  });
  res.status(201).json({ message: 'Updated' });
});
