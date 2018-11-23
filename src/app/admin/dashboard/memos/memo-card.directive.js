import MemoCardDirectiveController from './memo-card.controller';

export default function memoCardDirective() {
  return {
    restrict: 'E',
    bindToController: true,
    controller: MemoCardDirectiveController,
    controllerAs: 'vm',
    scope: {
      memo: '=',
    },
    template: require('./memo-card.directive.html'),
  };
}
