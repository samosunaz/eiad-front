class SignInController {
  constructor($scope, $state, authenticator, modaler) {
    'ngInit';
    this.isLogginIn = false;
    this.user = { email: '', password: '' };

    this.$state = $state;
    this.authenticator = authenticator;
    this.modaler = modaler;
  }

  async signIn() {
    this.isLogginIn = true;
    try {
      let response = await this.authenticator.signIn(
        this.user.email,
        this.user.password,
      );
      this.$state.go('adminMemos');
      this.authenticator.setUser(response.user);
      localStorage.setItem('token', response.token);
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
