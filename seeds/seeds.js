const sequelize = require('../config/connection');
// const { user } = require('../models');
const seedpost = require('./postData');
const seeduser = require('./usersData');
// const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  await seeduser();
  await seedpost();

  process.exit(0);
};

seedDatabase();