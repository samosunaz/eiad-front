class SignInController {
  constructor($scope, $state, authenticator, modaler) {
    'ngInit';
    this.isLogginIn = false;
    this.user = { email: '', password: '' };

    this.$scope = $scope;
    this.$state = $state;
    this.authenticator = authenticator;
    this.modaler = modaler;
  }

  async signIn() {
    this.isLogginIn = true;
    try {
      let response = await this.authenticator.login(
        this.user.email,
        this.user.password,
      );
      localStorage.setItem('token', response.token);
      this.authenticator.setUser(response.user.data);
      this.$state.go('adminMemos');
    } catch (error) {
      this.modaler.showAlert(
        'Error al iniciar sesión',
        'Usuario o contraseña inválidos.',
        'Cerrar',
      );
      this.isLogginIn = false;
    }
  }
}

export default SignInController;
