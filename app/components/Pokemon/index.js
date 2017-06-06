import React, {Component} from 'react'

import InputMask from 'react-input-mask'

import icon1 from '../../images/pikachu.svg'
import icon2 from '../../images/bellsprout.svg'
import icon3 from '../../images/bullbasaur.svg'
import icon4 from '../../images/charmander.svg'
import icon5 from '../../images/psyduck.svg'
import icon6 from '../../images/jigglypuff.svg'
import icon7 from '../../images/snorlax.svg'
import icon8 from '../../images/squirtle.svg'
import icon9 from '../../images/zubat.svg'

import icon10 from '../../images/pokeball.svg'

const pokemons = {
  pikachu: icon1,
  bellsprout: icon2,
  bullbasaur: icon3,
  charmander: icon4,
  psyduck: icon5,
  jigglypuff: icon6,
  snorlax: icon7,
  squirtle: icon8,
  zubat: icon9
}

class Pokemon extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: false,
      quantity: 1
    }
  }

  handleSelect() {
    this.setState({selected: true})
  }

  handleQuantity(event) {
    this.setState({quantity: event.target.value})
  }

  handleCancel() {
    this.setState({quantity: 1, selected: false})
  }

  handleBuy() {
    var {pokemon} = this.props
    var {quantity} = this.state

    PagarMe.encryption_key = window.pagarmeEncryptionKey

    var creditCard = new PagarMe.creditCard()
    creditCard.cardHolderName = this.refs.card_name.value
    creditCard.cardExpirationMonth = this.refs.card_expiration_month.value
    creditCard.cardExpirationYear = this.refs.card_expiration_year.value
    creditCard.cardNumber = this.refs.card_number.value
    creditCard.cardCVV = this.refs.card_cvv.value

    var fieldErrors = creditCard.fieldErrors()

    if (Object.keys(fieldErrors).length > 0) {
      alert(JSON.stringify(fieldErrors, null, 4))
    } else {
      creditCard.generateHash((cardHash) => {
        fetch(`/api/pokemons/${pokemon.id}/buy`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: quantity,
            cardHash: cardHash
          })
        })
        .then((response) => {
          return response.json()
        })
        .then(({errors, pokemons}) => {
          if (errors) {
            alert(JSON.stringify(errors, null, 4))
          } else {
            this.handleCancel()
          }
        })
      })
    }
  }

  renderBuy() {
    var {pokemon} = this.props
    var {quantity} = this.state

    return (
      <div className="pokemon pokemon--selected">
        <div className="pokemon__content">
          <div className="pokemon__credit-card">
            <div className="input__field">
              <label>Card Number</label>
              <InputMask
                mask="9999 9999 9999 9999"
                maskChar=" "
                ref="card_number"
                placeholder="4242 4242 4242 4242"
                type="text"
              />
            </div>
            <div className="input__field">
              <label>Name</label>
              <input
                placeholder="Ash"
                ref="card_name"
                type="text" />
            </div>
            <div className="input__compose input__compose--3">
              <div className="input__field">
                <label>Month</label>
                <InputMask
                  mask="99"
                  maskChar=" "
                  placeholder="10"
                  ref="card_expiration_month"
                  type="text" />
              </div>
              <div className="input__field">
                <label>Year</label>
                <InputMask
                  mask="99"
                  maskChar=" "
                  placeholder="20"
                  ref="card_expiration_year"
                  type="text" />
              </div>
              <div className="input__field">
                <label>CVC</label>
                <InputMask
                  mask="999"
                  maskChar=" "
                  placeholder="123"
                  ref="card_cvv"
                  type="text" />
              </div>
            </div>
          </div>
          <a className="pokemon__button pokemon__button--cancel" onClick={() => this.handleCancel()}>
            Cancel
          </a>
          <a className="pokemon__button pokemon__button--main" onClick={() => this.handleBuy()}>
            Confirm <span>R$ {pokemon.price * quantity}</span>
          </a>
        </div>
      </div>
    )
  }

  renderPokemon() {
    var {pokemon} = this.props
    var {quantity} = this.state

    return (
      <div className="pokemon">
        <div className="pokemon__content">
          <div className="pokemon__icon">
            <img src={pokemons[pokemon.name.toLowerCase()] || icon10} />
          </div>
          <div className="pokemon__info">
            <div className="pokemon__name">
              Pokemon <span>{pokemon.name}</span>
            </div>
            <br/>
            <select onChange={(event) => this.handleQuantity(event)}>
              <option value={1}>x1</option>
              <option value={2}>x2</option>
              <option value={3}>x3</option>
              <option value={4}>x4</option>
              <option value={5}>x5</option>
            </select>
            <a className="pokemon__button pokemon__button--main" onClick={() => this.handleSelect(pokemon)}>
              Buy <span>R$ {parseFloat(pokemon.price) * quantity}</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    var {selected} = this.state

    if (selected) {
      return this.renderBuy()
    } else {
      return this.renderPokemon()
    }
  }

}

export default Pokemon
