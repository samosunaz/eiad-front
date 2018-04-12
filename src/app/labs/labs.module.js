import angular from 'angular';
import routing from './labs.routing';
import LabsController from './labs.controller';
import core from '../config/core.module';
import LabsService from './labs.service';

const labs = angular
  .module('app.labs', [core])
  .config(routing)
  .service('labsService', LabsService)
  .controller('LabsController', LabsController).name;

export default labs;
