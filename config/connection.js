const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load .env variables
dotenv.config();

// MySQL database connection via Sequelize ORM
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  },
});

// Test connection to the database
sequelize.authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
