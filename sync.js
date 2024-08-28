const sequelize = require('./config/database');
const User = require('./models/user'); // Import your model

(async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('Connection to the database has been established successfully.');

    await sequelize.sync({ force: true }); // Sync models with the database (drops existing tables if any)
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
