export default class memoService {
  constructor($http, $q, API_URL) {
    this.$http = $http;
    this.$q = $q;
    this.BASE_URL = `${API_URL}/memos`;
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
      let response = await this.$http.get(
        `${this.BASE_URL}?search=status:${status}&include=material`,
      );
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
