import 'bootstrap/dist/css/bootstrap.min.css';
import angular from 'angular';
import jquery from 'jquery';
import home from './home/home.module';
import labs from './labs/labs.module';
import shared from './shared/shared.module';
import 'bootstrap/js/dist/carousel';

angular.module('eiadApp', [home, labs, shared]);
