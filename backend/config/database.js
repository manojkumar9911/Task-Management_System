const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Load config.json

const env = process.env.NODE_ENV || 'development'; // Default to 'development'
const dbConfig = config[env]; // Get config for the current environment

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false, // Disable logging for cleaner output
});

module.exports = sequelize;
