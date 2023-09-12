'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsTo(models.Users, { as: 'hostings', foreignKey: 'hostId' });
      Events.belongsToMany(models.Users, { as: 'attendings', through: 'EventAttendees' });
    }
  }

  Events.init({
    name: DataTypes.STRING,
    attendeeLimit: DataTypes.INTEGER,
    location: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Events',
  });

  return Events;
};
