'use strict';

const { Events, Users } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('EventAttendees', {
      eventId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Events',
            scema: 'schema',
          },
          key: 'id',
          deferrable: Sequelize.Deferrable.NOT,
        },
        allowNull: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Users',
            scema: 'schema',
          },
          key: 'id',
          deferrable: Sequelize.Deferrable.NOT,
        },
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('EventAttendees');
  }
};
