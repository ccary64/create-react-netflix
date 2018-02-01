import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import createStore from './store'
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import App from './App';
import Home from './components/home';
import Queue from './components/queue';
import registerServiceWorker from './registerServiceWorker';
import * as movieActions from './actions/movies'

const store = createStore({});
store.dispatch(movieActions.getPopular());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Queue' component={Queue}/>
        </App>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
