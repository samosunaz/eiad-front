class classesService {
  constructor($http, $q, API_URL) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.BASE_URL = `${API_URL}/lab_classes`;
  }

  async add(labClass) {
    try {
      let response = await this.$http.post(this.BASE_URL, labClass);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async delete(classId) {
    try {
      let response = await this.$http.delete(`${this.BASE_URL}/${classId}`);
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async get() {
    try {
      let response = await this.$http.get(this.BASE_URL);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async update(labClass) {
    try {
      let response = await this.$http.put(
        `${this.BASE_URL}/${labClass.id}`,
        labClass,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}

export default classesService;
