export default function routing($stateProvider) {
  'ngInject';

  const labsState = {
    name: 'labs',
    url: '/laboratorios',
    controller: 'LabsController',
    controllerAs: 'vm',
    template: require('./labs.html'),
  };

  $stateProvider.state(labsState);
}
