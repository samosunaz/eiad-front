import CarouselController from './carousel.controller';

export default function eiadCarousel() {
  let directive = {
    restrict: 'E',
    bindToController: true,
    controller: CarouselController,
    controllerAs: 'vm',
    scope: {},
    template: require('./carousel.directive.html'),
  };

  return directive;
}
