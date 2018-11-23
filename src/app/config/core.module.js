import uirouter from '@uirouter/angularjs';
import angular from 'angular';
import angularAnimate from 'angular-animate';
import routing from './core.routing';

let core = angular
  .module('app.core', [angularAnimate, uirouter])
  .config(routing)
  .constant('API_URL', 'http://localhost:5000').name;

export default core;
