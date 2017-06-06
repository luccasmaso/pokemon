'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'pokemons', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL,
          allowNull: false
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        created_at: { type: Sequelize.DATE },
        updated_at: { type: Sequelize.DATE }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('pokemons')
  }
}
