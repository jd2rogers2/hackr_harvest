'use strict';

const { Events, Users } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('EventAttendees', {
      eventId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Events,
          key: 'id',
          deferrable: Sequelize.Deferrable.NOT,
        },
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: 'id',
          deferrable: Sequelize.Deferrable.NOT,
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('EventAttendees');
  }
};
