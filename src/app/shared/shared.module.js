import angular from 'angular';
import core from '../config/core.module';
import eiadLabCard from './components/lab-card/lab-card.directive';
import eiadMaterialCard from './components/material-card/material-card.directive';
import eiadNav from './components/nav/nav.directive';
import modaler from './services/modaler.service';

const shared = angular
  .module('shared', [core])
  .directive('eiadLabCard', eiadLabCard)
  .directive('eiadNav', eiadNav)
  .directive('eiadMaterialCard', eiadMaterialCard)
  .service('modaler', modaler).name;

export default shared;
