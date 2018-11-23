import $ from 'jquery';

class ReservationController {
  constructor(
    $scope,
    $state,
    $stateParams,
    alabsService,
    materialService,
    memoService,
    modaler,
  ) {
    'ngInject';
    this.material = {};
    this.availableHours = false;

    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.labsService = alabsService;
    this.labId = this.$stateParams.labId;
    this.materialService = materialService;
    this.modaler = modaler;
    this.memoService = memoService;
    this.MAXIMUM_RESERVATION_HOURS = 5;

    this.getClasses();
    this.getMaterial();
  }

  async getClasses() {
    try {
      let response = await this.labsService.getById(this.labId);
      this.labClasses = response.classes.data;
      // this.initializeCalendar(this.labClasses);
    } catch (error) {
      console.log(error);
    }
  }

  async getMaterial() {
    let materialId = this.$stateParams.materialId;
    let material = await this.materialService.getReservations(
      materialId,
      'approved',
    );
    this.material = material.data;
    this.initializeCalendar(this.material.memos.data);
    this.$scope.$apply();
    try {
    } catch (error) {}
  }

  initializeCalendar(events) {
    let calendarOpts = {
      header: {
        left: '',
        center: '',
        right: '',
      },
      events: events,
      allDaySlot: false,
      defaultView: 'agendaWeek',
      locale: 'es',
      maxTime: '23:59',
      minTime: '7:00',
      themeSystem: 'bootstrap4',
      select: this.calendarSelect,
      selectable: true,
      select: (start, end, jsEvent) => {
        if (this.isValidHourRange(start, end)) {
          this.modaler.showAlert(
            'Máximo de horas superado',
            `Puedes reservar hasta por un máximo de ${
              this.MAXIMUM_RESERVATION_HOURS
            } horas.`,
            'Entendido',
          );
          return;
        }
        let parsedDay = start.format('DD [de] MMMM [de] YYYY');
        this.modaler
          .showCreateReservation(
            this.material,
            start.format('hh:mm A'),
            end.format('hh:mm A'),
            parsedDay,
          )
          .then(async reservation => {
            reservation['starts_at'] = start.format('YYYY-MM-DD HH:mm:ss');
            reservation['ends_at'] = end.format('YYYY-MM-DD HH:mm:ss');
            reservation['material_id'] = this.material.id;
            try {
              await this.memoService.add(reservation);
              this.modaler
                .showAlert(
                  'Tu reservación ha sido creada',
                  'Recibirás un correo una vez que sea aprobada o rechazada',
                  'Entendido',
                )
                .then(res => {
                  this.$state.reload();
                });
            } catch (error) {
              this.modaler.showAlert(
                'Reservación no creada',
                'Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo.',
                'Entendido',
              );
            }
          })
          .catch(err => {});
      },
      dragScroll: false,
      disableDragging: true,
    };
    $('#calendar').fullCalendar(calendarOpts);
  }
  isValidHourRange(start, end) {
    let difference = end.diff(start, 'hours');
    return difference > this.MAXIMUM_RESERVATION_HOURS;
  }
}

export default ReservationController;
