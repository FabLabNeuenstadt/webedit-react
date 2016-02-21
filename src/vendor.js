import 'babel-polyfill';
import './external/babelHelper.js';
import BluebirdPromise from 'bluebird';

require('./external/Roboto.css');
require('font-awesome/css/font-awesome.css');

global.Promise = BluebirdPromise;
