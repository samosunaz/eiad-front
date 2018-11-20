class labsService {
  constructor($http, $q, API_URL) {
    'ngInject';
    this.getConfig = {
      cache: true,
    };

    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
  }

  async add(lab) {
    try {
      let response = this.$http.post(`${this.API_URL}/labs`, lab);
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async delete(labId) {
    try {
      let response = this.$http.delete(`${this.API_URL}/labs/${labId}`);
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async get() {
    try {
      let response = await this.$http.get(`${this.API_URL}/labs`);
      let labs = response.data.data;
      return labs;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getById(labId) {
    try {
      let response = await this.$http.get(`${this.API_URL}/labs/${labId}`);
      let labs = response.data.data;
      return labs;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async update(lab) {
    try {
      let response = await this.$http.put(
        `${this.API_URL}/labs/${lab.id}`,
        lab,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}

export default labsService;
