'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsTo(models.Users, { as: 'hostings' });
      Events.belongsToMany(models.Users, { as: 'attendings', through: 'EventAttendees' });
    }
  }

  Events.init({
    name: DataTypes.STRING,
    attendee_limit: DataTypes.INTEGER,
    location: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    image_url: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Events',
  });

  return Events;
};
