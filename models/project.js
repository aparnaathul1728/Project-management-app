const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Project = sequelize.define('Project', {
  name: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Project;
