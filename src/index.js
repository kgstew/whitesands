import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Blockchain from './App/Blockchain';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Blockchain />, document.getElementById('root'));
registerServiceWorker();
