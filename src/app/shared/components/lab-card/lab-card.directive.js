import LabCardController from './lab-card.controller';

function eiadLabCard() {
  let directive = {
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
