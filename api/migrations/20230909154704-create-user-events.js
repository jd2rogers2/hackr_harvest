'use strict';

const { Events, Users } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('EventAttendees', {
      eventId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        model: Events,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        model: Users,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('EventAttendees');
  }
};
