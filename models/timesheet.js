const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Timesheet = sequelize.define('Timesheet', {
  taskName: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  hours: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Timesheet;
