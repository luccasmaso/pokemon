var routes = require('express').Router()

var {Pokemon} = require('../models')
var {BuyPokemon} = require('../services')
var {unprocessed, internalError, notFound, invalidParameter, invalidModel} = require('../lib/error')

routes.get('/api/pokemons', (request, response) => {
  Pokemon
    .findAll({
      order: [['created_at', 'DESC']]
    })
    .then((pokemons) => {
      response.send(pokemons)
    })
})

routes.post('/api/pokemons', (request, response) => {
  var {name, price, quantity} = request.body

  price = parseFloat(price) || 0
  quantity = parseInt(quantity) || 0

  Pokemon
    .create({
      name: name,
      price: price,
      quantity: quantity
    })
    .then((pokemon) => {
      response.send(pokemon)
    })
    .catch(error => {
      response
        .status(422)
        .send(invalidModel(error))
    })
})

routes.post('/api/pokemons/:id/buy', (request, response) => {
  var {id} = request.params
  var {quantity, cardHash} = request.body

  quantity = parseInt(quantity) || 0

  if (quantity <= 0) {
    response
      .status(422)
      .send(invalidParameter("quantity", "quantity should be bigger than 0"))
    return
  }

  Pokemon
    .findById(id)
    .then((pokemon) => {
      if (pokemon) {
        BuyPokemon(pokemon, cardHash, quantity)
        .then(({pokemon, paid, error}) => {
          if (error == "quantity") {
            response
              .status(422)
              .send(unprocessed("Not enough quantity available for purchase"))
            return
          }

          if (paid) {
            return response.send(pokemon)
          } else {
            response
              .status(422)
              .send(unprocessed("Something went wrong with your credit card"))
          }
        })
        .catch((error) => {
          response
            .status(500)
            .send(internalError())
        })
      } else {
        response
          .status(404)
          .send(notFound("Pokemon not found"))
      }
    })
})

routes.get('/*', (request, response) => {
  response.render("index", {
    apiKeys: {
      pagarme: process.env.PAGARME_ENCRYPTION_KEY
    }
  })
})

module.exports = routes
