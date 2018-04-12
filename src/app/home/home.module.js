import angular from 'angular';
import core from '../config/core.module';

import routing from './home.routing';
import HomeController from './home.controller';
import eiadCarousel from './components/carousel/carousel.directive';

const home = angular
  .module('app.home', [core])
  .config(routing)
  .controller('HomeController', HomeController)
  .directive('eiadCarousel', eiadCarousel).name;

export default home;
