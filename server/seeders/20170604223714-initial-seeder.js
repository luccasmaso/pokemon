'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('pokemons', [
      {name: 'Pikachu', price: 10.55},
      {name: 'Bullbasaur', price: 21.99},
      {name: 'Charmander', price: 30.08},
      {name: 'Snorlax', price: 40.12},
      {name: 'Squirtle', price: 28.00},
      {name: 'Zubat', price: 28.00},
      {name: 'Jigglypuff', price: 28.00},
      {name: 'Bellsprout', price: 28.00},
      {name: 'Psyduck', price: 28.00}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pokemons', null, {})
  }
}
