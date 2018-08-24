class modaler {
  constructor($compile, $rootScope) {
    this.$compile = $compile;
    this.$rootScope = $rootScope;
  }

  showAddEditClass(action, labClass, labs) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/add-edit-class-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.action = action;
      scope.labs = labs;
      scope.labClass = {};
      angular.copy(labClass, scope.labClass);
      scope.type = 0;
      scope.setType = type => {
        scope.type = type;
      };
      scope.days = [false, false, false, false, false, false, false];
      let compiled = this.$compile(template)(scope);
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          let selectedDays = [];
          scope.days.forEach((day, index) => {
            if (day) {
              selectedDays.push(index);
            }
          });
          scope.labClass.days = selectedDays.toString();
          scope.type == 1 ? resolve(scope.labClass) : reject('Modal closed');
          scope.$destroy();
        });
    });
  }

  showAddEditFloor(action, floor) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/add-edit-floor-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.action = action;
      scope.floor = {};
      scope.type = 0;
      scope.setType = type => {
        scope.type = type;
      };
      angular.copy(floor, scope.floor);
      let compiled = this.$compile(template)(scope);
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          scope.type == 1 ? resolve(scope.floor) : reject('Modal closed');
          scope.$destroy();
        });
    });
  }

  showAddEditLab(action, lab, floors, users) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/add-edit-lab-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.action = action;
      scope.floors = floors;
      scope.lab = lab;
      scope.type = 0;
      scope.users = users;
      scope.setType = type => {
        scope.type = type;
      };
      let compiled = this.$compile(template)(scope);
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          if (scope.type == 1) {
            resolve(scope.lab);
          } else {
            reject('Modal close canceled');
          }
          scope.$destroy();
        });
    });
  }

  showAddEditUser(action, user, roles) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/add-edit-user-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.action = action;
      scope.roles = roles;
      scope.user = user;
      scope.type = 0;
      scope.setType = type => {
        scope.type = type;
      };
      let compiled = this.$compile(template)(scope);
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          let newRoles = [];
          scope.roles.forEach((value, index) => {
            if (value) {
              newRoles.push(index + 1);
            }
          });
          scope.user.roles = newRoles;
          if (scope.type == 1) {
            resolve(scope.user);
          } else {
            reject('Modal close canceled');
          }
          scope.$destroy();
        });
    });
  }

  showAlert(title, text, btnLabel, callback) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/alert-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.title = title;
      scope.text = text;
      scope.btnLabel = btnLabel;
      scope.callback = callback;
      let compiled = this.$compile(template)(scope);
      scope.$apply();
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          resolve('Alert modal closed.');
        });
    });
  }

  showConfirm(title, text, confirmLabel, cancelLabel) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/confirm-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.title = title;
      scope.text = text;
      scope.confirm = confirmLabel;
      scope.cancel = cancelLabel;
      scope.type = 0;
      scope.setType = type => {
        scope.type = type;
      };
      let compiled = this.$compile(template)(scope);
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          if (scope.type == 1) {
            resolve();
          } else {
            reject();
          }
        });
    });
  }

  showCreateReservation(material, start, end, parsedDay) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/create-reservation-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.material = material;
      scope.startsAt = start;
      scope.endsAt = end;
      scope.parsedDay = parsedDay;
      scope.setType = type => {
        scope.type = type;
      };
      let compiled = this.$compile(template)(scope);
      scope.$apply();
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          if (scope.type != 0) {
            resolve(scope.type);
          } else {
            reject();
          }
        });
    });
  }

  showPrompt(title, action1, action2, closeLabel) {
    return new Promise((resolve, reject) => {
      let template = require('./../templates/modals/prompt-modal.template.html');
      let scope = this.$rootScope.$new(true);
      scope.title = title;
      scope.action1 = action1;
      scope.action2 = action2;
      scope.closeLabel = closeLabel;
      scope.type = 0;
      scope.setType = type => {
        scope.type = type;
      };
      let compiled = this.$compile(template)(scope);
      scope.$apply();
      $(compiled)
        .modal({})
        .on('hidden.bs.modal', () => {
          if (scope.type != 0) {
            resolve(scope.type);
          } else {
            reject();
          }
        });
    });
  }
}

export default modaler;
