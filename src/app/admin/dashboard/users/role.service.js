export default class roleService {
  constructor($http, $q, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.BASE_URL = `${API_URL}/roles`;
  }

  async all() {
    try {
      let response = await this.$http.get(this.BASE_URL);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getRoleUsers(id) {
    try {
      let response = await this.$http.get(`${this.BASE_URL}/${id}/users`);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}
