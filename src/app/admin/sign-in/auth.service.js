export default class authenticator {
  constructor($http, $q, API_URL) {
    'ngInit';
    this.$http = $http;
    this.$q = $q;
    this.baseUrl = `${API_URL}/auth`;
    this.user = {};
  }

  async login(email, password) {
    try {
      let data = {
        email: email,
        password: password,
      };
      let response = await this.$http.post(`${this.baseUrl}/login`, data);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async auth(token) {
    try {
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response = await this.$http.get(
        `${this.baseUrl}/authenticated_user`,
        config,
      );
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  isAdmin() {
    return this.user.role === 'Admin';
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    console.log(user);
    this.user = user;
  }

  signOut() {
    localStorage.removeItem('token');
  }
}
