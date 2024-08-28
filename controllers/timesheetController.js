const Timesheet = require('../models/timesheet');
const User = require('../models/user');
const Project = require('../models/project');

exports.createTimesheet = async (req, res) => {
  try {
    const { taskName, date, hours, userId, projectId } = req.body;
    const timesheet = await Timesheet.create({ taskName, date, hours, UserId: userId, ProjectId: projectId });
    res.status(201).json(timesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTimesheetById = async (req, res) => {
  try {
    const timesheet = await Timesheet.findByPk(req.params.id, { include: [User, Project] });
    if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });
    res.status(200).json(timesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTimesheets = async (req, res) => {
  try {
    const filters = req.query;
    const timesheets = await Timesheet.findAll({ where: filters, include: [User, Project] });
    res.status(200).json(timesheets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTimesheet = async (req, res) => {
  try {
    const { taskName, date, hours } = req.body;
    const timesheet = await Timesheet.findByPk(req.params.id);
    if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });

    timesheet.taskName = taskName || timesheet.taskName;
    timesheet.date = date || timesheet.date;
    timesheet.hours = hours || timesheet.hours;

    await timesheet.save();
    res.status(200).json(timesheet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTimesheet = async (req, res) => {
  try {
    const timesheet = await Timesheet.findByPk(req.params.id);
    if (!timesheet) return res.status(404).json({ message: 'Timesheet not found' });

    await timesheet.destroy();
    res.status(200).json({ message: 'Timesheet deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
