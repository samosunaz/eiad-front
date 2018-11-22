class AdminUsersController {
  constructor($scope, $state, modaler, roleService, userService) {
    this.users = [];
    this.roles = [];

    this.$scope = $scope;
    this.$state = $state;
    this.modaler = modaler;
    this.roleService = roleService;
    this.userService = userService;

    this.activate();
  }

  activate() {
    this.getRoles();
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

  async getRoles() {
    let roles = await this.roleService.all();
    this.roles = roles;
    this.$scope.$apply();
  }

  openAddEditModal(type, user) {
    let modUser = {};
    angular.copy(user, modUser);
    let text = type == 0 ? 'Añadir usuario' : 'Editar usuario';
    let action = { type: type, text: text };
    let roles = this.roles;
    this.modaler
      .showAddEditUser(action, modUser, roles)
      .then(async user => {
        try {
          if (type == 0) {
            let newUser = await this.userService.add(user);
            this.$state.reload();
          } else {
          }
        } catch (error) {
          this.modaler.showAlert(
            'Usuario no agregado',
            'Por favor inténtalo de nuevo',
            'Entendido',
          );
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
          try {
            let response = await this.userService.delete(modUser);
            this.$state.reload();
          } catch (error) {
            this.modaler.showAlert(
              'El usuario no pudo ser eliminado',
              'Comprueba que no tenga laboratorios asignados',
              'Entendido',
            );
          }
        },
        cancel => {},
      );
  }
}

export default AdminUsersController;
