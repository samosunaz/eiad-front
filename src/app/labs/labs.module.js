import angular from 'angular';
import core from '../config/core.module';
import admin from './../admin/admin.module';
import routing from './labs.routing';
import LabsService from './labs.service';

let labs = angular
  .module('app.labs', [core, admin])
  .config(routing)
  .service('labsService', LabsService).name;
export default labs;
