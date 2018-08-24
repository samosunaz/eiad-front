class AdminUsersController {
  constructor($scope, $state, modaler, userService) {
    this.users = [];

    this.$scope = $scope;
    this.$state = $state;
    this.modaler = modaler;
    this.userService = userService;

    this.getUsers();
  }

  async getUsers() {
    try {
      let users = await this.userService.get();
      this.users = users;
      this.$scope.$apply();
      console.log(this.users);
    } catch (error) {
      console.log(error);
    }
  }
  openAddEditModal(type, user) {
    let modUser = {};
    angular.copy(user, modUser);
    let text = type == 0 ? 'Añadir usuario' : 'Editar usuario';
    let action = { type: type, text: text };
    let roles = [false, false, false];
    this.modaler
      .showAddEditUser(action, modUser, roles)
      .then(async user => {
        try {
          if (type == 0) {
            let newUser = await this.userService.add(user);
            console.log(newUser);
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch(cancel => {
        console.log(cancel);
      });
  }

  openDeleteModal(user) {
    let modUser = {};
    angular.copy(user, modUser);
    this.modaler
      .showConfirm(
        '¿Eliminar usuario?',
        `El usuario con ID ${modUser.id} será eliminado.`,
        'Confirmar',
        'Cancelar',
      )
      .then(
        async confirm => {
          let response = await this.userService.delete(modUser);
          console.log(response);
        },
        cancel => {},
      );
  }
}

export default AdminUsersController;
