import angular from 'angular';
import admin from './admin/admin.module';
import home from './home/home.module';
import labs from './labs/labs.module';
import shared from './shared/shared.module';
import 'jquery';
import 'popper.js/dist/popper.min';
import 'bootstrap';
import 'fullcalendar';
import 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'fullcalendar/dist/fullcalendar.min.css';
import '../styles.scss';

angular.module('eiadApp', [admin, home, labs, shared]);
