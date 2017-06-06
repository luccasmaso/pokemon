var request = require('request-promise')
var {Pokemon} = require('../models')

module.exports = (pokemon, cardHash, quantity) => {
  return new Promise((resolve, reject) => {
    var {name, price} = pokemon
    var transaction

    // Using pessimistic locking
    return sequelize.transaction((tx) => {
      return Pokemon
        .findById(pokemon.id, {
          transaction: tx,
          lock: tx.LOCK.UPDATE
        })
        .then((pokemon) => {
          pokemon.quantity = pokemon.quantity - quantity
          if (pokemon.quantity < 0) {
            throw new Error("not_enough_quantity")
          }

          return pokemon.save({transaction: tx})
        })
        .then((pokemon) => {
          return request({
            uri: 'https://api.pagar.me/1/transactions',
            method: 'POST',
            json: {
              api_key: process.env.PAGARME_API_KEY,
              amount: price * quantity * 100,
              card_hash: cardHash,
              metadata: {
                product: 'Pokemon',
                name: name,
                quantity: quantity
              }
            }
          }).then((body) => {
            if (body.status == 'paid') {
              return {pokemon: pokemon, paid: true}
            } else {
              return {pokemon: null, paid: false}
            }
          })
        })
    })
    .then(({pokemon, paid}) => {
      if (!paid) {
        throw new Error("error_payment")
      }

      resolve({pokemon: pokemon, paid: paid})
    })
    .catch((error) => {
      switch(error.message) {
        case "error_payment":
          resolve({pokemon: null, paid: false})
          break
        case "not_enough_quantity":
          resolve({error: "quantity"})
          break
        default:
          console.log(error)
          reject()
      }
    })
  })
}
