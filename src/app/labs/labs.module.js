import angular from 'angular';
import routing from './labs.routing';
import core from '../config/core.module';
import LabsService from './labs.service';
import admin from './../admin/admin.module';

const labs = angular
  .module('app.labs', [core, admin])
  .config(routing)
  .service('labsService', LabsService).name;
export default labs;
