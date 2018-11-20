export default class AdminBuildingsController {
  constructor($scope, $state, buildingService, modaler) {
    'ngInject';

    this.$scope = $scope;
    this.$state = $state;

    this.buildings = [];
    this.buildingService = buildingService;
    this.modaler = modaler;

    this.activate();
  }

  activate() {
    this.getBuildings();
  }

  async getBuildings() {
    let buildings = await this.buildingService.all();
    this.buildings = buildings;
    this.$scope.$apply();
  }

  async deleteBuilding(id) {
    try {
      let response = await this.buildingService.destroy(id);
      this.$state.reload();
    } catch (error) {
      console.log(error);
      this.modaler.showAlert(
        `El edificio con ID ${id} no pudo ser eliminado`,
        error.data.message,
        'Cerrar',
      );
    }
  }

  async addBuilding(building) {
    try {
      let newBulding = await this.buildingService.add(building);
      this.buildings.push(newBulding.data);
      this.buildings.sort((a, b) => {
        return a['id'] - b['id'];
      });
      this.$scope.$apply();
    } catch (error) {
      console.log(error);
      this.modaler.showAlert(
        'El edificio no pudo ser añadido',
        'Inténtalo de nuevo',
        'Entendido',
      );
    }
  }

  async editBuilding(building) {
    try {
      let edittedBuilding = await this.buildingService.edit(building);
      this.$state.reload();
    } catch (error) {
      console.log(error);
      this.modaler.showAlert(
        'El edificio no pudo ser editado',
        'Inténtalo de nuevo',
        'Entendido',
      );
    }
  }

  openAddEditBuildingModal(type, building) {
    let text = type == 0 ? 'Agregar edificio' : 'Editar edificio';
    let action = { type: type, text: text };
    this.modaler
      .showAddEditBuilding(action, building)
      .then(buildingRes => {
        if (type == 0) {
          this.addBuilding(buildingRes);
        } else {
          this.editBuilding(buildingRes);
        }
      })
      .catch(cancel => {});
  }

  openConfirmDeleteModal(building) {
    this.modaler
      .showConfirm(
        '¿Eliminar edificio?',
        `El edificio con ID ${building.id} será eliminado`,
        'Confirmar',
        'Cancelar',
      )
      .then(
        confirm => {
          this.deleteBuilding(building.id);
        },
        cancel => {},
      );
  }
}
