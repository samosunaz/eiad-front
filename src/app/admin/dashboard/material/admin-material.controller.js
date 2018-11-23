class AdminMaterialController {
  constructor(
    $compile,
    $scope,
    $state,
    $templateRequest,
    materialService,
    modaler,
  ) {
    'ngInit';
    this.materials = [];
    this.selectedMaterial = {};
    this.currentAction = {};

    this.$compile = $compile;
    this.$scope = $scope;
    this.$state = $state;
    this.$templateRequest = $templateRequest;
    this.materialService = materialService;
    this.modaler = modaler;

    this.getMaterial();
  }

  addMaterial() {
    this.materialService
      .add(this.selectedMaterial)
      .then(res => {
        this.$state.reload();
      })
      .catch(err => {
        this.modaler.showAlert(
          'No se pudo agregar el material',
          err.data.message,
          'Entendido',
        );
      })
      .finally(() => {});
  }
  getMaterial() {
    this.materialService
      .getMaterial()
      .then(res => {
        console.log(res.data);
        this.materials = res.data;
      })
      .catch(err => {})
      .finally(() => {
        this.$scope.$apply();
      });
  }

  deleteMaterial() {
    this.materialService
      .delete(this.selectedMaterial.id)
      .then(res => {
        this.$state.reload();
      })
      .catch(err => {
        console.log('Material not deleted');
      })
      .finally(() => {});
  }

  openEditMaterialModal(material) {
    this.selectedMaterial = {};
    angular.copy(material, this.selectedMaterial);
    this.currentAction['text'] = 'Editar material';
    this.currentAction['type'] = 1;
    $('#editMaterialModal').modal({});
  }

  openConfirmDelete(material) {
    this.selectedMaterial = material;
    this.modaler
      .showConfirm(
        '¿Eliminar material?',
        `El material con ID ${material.id} será eliminado.`,
        'Confirmar',
        'Cancelar',
      )
      .then(
        confirm => {
          this.deleteMaterial();
        },
        cancel => {},
      );
  }

  openAddMaterialModal() {
    this.selectedMaterial = {};
    this.currentAction['text'] = 'Añadir material';
    this.currentAction['type'] = 0;
    $('#editMaterialModal').modal({});
  }

  saveMaterial() {
    switch (this.currentAction.type) {
      case 0:
        this.addMaterial();
        break;
      case 1:
        this.updateMaterial();
        break;
      default:
        break;
    }
  }

  updateMaterial() {
    this.materialService
      .update(this.selectedMaterial)
      .then(res => {
        let material = res.data.data;
        this.modaler
          .showAlert(
            'Material actualizado',
            `Se ha actualizado el material con ID ${material.id}.`,
            'Entendido',
          )
          .then(modalClosed => {
            this.$state.reload();
          });
      })
      .catch(err => {
        console.log(err);
        this.modaler.showAlert(
          'Ocurrió un error',
          'No se pudo actualizar el material',
          'Cerrar',
        );
      })
      .finally(() => {});
  }
}

export default AdminMaterialController;
