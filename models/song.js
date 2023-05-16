//download dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Song extends Model {}

const Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  album: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Song;
