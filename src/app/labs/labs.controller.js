export default class LabsController {
  constructor(labsService) {
    'ngInject';
    this.labsService = labsService;
    this.name = 'LabsController';
  }

  printLabs() {
    console.log(this.labsService.getLabs());
  }
}
