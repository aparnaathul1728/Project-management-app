const User = require('./user');
const Project = require('./project');
const Timesheet = require('./timesheet');

User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });
User.hasMany(Timesheet);
Timesheet.belongsTo(User);
Project.hasMany(Timesheet);
Timesheet.belongsTo(Project);

module.exports = { User, Project, Timesheet };
