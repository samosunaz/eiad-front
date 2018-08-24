class memoService {
  constructor($http, $q, API_URL) {
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
  }

  async add(reservation) {
    try {
      let response = await this.$http.post(
        `${this.API_URL}/reservations`,
        reservation,
      );
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  get() {}

  update() {}
}

export default memoService;
