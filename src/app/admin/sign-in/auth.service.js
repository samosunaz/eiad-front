class authenticator {
  constructor($http, $q, API_URL) {
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
    this.user = {};
  }

  async signIn(email, password) {
    try {
      let data = {
        email: email,
        password: password,
        action: 'login',
      };
      let response = await this.$http.post(`${this.API_URL}/users`, data);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async auth(token) {
    try {
      let data = { token: token, action: 'authenticate' };
      let response = await this.$http.post(`${this.API_URL}/users`, data);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  isAdmin() {
    return this.user.roles.includes('Administrador');
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  signOut() {
    localStorage.removeItem('token');
  }
}

export default authenticator;
