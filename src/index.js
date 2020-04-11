import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Appp from './Appp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Appp />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();