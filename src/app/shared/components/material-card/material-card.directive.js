import MaterialCardController from './material-card.controller';

function eiadMaterialCard() {
  const directive = {
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
