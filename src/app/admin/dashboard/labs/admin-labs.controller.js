class AdminLabsController {
  constructor(
    $scope,
    $state,
    modaler,
    floorsService,
    alabsService,
    buildingService,
    roleService,
    userService,
  ) {
    'ngInit';

    this.selectedLab = {};
    this.floors = [];
    this.buildings = [];
    this.labs = [];
    this.usersInCharge = [];

    this.$scope = $scope;
    this.$state = $state;
    this.floorsService = floorsService;
    this.labsService = alabsService;
    this.modaler = modaler;
    this.buildingService = buildingService;
    this.roleService = roleService;
    this.userService = userService;

    this.getLabs();
    this.getFloors();
    this.getBuildings();
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

  async getBuildings() {
    try {
      this.buildings = await this.buildingService.all();
      console.log(this.buildings);
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersInCharge() {
    try {
      let response = await this.roleService.getRoleUsers(2);
      this.usersInCharge = response;
    } catch (error) {
      console.log(error);
    }
  }

  async addLab(lab) {
    try {
      let response = await this.labsService.add(lab);
      let newLab = response.data.data;
      newLab.this.modaler.showAlert(
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
    console.log(this.usersInCharge);
    this.modaler
      .showAddEditLab(
        action,
        lab,
        this.floors,
        this.usersInCharge,
        this.buildings,
      )
      .then(
        async lab => {
          if (type == 0) {
            await this.addLab(lab);
          } else {
            await this.updateLab(lab);
          }
          this.$state.reload();
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

  async updateLab(lab) {
    await this.labsService.update(lab);
  }
}

export default AdminLabsController;
