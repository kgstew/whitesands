import React, { Component } from 'react';
import './App.css';

const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = '') {
      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.hash = this.calculateHash();
      this.nonce = 0;
  }

  calculateHash() {
      return SHA256(this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      ).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
  }
}  

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
      for (let i = 1; i < this.chain.length; i++){
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];

          if (currentBlock.hash !== currentBlock.calculateHash()) {
              return false;
          }

          if (currentBlock.previousHash !== previousBlock.hash) {
              return false;
          }
      }
      return true;
  }
}

class AddBlockForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      blockValue: '',
      blockSignature: '',
      validBlockValue: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      blockValue: event.target.value,
      validBlockValue: true
    });

  }

  handleSubmit(event) {
    if (!this.state.blockValue) {
      this.setState({validBlockValue: false});
      event.preventDefault();
      return;
    }
    this.props.onSubmit(this.state.blockValue);
    this.setState({blockValue: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Create new Block</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Value to add to block<br/>
            <input type="text" value={this.state.blockValue} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="block-value-error">
          {this.state.validBlockValue ? '' : 'You must enter a value'}
        </div>  
      </div>
    )
  }
}

class Snagchain extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      blocksOnChain: [],

    };
  }

  updateBlockStatus() {
    this.setState({blocksOnChain: this.blockchain.chain});
  }

  createNewBlockchain() {
    this.blockchain = new Blockchain();
    this.updateBlockStatus();
    console.log("Created new blockchain", this.blockchain)
  }

  createNewBlock(value) {
    if (!this.blockchain) { return; }
    this.blockchain.addBlock(new Block(this.blockchain.getLatestBlock().index + 1, Date.now(), { value: value }))
    this.updateBlockStatus();
    console.log("Added new block", this.blockchain.chain)
  }

  render() {

    let blocks = this.state.blocksOnChain.map((block, index) => {
      return (
        <li key={block.index}>
            Index: {block.index} - blockValue: {block.data ? block.data.value : ''}
        </li>
      );
    });

    const blockList = blocks.length ? (
        <ul className="block-values">
            {blocks}
        </ul>
      ) : "None";

    return (
      <div className="blockchain-wrapper">
        <header className="header">
          <h1 className="title">Blockchain Explorer</h1>
        </header>
        <div className="body">
          <h2>Create new Blockchain</h2>
          <button onClick={() => this.createNewBlockchain()}>
            Create new Blockchain
          </button>
          
          <br/><br/>
          
          <AddBlockForm onSubmit={(value) => this.createNewBlock(value)}/>
          
          <br/><br/>
          <h3> Blocks on Chain </h3>
          {blockList}
        </div>
      </div>
    );
  }
}

export default Snagchain;
