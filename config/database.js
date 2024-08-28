const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../database.sqlite') // Path to your SQLite file
});

module.exports = sequelize;
