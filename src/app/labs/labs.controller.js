class LabsController {
  constructor($scope, $state, buildingService, labsService) {
    'ngInject';
    this.buildings = [];
    this.floors = [];
    this.labs = [];
    this.areLabsLoading = false;
    this.selectedBuilding = {};
    this.selectedFloor = {};

    this.$scope = $scope;
    this.$state = $state;
    this.buildingService = buildingService;
    this.labsService = labsService;

    this.getBuildings();
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

  async getBuildings() {
    try {
      this.buildings = await this.buildingService.all();
      this.$scope.$apply();
    } catch (error) {
      console.log(error);
    }
  }

  showingMaterials() {
    return !this.$state.$current.includes.materials;
  }
}

export default LabsController;
