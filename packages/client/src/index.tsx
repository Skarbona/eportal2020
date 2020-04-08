import React, { Suspense, FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './main.scss';
import './settings/translation-settings';
import App from './components/App';
import CircleLoading from './components/Shared/UIElements/Loading/CircleLoading';
import { store } from './store/store';

export const Index: FC = () => (
  <Provider store={store}>
    <Suspense fallback={<CircleLoading />}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
