/* @flow */
import { createStore, bindActionCreators, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StyleRoot, Style } from 'radium';
import GlobalCSS from './Global.CSS.js';
import React from 'react';
import reduxPromise from 'redux-promise';

let store;

const reduxActions = require('redux-actions');
reduxActions.handleActions = (function(old) {
  return function(reducerMap: Object, ...rest) {
    Object.keys(reducerMap).forEach((key, index) => {
      reducerMap[index] = function(state, action) {
        const newState = reducerMap[key](state, action);
        return {
          ...state,
          ...newState,
        };
      };
    });
    return old.call(this, reducerMap, ...rest);
  };
}(reduxActions.handleActions));
const reducer = require('../Reducer').default;

if (__PROD__) {
  store = compose(
    applyMiddleware(reduxPromise)
  )(createStore)(reducer);
} else {
  const DT = require('redux-devtools');

  const createDevStore = compose(
    applyMiddleware(reduxPromise),
    DT.persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore);

  store = createDevStore(reducer);
}

global.store = store;

reduxActions.createAction = (function(old) {
  return function(...args) {
    const action = (old: any).apply(this, args);
    return bindActionCreators(action, store.dispatch);
  };
}(reduxActions.createAction));

const Webedit = require('./Webedit').default;
export default class App extends React.Component {
  static childContextTypes = {
    store: React.PropTypes.any,
  };
  getChildContext(): Object {
    return {
      store,
    };
  }
  render() {
    return (
      <StyleRoot>
        <Style rules={GlobalCSS.default}/>
        <Provider store={store}>
          <Webedit/>
        </Provider>
      </StyleRoot>
    );
  }
}
