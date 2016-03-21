// @flow

import 'babel-polyfill';
import './external/babelHelper.js';
import BluebirdPromise from 'bluebird';
import i18n from 'i18next';

i18n
.init({
  debug: __DEV__,
  lng: 'en',
  interpolation: {
    escapeValue: false,
    nestingPrefix: '\$t\(',
    nestingSuffix: '\)',
  },
});
// $FlowFixMe
i18n.t = i18n.t.bind(i18n);

if (__DEV__) {
  global.i18n = i18n;
  const Immutable = require('immutable');
  const installDevTools = require('immutable-devtools').default;
  installDevTools(Immutable);
}
// $FlowFixMe
i18n.addResourceBundle('en', 'translation', require('./i18n/en.json'), true);
// $FlowFixMe
i18n.addResourceBundle('de', 'translation', require('./i18n/de.json'), true);


require('./external/Roboto.css');
require('font-awesome/css/font-awesome.css');

global.Promise = BluebirdPromise;
global.AudioContext = global.AudioContext || global.webkitAudioContext;
