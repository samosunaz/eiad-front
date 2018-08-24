class userService {
  constructor($http, $q, API_URL) {
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
  }

  async add(user) {
    try {
      let response = await this.$http.post(`${this.API_URL}/users`, user);
      let newUser = response.data;
      return newUser;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async delete(user) {
    try {
      let response = await this.$http.delete(
        `${this.API_URL}/users/${user.id}`,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async get() {
    try {
      let response = await this.$http.get(`${this.API_URL}/users`);
      let users = response.data;
      return users;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getInChargeOf() {
    try {
      let chargeRole = 2;
      let response = await this.$http.get(
        `${this.API_URL}/roles/${chargeRole}`,
      );
      let users = response.data;
      return users;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}

export default userService;
