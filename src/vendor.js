import 'babel-polyfill';
import './external/babelHelper.js';
import BluebirdPromise from 'bluebird';

global.Promise = BluebirdPromise;
