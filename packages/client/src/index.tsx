import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './main.scss';
import './settings/translation-settings';
import App from './components/App';
import { store } from './store/store';

// TODO: Prepare nice fallback
const app = (
  <Provider store={store}>
    <Suspense fallback={<div>Loading</div>}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
