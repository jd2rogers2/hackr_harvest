'use strict';
const {
  Model
} = require('sequelize');
const { sequelize } = require('../dbConnection');


module.exports = (_, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
