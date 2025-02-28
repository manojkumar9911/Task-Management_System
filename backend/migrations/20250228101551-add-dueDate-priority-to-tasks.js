'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "dueDate", { type: Sequelize.DATE, allowNull: false });
    await queryInterface.addColumn("Tasks", "priority", { type: Sequelize.ENUM("Low", "Medium", "High"), allowNull: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "dueDate");
    await queryInterface.removeColumn("Tasks", "priority");
  }
};
