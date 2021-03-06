import NavController from './nav.controller';
import './nav.scss';

export default function eiadNav() {
  let directive = {
    restrict: 'E',
    bindToController: true,
    controller: NavController,
    controllerAs: 'vm',
    scope: {},
    template: require('./nav.directive.html'),
  };

  return directive;
}
