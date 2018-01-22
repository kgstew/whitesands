import React, { Component } from 'react';
import './App.css';

class AddTradeForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      coinOne: '',
      coinTwo: '',
      price: 0,
      quantity: 0,
      validEntry: true
    };

    this.changeCoinOne = this.changeCoinOne.bind(this);
    this.changeCoinTwo = this.changeCoinTwo.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  changeCoinOne(event) {
    this.setState({
      coinOne: event.target.value,
    });
  }

  changeCoinTwo(event) {
    this.setState({
      coinTwo: event.target.value,
    });
  }

  changePrice(event) {
    this.setState({
      price: event.target.value,
    });
  }

  changeQuantity(event) {
    this.setState({
      quantity: event.target.value,
    });
  }

  handleSubmit(event) {
    if (!this.state.coinOne) {
      this.setState({validBlockValue: false});
      event.preventDefault();
      return;
    }
    this.props.onSubmit(this.state);
    this.setState({
      coinOne: '',
      coinTwo: '',
      price: 0,
      quantity: 0
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Add New Trade</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Coin
            <input type="text" value={this.state.coinOne} onChange={this.changeCoinOne} />
          </label>
          <label>
            Second Coin
            <input type="text" value={this.state.coinTwo} onChange={this.changeCoinTwo} />
          </label>
          <label>
            Price
            <input type="text" value={this.state.price} onChange={this.changePrice} />
          </label>
          <label>
            Quantity
            <input type="text" value={this.state.quantity} onChange={this.changeQuantity} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
        <div className="block-value-error">
          {this.state.validEntry ? '' : 'You must enter a value'}
        </div>  
      </div>
    )
  }
}

class CryptoRoi extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      holdings: [],

    };
  }

  addTrade(tradeData) {
    console.log(tradeData)
  }

  recordSale(coin1, coin2, sale_price) {
      console.log("Ca Ching")
  }

  render() {

    return (
      <div className="cryptoroi-wrapper">
        <h1 className="title">Crypto ROI</h1>
        <div className="body">
          <h2>Add a Trade</h2>
          <AddTradeForm onSubmit={(value) => this.addTrade(value)}/>
        </div>
      </div>
    );
  }
}

export default CryptoRoi;
