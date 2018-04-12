import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import routing from './core.routing';

const core = angular.module('app.core', [uirouter]).config(routing).name;

export default core;
