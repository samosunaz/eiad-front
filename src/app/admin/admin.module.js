import angular from 'angular';
import core from './../config/core.module';
import shared from './../shared/shared.module';
import routing from './admin.routing';
import buildingService from './dashboard/buildings/buildings.service';
import classesService from './dashboard/classes/classes.service';
import floorsService from './dashboard/floors/floors.service';
import labsService from './dashboard/labs/labs.service';
import materialService from './dashboard/material/material.service';
import memoCardDirective from './dashboard/memos/memo-card.directive';
import memoService from './dashboard/memos/memo.service';
import roleService from './dashboard/users/role.service';
import userService from './dashboard/users/user.service';
import authenticator from './sign-in/auth.service';

let admin = angular
  .module('app.admin', [core, shared])
  .config(routing)
  .run(run)
  .directive('memoCard', memoCardDirective)
  .service('authenticator', authenticator)
  .service('buildingService', buildingService)
  .service('classesService', classesService)
  .service('floorsService', floorsService)
  .service('alabsService', labsService)
  .service('roleService', roleService)
  .service('materialService', materialService)
  .service('memoService', memoService)
  .service('userService', userService).name;

function run($transitions) {
  let enteringAdmin = {
    entering: state => {
      return state.includes.admin;
    },
  };

  let enteringSubAdmin = {
    entering: state => {
      return (
        state.name == 'adminLabs' ||
        state.name == 'adminFloors' ||
        state.name == 'adminUsers' ||
        state.name == 'adminClasses'
      );
    },
  };

  $transitions.onBefore(enteringAdmin, trans => {
    let authenticator = trans.injector().get('authenticator');
    let token = localStorage.getItem('token');
    let stateService = trans.router.stateService;
    if (token == null) {
      return stateService.go('signIn');
    } else {
      return authenticator
        .auth(token)
        .then(res => {
          authenticator.setUser(res.data);
          return true;
        })
        .catch(err => {
          return stateService.go('signIn');
        });
    }
  });

  $transitions.onBefore(enteringSubAdmin, trans => {
    let authenticator = trans.injector().get('authenticator');
    let stateService = trans.router.stateService;
    if (authenticator.isAdmin()) {
      return true;
    } else {
      return stateService.target('adminMemos');
    }
  });
}

export default admin;
