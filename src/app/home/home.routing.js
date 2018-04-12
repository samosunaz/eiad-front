export default function routing($stateProvider) {
  'ngInject';
  const homeState = {
    name: 'home',
    url: '/',
    controller: 'HomeController',
    controllerAs: 'vm',
    template: require('./home.html'),
  };
  $stateProvider.state(homeState);
}
