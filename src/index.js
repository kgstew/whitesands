import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Snagchain from './App/Blockchain';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Snagchain />, document.getElementById('root'));
registerServiceWorker();
