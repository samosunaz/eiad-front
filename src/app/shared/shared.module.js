import angular from 'angular';
import core from '../config/core.module';
import eiadNav from './components/nav/nav.directive';

const shared = angular.module('shared', [core]).directive('eiadNav', eiadNav)
  .name;

export default shared;
