import React from 'react';
import ReactDOM from 'react-dom';

import { registerServiceWorker } from './utilities/serviceWorker';
import './styles/index.css';

import App from './components/App';

ReactDOM.render(<App/>, document.getElementById('app'));

registerServiceWorker();
