'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Events, { as: 'host', foreignKey: 'hostId', onDelete: 'SET NULL' });
      Users.belongsToMany(models.Events, { as: 'attendees', through: 'EventAttendees' });
    }
  }

  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    tagline: DataTypes.STRING,
    city: DataTypes.STRING,
    role: DataTypes.ENUM('attendee', 'admin'),
  }, {
    sequelize,
    modelName: 'Users',
  });

  return Users;
};