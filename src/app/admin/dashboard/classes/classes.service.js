class classesService {
  constructor($http, $q, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
  }

  async add(labClass) {
    try {
      let response = await this.$http.post(`${this.API_URL}/classes`, labClass);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async delete(classId) {
    try {
      let response = await this.$http.delete(
        `${this.API_URL}/classes/${classId}`,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async get() {
    try {
      let response = await this.$http.get(`${this.API_URL}/classes`);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async update(labClass) {
    try {
      let response = await this.$http.put(
        `${this.API_URL}/classes/${labClass.id}`,
        labClass,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}

export default classesService;
