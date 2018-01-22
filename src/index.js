import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

import './index.css';

import Snagchain from './App/Blockchain';
import CryptoRoi from './App/CryptoRoi';    
import registerServiceWorker from './registerServiceWorker';

// this component will be rendered by our <___Router>
const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

const Header = () => (
    <header>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/snagchain">Snagchain</Link></li>
            <li><Link to="/cryptoroi">Crypto Roi</Link></li>
        </ul>
    </header>
)

const Main = () => (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/Snagchain' component={Snagchain}/>
      <Route path='/CryptoRoi' component={CryptoRoi}/>
    </Switch>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root')) 

registerServiceWorker();
