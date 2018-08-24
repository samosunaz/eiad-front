class floorsService {
  constructor($http, $q, API_URL) {
    'ngInit';
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
  }

  async add(floor) {
    try {
      let response = await this.$http.post(`${this.API_URL}/floors`, floor);
      let newFloor = response.data;
      return newFloor;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async edit(floor) {
    try {
      let response = await this.$http.put(
        `${this.API_URL}/floors/${floor.id}`,
        floor,
      );
      return response;
    } catch (error) {
      return $q.reject(error);
    }
  }

  async delete(floorId) {
    try {
      let response = await this.$http.delete(
        `${this.API_URL}/floors/${floorId}`,
      );
      return response;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async get() {
    try {
      const response = await this.$http.get(`${this.API_URL}/floors`);
      let floors = response.data;
      this.floors = floors;
      return floors;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}

export default floorsService;
