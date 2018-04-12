import NavController from './nav.controller';

export default function eiadNav() {
  const directive = {
    restrict: 'E',
    bindToController: true,
    controller: NavController,
    controllerAs: 'vm',
    scope: {},
    template: require('./nav.directive.html'),
  };

  return directive;
}
