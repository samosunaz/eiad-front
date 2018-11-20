export default function routing($stateProvider) {
  'ngInject';
  let homeState = {
    name: 'home',
    url: '/',
    controller: 'HomeController',
    controllerAs: 'vm',
    template: require('./home.html'),
  };
  $stateProvider.state(homeState);
}
