'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class EventAttendees extends Model {
    static associate(models) {
    }
  }

  EventAttendees.init({
    userId: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'EventAttendees',
  });

  return EventAttendees;
};
