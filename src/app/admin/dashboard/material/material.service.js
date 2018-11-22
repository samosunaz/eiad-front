class materialService {
  constructor(authenticator, $http, $q, API_URL) {
    'ngInit';
    this.$http = $http;
    this.$q = $q;

    this.authenticator = authenticator;
    this.API_URL = API_URL;
    this.getConfig = {
      cache: true,
    };
  }

  async add(material) {
    try {
      let response = await this.$http.post(
        `${this.API_URL}/materials`,
        material,
      );
      return response;
    } catch (error) {
      console.log(error);
      return this.$q.reject(error);
    }
  }

  async delete(materialId) {
    try {
      let response = await this.$http.delete(
        `${this.API_URL}/materials/${materialId}`,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async get(materialId) {
    try {
      let response = await this.$http.get(
        `${this.API_URL}/materials/${materialId}`,
      );
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getMaterial() {
    try {
      let endpoint = `${this.API_URL}/materials`;
      if (!this.authenticator.isAdmin()) {
        endpoint = `${this.API_URL}/users/${
          this.authenticator.getUser().id
        }/labs/materials`;
      }
      let materials = await this.$http.get(endpoint);
      return materials;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async update(material) {
    try {
      let response = await this.$http.put(
        `${this.API_URL}/materials/${material.id}`,
        material,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getReservations(materialId, status) {
    try {
      let response = await this.$http.get(
        `${
          this.API_URL
        }/materials/${materialId}?include=memos:search(status|${status})`,
      );
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}

export default materialService;
