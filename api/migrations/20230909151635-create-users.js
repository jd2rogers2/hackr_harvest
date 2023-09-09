'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      image_url: {
        type: Sequelize.STRING
      },
      tagline: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "attendee",
        isIn: [['attendee', 'admin']],
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};