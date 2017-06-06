'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var date = new Date()
    return queryInterface.bulkInsert('pokemons', [
      {name: 'Pikachu', price: 10.55, created_at: date, updated_at: date},
      {name: 'Bullbasaur', price: 21.99, created_at: date, updated_at: date},
      {name: 'Charmander', price: 30.08, created_at: date, updated_at: date},
      {name: 'Snorlax', price: 40.12, created_at: date, updated_at: date},
      {name: 'Squirtle', price: 28.00, created_at: date, updated_at: date},
      {name: 'Zubat', price: 28.00, created_at: date, updated_at: date},
      {name: 'Jigglypuff', price: 28.00, created_at: date, updated_at: date},
      {name: 'Bellsprout', price: 28.00, created_at: date, updated_at: date},
      {name: 'Psyduck', price: 28.00, created_at: date, updated_at: date}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pokemons', null, {})
  }
}
