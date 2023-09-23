'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Events, { as: 'hostings', foreignKey: 'hostId', onDelete: 'SET NULL' });
      Users.belongsToMany(
        models.Events,
        { as: 'attendings', through: models.EventAttendees,
          otherKey: 'eventId', foreignKey: 'userId' },
      );
    }
  }

  Users.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
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