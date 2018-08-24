class AdminFloorsController {
  constructor($scope, $state, floorsService, modaler) {
    'ngInit';

    this.floors = [];
    this.selectedFloor = {};

    this.$scope = $scope;
    this.$state = $state;
    this.floorsService = floorsService;
    this.modaler = modaler;

    this.activate();
  }

  activate() {
    this.getFloors();
  }

  async addFloor(floor) {
    try {
      let newFloor = await this.floorsService.add(floor);
      this.floors.push(newFloor);
      this.floors.sort((a, b) => {
        return a['id'] - b['id'];
      });
      this.$scope.$apply();
    } catch (error) {
      console.log(error);
      this.modaler.showAlert(
        'El piso no pudo ser añadido',
        'Inténtalo de nuevo',
        'Entendido',
      );
    }
  }

  async editFloor(floor) {
    try {
      let response = await this.floorsService.edit(floor);
      this.$state.reload();
    } catch (error) {
      this.modaler.showAlert(
        'El piso no pudo ser editado',
        'Ocurrió un error',
        'Cerrar',
      );
    }
  }

  async deleteFloor(floorId) {
    try {
      let response = await this.floorsService.delete(floorId);
      this.$state.reload();
    } catch (error) {
      this.modaler.showAlert(
        'El piso con ID no pudo ser eliminado',
        error.data.message,
        'Cerrar',
      );
    }
  }

  async getFloors() {
    try {
      let floors = await this.floorsService.get();
      this.floors = floors;
      this.$scope.$apply();
    } catch (error) {}
  }

  openAddEditFloorModal(type, floor) {
    let text = type == 0 ? 'Agregar piso' : 'Editar piso';
    let action = { type: type, text: text };
    this.modaler.showAddEditFloor(action, floor).then(
      floorRes => {
        if (type == 0) {
          this.addFloor(floorRes);
        } else {
          this.editFloor(floorRes);
        }
      },
      cancel => {},
    );
  }

  openConfirmDeleteModal(floor) {
    this.modaler
      .showConfirm(
        '¿Eliminar piso?',
        `El piso con ID ${floor.id} será eliminado`,
        'Confirmar',
        'Cancelar',
      )
      .then(
        confirm => {
          this.deleteFloor(floor.id);
        },
        cancel => {},
      );
  }

  openEditFloorModal(floor) {}
}

export default AdminFloorsController;
