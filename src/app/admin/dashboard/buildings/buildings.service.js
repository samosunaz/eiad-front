export default class buildingService {
  constructor($http, $q, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.BASE_URL = `${API_URL}/buildings`;
  }

  async all() {
    try {
      let response = await this.$http.get(`${this.BASE_URL}?with=floors`);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async add(building) {
    try {
      let response = await this.$http.post(this.BASE_URL, building);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async edit(building) {
    try {
      let response = await this.$http.put(
        `${this.BASE_URL}/${building.id}`,
        building,
      );
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async destroy(id) {
    try {
      let response = await this.$http.delete(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}
