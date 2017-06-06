import React, {Component} from 'react'

class PokemonAdd extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: "",
      quantity: 1,
      price: "",
    }
  }

  handleCreate() {
    var {name, price, quantity} = this.state

    fetch(`/api/pokemons`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        quantity: quantity,
        price: price
      })
    })
    .then((response) => {
      return response.json()
    })
    .then(({errors, pokemons}) => {
      if (errors) {
        alert(JSON.stringify(errors, null, 4))
      } else {
        window.location.reload()
      }
    })
  }

  render() {
    var {name, price, quantity} = this.state

    return (
      <div className="pokemon-add">
        <div className="pokemon-add__inner">
          <div className="pokemon-add__title">
            Create a <span>pokemon</span>
          </div>
          <br/>
          <div className="input__field">
            <label>Name</label>
            <input
              placeholder="Onix"
              type="text"
              onChange={(event) => this.setState({name: event.target.value})}
              value={name}
            />
          </div>
          <div className="input__compose input__compose--2">
            <div className="input__field">
              <label>Price</label>
              <input
                placeholder="R$ 20,00"
                type="text"
                onChange={(event) => this.setState({price: event.target.value})}
                value={price}
              />
            </div>
            <div className="input__field">
              <label>Quantity</label>
              <input
                placeholder="5"
                type="text"
                onChange={(event) => this.setState({quantity: event.target.value})}
                value={quantity}
              />
            </div>
          </div>

          <br/>

          <a className="pokemon__button pokemon__button--main"
            onClick={() => this.handleCreate()}>
            Create <span>{name}</span>
          </a>
        </div>
      </div>
    )
  }

}

export default PokemonAdd
