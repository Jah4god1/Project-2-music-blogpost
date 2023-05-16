//CAROL task
//ASSOCIATIONS (check over)

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//USER has many POST
//POST has one USER
//POST has one SONG
//SONG can belong to many POST
//SONG can belong to many USER 