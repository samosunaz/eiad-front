require('./dashboard.scss');

class DashboardController {
  constructor($scope, $state, floorsService, alabsService, authenticator) {
    'ngInject';
    this.floors = [];
    this.labs = [];

    this.$scope = $scope;
    this.$state = $state;
    this.authenticator = authenticator;
    this.floorsService = floorsService;
    this.labsService = alabsService;

    this.user = this.authenticator.getUser();
    this.getFloors();
    this.getLabs();
  }

  async getFloors() {
    try {
      let floors = await this.floorsService.get();
      this.floors = floors;
      this.$scope.$apply();
    } catch (error) {}
  }

  getLabs() {
    this.labsService
      .get()
      .then(res => {
        this.labs = res;
        console.log(this.labs);
      })
      .catch(err => {})
      .finally(() => {
        this.$scope.$apply();
      });
  }

  isAdmin() {
    return this.authenticator.isAdmin();
  }

  logout() {
    this.authenticator.signOut();
    this.$state.go('signIn');
  }
}

export default DashboardController;
