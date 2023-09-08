const { Sequelize } = require('sequelize');
const config = require('./sequelizeConfig')["development"]; // [process.env.NODE_ENV];


var sequelize = new Sequelize(config);

module.exports = {
    sequelize,
};
