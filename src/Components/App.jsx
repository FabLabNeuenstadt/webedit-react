/* @flow */
import { createStore, bindActionCreators, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import reduxPromise from 'redux-promise';

let store;
let renderDevtools;

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
  const DockMonitor = require('redux-devtools-dock-monitor').default;
  const LogMonitor = require('redux-devtools-log-monitor').default;

  const DevTools = DT.createDevTools(
    <DockMonitor toggleVisibilityKey="H" changePositionKey="Q">
      <LogMonitor/>
    </DockMonitor>
  );


  const createDevStore = compose(
    applyMiddleware(reduxPromise),
    DevTools.instrument(),
    DT.persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    )
  )(createStore);

  store = createDevStore(reducer);

  renderDevtools = () => <DevTools/>;
}

global.store = store;

reduxActions.createAction = (function(old) {
  return function(...args) {
    const action = old.apply(this, args);
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
  render(): ReactElement {
    const monitor = __PROD__ ? null : renderDevtools();
    return (
      <div>
        <Provider store={store}>
          <Webedit/>
        </Provider>
        {monitor}
      </div>
    );
  }
}
