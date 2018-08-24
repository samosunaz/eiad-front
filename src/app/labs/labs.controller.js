class LabsController {
  constructor($scope, $state, labsService) {
    'ngInject';
    this.floors = [];
    this.labs = [];
    this.areLabsLoading = false;

    this.$scope = $scope;
    this.$state = $state;
    this.labsService = labsService;

    this.getFloors();
  }

  getFloors() {
    this.labsService
      .getFloors()
      .then(res => {
        this.floors = res.data;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.$scope.$apply();
      });
  }

  getLabs(floorId) {
    this.areLabsLoading = true;
    this.labsService
      .getFloorLabs(floorId)
      .then(res => {
        this.labs = res.data;
      })
      .catch(err => {})
      .finally(() => {
        this.areLabsLoading = false;
        this.$scope.$apply();
      });
  }

  showingMaterials() {
    return !this.$state.$current.includes.materials;
  }
}

export default LabsController;
