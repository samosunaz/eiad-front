export default class MemoCardDirectiveController {
  constructor($state, memoService) {
    'ngInject';
    this.$state = $state;
    this.memoService = memoService;
    this.$onInit = this.onInit;
  }

  onInit() {}

  async updateMemo(memo, status) {
    let memoToUpdate = {};
    memoToUpdate.id = memo.id;
    memoToUpdate.status = status;
    try {
      let response = await this.memoService.update(memoToUpdate);
      this.$state.reload();
    } catch (error) {}
  }

  async approveMemo() {
    try {
      return await this.updateMemo(this.memo, 'approved');
    } catch (error) {}
  }

  async cancelMemo() {
    try {
      return await this.updateMemo(this.memo, 'canceled');
    } catch (error) {}
  }
}
