import React, {Component} from 'react'
import Pokemon from '../Pokemon'
import PokemonAdd from '../PokemonAdd'
import fetch from 'isomorphic-fetch'

class PokemonList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pokemons: []
    }
  }

  componentDidMount() {
    fetch('/api/pokemons')
    .then((response) => {
      return response.json()
    })
    .then((pokemons) => {
      this.setState({pokemons: pokemons})
    })
  }

  render() {
    var {pokemons} = this.state

    return (
      <div className="pokemons">
        <PokemonAdd />
        {pokemons.map((pokemon, i) => {
          return (
            <Pokemon key={i} pokemon={pokemon} />
          )
        })}
      </div>
    )
  }

}

export default PokemonList
