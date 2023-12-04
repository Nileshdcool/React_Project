/** @jsxRuntime classic */
import '@babel/polyfill';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import 'core-js/stable';
// IE11 needs "jsxRuntime classic" for this initial file which means that "React" needs to be in scope
// issue: https://github.com/facebook/create-react-app/issues/9906

import 'typeface-roboto';

import './index.scss';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { applyMiddleware, createStore } from 'redux';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import logger from 'redux-logger';
import moment from 'moment';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './reducers/index';
import api from './api';
import App from './containers/app';
import * as serviceWorker from './serviceWorker';

const middlewares = [thunk];

const options = { trace: true, traceLimit: 25 };
const composeEnhancers = composeWithDevTools(options);
const middleware =
  process.env.NODE_ENV !== 'development'
    ? applyMiddleware(...middlewares, api, logger)
    : composeEnhancers(applyMiddleware(...middlewares, api));
const store = createStore(rootReducer, middleware);
moment.locale('en');
const persistor = persistStore(store);

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#07639c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#425a70',
    },
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      fontStretch: 'normal',
      lineHeight: 0.8,
      letterSpacing: 'normal',
      textAlign: 'center',
      color: '#425a70',
      '@media all and (max-width: 1024px)': {
        fontSize: 24,
      },
    },
    h2: {
      fontSize: 30,
      fontWeight: 'bold',
      fontStretch: 'normal',
      lineHeight: 1.17,
      letterSpacing: 'normal',
      textTransform: 'uppercase',
      '@media all and (max-width: 1024px)': {
        fontSize: 22,
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 1.17,
      letterSpacing: 'normal',
      color: '#425a70',
      '@media all and (max-width: 1024px)': {
        fontSize: 16,
      },
    },
    h5: {
      fontSize: 12,
      fontWeight: 'normal',
      color: '#425a70',
      '@media all and (max-width: 1024px)': {
        fontSize: 9,
      },
    },
    h6: {
      fontWeight: 500,
      fontSize: '10px',
      fontStretch: 'normal',
      lineHeight: 1.1,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#ffffff',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.19,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#425a70',
    },
    subtitle2: {
      fontSize: '18px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.17,
      letterSpacing: 'normal',
      textAlign: 'left',
      color: '#425a70',
      textTransform: 'uppercase',
      marginRight: 35,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 1.14,
      color: '#425970',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '14px',
        fontWeight: 500,
        padding: '6px 15px 7px 15px',
        lineHeight: '1.14',
        borderRadius: '2px',
        boxSizing: 'border-box',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '14px',
      },
      tooltipPlacementTop: {
        marginBottom: '-20px',
      },
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
