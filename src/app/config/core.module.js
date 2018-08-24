import angular from 'angular';
import angularAnimate from 'angular-animate';
import uirouter from '@uirouter/angularjs';
import routing from './core.routing';

const core = angular
  .module('app.core', [angularAnimate, uirouter])
  .config(routing)
  .constant('API_URL', 'http://localhost:5000').name;

export default core;
