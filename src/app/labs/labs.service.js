class LabsService {
  constructor($http, $q, API_URL) {
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
    this.getConfig = { cache: true };
  }

  async getLab(labId) {
    try {
      let lab = await this.$http.get(
        `${this.API_URL}/labs/${labId}`,
        this.getConfig,
      );
      return lab;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getFloors() {
    try {
      let floors = await this.$http.get(
        `${this.API_URL}/floors`,
        this.getConfig,
      );
      return floors;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async getFloorLabs(floorId) {
    try {
      let labs = await this.$http.get(
        `${this.API_URL}/floors/${floorId}/labs`,
        this.getConfig,
      );
      return labs;
    } catch (error) {
      return this.$q.reject(error);
    }
  }
}
export default LabsService;
