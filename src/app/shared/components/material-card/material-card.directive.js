import MaterialCardController from './material-card.controller';

function eiadMaterialCard() {
  let directive = {
    restrict: 'E',
    bindToController: true,
    scope: {
      material: '=',
    },
    controller: MaterialCardController,
    controllerAs: 'vm',
    template: require('./material-card.html'),
  };

  return directive;
}

export default eiadMaterialCard;
