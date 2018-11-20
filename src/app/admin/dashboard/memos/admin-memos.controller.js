export default class AdminMemosController {
  constructor($scope, memoService) {
    'ngInit';

    this.$scope = $scope;
    this.memoService = memoService;

    this.approvedMemos = [];
    this.pendingMemos = [];
    this.canceledMemos = [];
    this.selectedMemos = [];
    this.filterMemos = '';

    this.activate();
  }

  activate() {
    this.getAllMemos();
    this.$scope.$apply();
  }

  onFilterChange() {
    switch (this.filterMemos) {
      case 'approved':
        this.selectedMemos = this.approvedMemos;
        break;
      case 'pending':
        this.selectedMemos = this.pendingMemos;
        break;
      case 'canceled':
        this.selectedMemos = this.canceledMemos;
        break;
      default:
        this.selectedMemos = this.pendingMemos;
        break;
    }
  }

  async getAllMemos() {
    try {
      let approvedRes = await this.memoService.all('approved');
      let pendingRes = await this.memoService.all('pending');
      let canceledRes = await this.memoService.all('canceled');
      this.approvedMemos = approvedRes.data;
      this.pendingMemos = pendingRes.data;
      this.canceledMemos = canceledRes.data;
    } catch (error) {
      console.log(error);
    }
  }
}
