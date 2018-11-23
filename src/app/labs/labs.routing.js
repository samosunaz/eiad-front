import LabsController from './labs.controller';
import MaterialsController from './materials/materials.controller';
import ReservationController from './materials/reservation/reservation.controller';

function routing($stateProvider) {
  'ngInject';

  let labsState = {
    name: 'labs',
    url: '/laboratorios',
    controller: LabsController,
    controllerAs: 'vm',
    template: require('./labs.html'),
  };

  let materials = {
    name: 'materials',
    url: '/:labId/materiales',
    parent: labsState,
    controller: MaterialsController,
    controllerAs: 'matVm',
    template: require('./materials/materials.html'),
  };

  let reservation = {
    name: 'reservation',
    url: '/:materialId',
    parent: materials,
    controller: ReservationController,
    controllerAs: 'rsvVm',
    template: require('./materials/reservation/reservation.html'),
  };

  $stateProvider
    .state(labsState)
    .state(materials)
    .state(reservation);
}

export default routing;
