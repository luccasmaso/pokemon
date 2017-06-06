var Sequelize = require("sequelize")
sequelize = new Sequelize(process.env.DATABASE_URL)

const Pokemon = sequelize.import(__dirname + "/pokemon")

module.exports = {
  Pokemon: Pokemon
}
