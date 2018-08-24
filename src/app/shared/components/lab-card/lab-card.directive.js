import LabCardController from './lab-card.controller';

function eiadLabCard() {
  const directive = {
    restrict: 'E',
    bindToController: true,
    scope: {
      lab: '=',
    },
    controller: LabCardController,
    controllerAs: 'vm',
    template: require('./lab-card.html'),
  };

  return directive;
}

export default eiadLabCard;
