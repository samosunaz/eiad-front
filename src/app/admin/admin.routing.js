import AdminController from './admin.controller';
import AdminBuildingsController from './dashboard/buildings/admin-buildings.controller';
import AdminClassesController from './dashboard/classes/admin-classes.controller';
import DashboardController from './dashboard/dashboard.controller';
import AdminFloorsController from './dashboard/floors/admin-floors.controller';
import AdminLabsController from './dashboard/labs/admin-labs.controller';
import AdminMaterialController from './dashboard/material/admin-material.controller';
import AdminMemosController from './dashboard/memos/admin-memos.controller';
import AdminUsersController from './dashboard/users/admin-users.controller';
import SignInController from './sign-in/sign-in.controller';

function routing($stateProvider) {
  'ngInject';

  let admin = {
    abstract: true,
    name: 'admin',
    url: '/admin',
    controller: AdminController,
    controllerAs: 'vm',
    template: require('./admin.html'),
  };

  let dashboard = {
    abstract: true,
    name: 'dashboard',
    url: '/dashboard',
    controller: DashboardController,
    controllerAs: 'dashVm',
    parent: admin,
    template: require('./dashboard/dashboard.html'),
  };

  let signIn = {
    name: 'signIn',
    url: '/acceso',
    controller: SignInController,
    controllerAs: 'vm',
    template: require('./sign-in/sign-in.html'),
  };

  let adminClasses = {
    name: 'adminClasses',
    url: '/clases',
    controller: AdminClassesController,
    controllerAs: 'vm',
    parent: dashboard,
    data: {
      admin: true,
    },
    template: require('./dashboard/classes/admin-classes.html'),
  };

  let adminBuildings = {
    name: 'adminBuildings',
    url: '/edificios',
    controller: AdminBuildingsController,
    controllerAs: 'vm',
    parent: dashboard,
    data: {
      admin: true,
    },
    template: require('./dashboard/buildings/admin-buildings.html'),
  };

  let adminFloors = {
    name: 'adminFloors',
    url: '/pisos',
    controller: AdminFloorsController,
    controllerAs: 'vm',
    parent: dashboard,
    data: {
      admin: true,
    },
    template: require('./dashboard/floors/admin-floors.html'),
  };

  let adminLabs = {
    name: 'adminLabs',
    url: '/laboratorios',
    controller: AdminLabsController,
    controllerAs: 'vm',
    parent: dashboard,
    data: {
      admin: true,
    },
    template: require('./dashboard/labs/admin-labs.html'),
  };

  let adminMaterial = {
    name: 'adminMaterial',
    url: '/material',
    controller: AdminMaterialController,
    controllerAs: 'vm',
    parent: dashboard,
    template: require('./dashboard/material/admin-material.html'),
  };

  let adminMemos = {
    name: 'adminMemos',
    url: '/memos',
    controller: AdminMemosController,
    controllerAs: 'vm',
    parent: dashboard,
    template: require('./dashboard/memos/admin-memos.html'),
  };

  let adminUsers = {
    name: 'adminUsers',
    url: '/usuarios',
    controller: AdminUsersController,
    controllerAs: 'vm',
    parent: dashboard,
    data: {
      admin: true,
    },
    template: require('./dashboard/users/admin-users.html'),
  };

  $stateProvider
    .state(admin)
    .state(dashboard)
    .state(signIn)
    .state(adminClasses)
    .state(adminBuildings)
    .state(adminFloors)
    .state(adminLabs)
    .state(adminMaterial)
    .state(adminMemos)
    .state(adminUsers);
}

export default routing;
