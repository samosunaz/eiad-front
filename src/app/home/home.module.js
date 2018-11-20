import angular from 'angular';
import core from '../config/core.module';
import eiadCarousel from './components/carousel/carousel.directive';
import HomeController from './home.controller';
import routing from './home.routing';

let home = angular
  .module('app.home', [core])
  .config(routing)
  .controller('HomeController', HomeController)
  .directive('eiadCarousel', eiadCarousel).name;

export default home;
