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
          model: Users,
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
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
