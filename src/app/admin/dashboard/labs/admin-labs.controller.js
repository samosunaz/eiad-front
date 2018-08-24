class AdminLabsController {
  constructor(
    $scope,
    $state,
    modaler,
    floorsService,
    alabsService,
    userService,
  ) {
    'ngInit';

    this.selectedLab = {};
    this.floors = [];
    this.labs = [];
    this.usersInCharge = [];

    this.$scope = $scope;
    this.$state = $state;
    this.floorsService = floorsService;
    this.labsService = alabsService;
    this.modaler = modaler;
    this.userService = userService;

    this.getLabs();
    this.getFloors();
    this.getUsersInCharge();
  }

  async getLabs() {
    try {
      this.labs = await this.labsService.get();
      this.$scope.$apply();
    } catch (error) {}
  }

  async getFloors() {
    try {
      this.floors = await this.floorsService.get();
    } catch (error) {}
  }

  async getUsersInCharge() {
    try {
      this.usersInCharge = await this.userService.getInChargeOf();
      console.log(this.usersInCharge);
    } catch (error) {}
  }

  async addLab(lab) {
    try {
      let response = await this.labsService.add(lab);
      let newLab = response.data;
      this.modaler.showAlert(
        'Laboratorio añadido',
        `El laboratorio con ID ${newLab.id} se ha añadido exitosamente`,
        `Cerrar`,
      );
      this.labs.push(lab);
      this.labs.sort((a, b) => {
        return a['id'] - b['id'];
      });
      this.$scope.$apply();
    } catch (error) {
      this.modaler.showAlert(
        'El laboratorio no pudo ser añadido',
        error.data.message,
        'Cerrar',
      );
    }
  }

  async deleteLab() {
    try {
      let response = await this.labsService.delete(this.selectedLab.id);
      let index = this.labs.indexOf(this.selectedLab);
      this.$state.reload();
    } catch (error) {}
  }

  openAddEditModal(lab, type) {
    this.selectedLab = {};
    angular.copy(lab, this.selectedLab);
    let text = type == 0 ? 'Agregar laboratorio' : 'Editar laboratorio';
    let action = { text: text, type: type };
    this.modaler
      .showAddEditLab(action, lab, this.floors, this.usersInCharge)
      .then(
        lab => {
          if (type == 0) {
            this.addLab(lab);
          } else {
            this.updateLab(lab);
          }
        },
        cancel => {},
      );
  }
  openDeleteModal(lab) {
    this.selectedLab = {};
    angular.copy(lab, this.selectedLab);
    this.modaler
      .showConfirm(
        '¿Eliminar laboratorio?',
        `El laboratorio con ID ${this.selectedLab.id} será eliminado.`,
        'Confirmar',
        'Cancelar',
      )
      .then(
        confirm => {
          this.deleteLab();
        },
        cancel => {},
      );
  }

  updateLab() {
    console.log('Lab updated!');
  }
}

export default AdminLabsController;
