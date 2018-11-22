export default class memoService {
  constructor($http, $q, API_URL, authenticator) {
    this.$http = $http;
    this.$q = $q;
    this.API_URL = API_URL;
    this.BASE_URL = `${API_URL}/memos`;
    this.authenticator = authenticator;
  }

  async add(reservation) {
    try {
      let response = await this.$http.post(this.BASE_URL, reservation);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  async all(status) {
    try {
      let endpoint = `${
        this.BASE_URL
      }?search=status:${status}&include=material`;

      if (this.authenticator.getUser().role == 'Encargado') {
        endpoint = `${this.API_URL}/users/${
          this.authenticator.getUser().id
        }/labs/memos?status=${status}`;
      }
      let response = await this.$http.get(endpoint);
      return response.data;
    } catch (error) {
      return this.$q.reject(error);
    }
  }

  get() {}

  async update(memo) {
    try {
      let response = await this.$http.put(`${this.BASE_URL}/${memo.id}`, memo);
      return response.data;
    } catch (error) {
      return $q.reject(error);
    }
  }
}
