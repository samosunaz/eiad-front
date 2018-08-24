import moment from 'moment';

class AdminClassesController {
  constructor($scope, $state, classesService, alabsService, modaler) {
    'ngInject';

    this.classes = [];
    this.labs = [];
    this.selectedLab = {};

    this.$scope = $scope;
    this.$state = $state;
    this.classesService = classesService;
    this.labsService = alabsService;
    this.modaler = modaler;

    this.activate();
    $('#getSelectedAssets').click(function() {
      $('#selectedAssets').show();
    });
  }

  activate() {
    /*     this.getClasses(); */
    this.getLabs();
    this.initializeCalendar();
  }

  async addClass(labClass) {
    try {
      let newClass = await this.classesService.add(labClass);
      console.log(newClass);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteClass(labClass) {
    try {
      let response = await this.classesService.delete(labClass.id);
      this.$state.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async getClasses() {
    try {
      let classes = await this.classesService.get();
      this.classes = classes;
      console.log(classes);
    } catch (error) {}
  }

  async getLabs() {
    try {
      let labs = await this.labsService.get();
      this.labs = labs;
      this.$scope.$apply();
    } catch (error) {}
  }

  async getLabClasses(lab) {
    try {
      this.selectedLab = lab;
      let classes = await this.labsService.getClasses(lab.id);
      this.destroyCalendar();
      this.initializeCalendar(classes);
      this.$scope.$apply();
    } catch (error) {
      console.log(error);
    }
  }

  destroyCalendar() {
    $('#classesCalendar').fullCalendar('destroy');
  }

  initializeCalendar(classes) {
    const calendarOpts = {
      header: {
        left: '',
        center: '',
        right: '',
      },
      events: classes,
      eventClick: (event, jsEvent, view) => {
        this.modaler
          .showPrompt('Acción a realizar', 'Editar', 'Borrar', 'Cancelar')
          .then(
            action => {
              if (action == 1) {
                let labClass = {
                  name: event.title,
                  id: event.id,
                  lab_id: event.lab_id,
                  starts_at: event.start.local().toDate(),
                  ends_at: event.end.local().toDate(),
                };
                this.openAddEditClassModal(1, labClass);
              } else if (action == 2) {
                this.deleteClass(event);
              }
            },
            cancel => {},
          );
      },
      allDaySlot: false,
      defaultView: 'agendaWeek',
      locale: 'es',
      maxTime: '23:59',
      minTime: '7:00',
      themeSystem: 'bootstrap4',
    };
    $('#classesCalendar').fullCalendar(calendarOpts);
  }

  openAddEditClassModal(type, labClass) {
    let text = type == 0 ? 'Crear clase' : 'Editar clase';
    let action = { type: type, text: text };
    this.modaler.showAddEditClass(action, labClass, this.labs).then(
      async labClass => {
        let startsAt = moment(labClass.starts_at);
        let endsAt = moment(labClass.ends_at);
        if (endsAt.diff(startsAt) <= 0) {
          this.modaler.showAlert(
            'Lapso de tiempo inválido',
            'La hora de término no puede ser menor que la de inicio',
            'Entendido',
          );
          return;
        }
        labClass.starts_at = startsAt.format('HH:mm:ss');
        labClass.ends_at = endsAt.format('HH:mm:ss');
        if (type == 0) {
          let response = await this.addClass(labClass);
          this.$state.reload();
        } else {
          let response = await this.classesService.update(labClass);
          this.$state.reload();
        }
      },
      cancel => {},
    );
  }

  async updateClass(labClass) {
    try {
      let response = await this.classesService.update(labClass);
    } catch (error) {
      console.log(error);
    }
  }
}

export default AdminClassesController;
