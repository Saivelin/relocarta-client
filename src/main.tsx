import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from './store/Provider';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
