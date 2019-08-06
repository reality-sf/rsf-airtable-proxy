const handleErrors = require('../../util/handleErrors');
const attendanceDao = require('../../dao/attendance');
const _ = require('lodash');

const ALLOWED_FIELDS = ['Person'];

const create = handleErrors(async (req, res) => {
  const row = await attendanceDao.create(req.body);
  return res.status(201).json(row);
});

const find = handleErrors(async (req, res) => {
  const rows = await attendanceDao.find(req.query);
  return res.json(rows.map((r) => r.fields));
});

const update = handleErrors(async (req, res) => {
  const row = await attendanceDao.fetch(req.params.attendanceId);
  await row.updateFields(_.pick(req.body, ALLOWED_FIELDS));
  return res.status(201).json({ message: 'Updated' });
});

module.exports = {
  create,
  find,
  update
};
