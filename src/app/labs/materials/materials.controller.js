class MaterialsController {
  constructor($scope, $stateParams, labsService) {
    this.lab = {};

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.labsService = labsService;

    this.getLab();
  }

  getLab() {
    let labId = this.$stateParams.labId;
    this.labsService
      .getLab(labId)
      .then(res => {
        console.log(res);
        this.lab = res.data;
      })
      .catch(err => {})
      .finally(() => {
        this.$scope.$apply();
      });
  }
}

export default MaterialsController;
