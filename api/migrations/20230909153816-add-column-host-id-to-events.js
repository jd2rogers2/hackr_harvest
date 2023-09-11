'use strict';

const { Users } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Events', 'hostId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: Users,
            key: 'id',
            deferrable: Sequelize.Deferrable.NOT,
          },
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Events', 'hostId', { transaction: t }),
      ]);
    });
  }
};
