'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsTo(models.Users, { as: 'host', foreignKey: 'hostId' });
      Events.belongsToMany(
        models.Users,
        { as: 'attendees', through: models.EventAttendees,
          foreignKey: 'eventId', otherKey: 'userId' },
      );
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
