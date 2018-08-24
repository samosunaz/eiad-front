import $ from 'jquery';
import moment from 'moment';

class ReservationController {
  constructor($scope, $stateParams, alabsService, materialService, modaler) {
    'ngInject';
    this.material = {};
    this.availableHours = false;

    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.labsService = alabsService;
    this.materialService = materialService;
    this.modaler = modaler;

    this.getClasses();
    this.getMaterial();
  }

  async getClasses() {
    let labId = this.$stateParams.labId;
    try {
      this.labClasses = await this.labsService.getClasses(labId);
      this.initializeCalendar(this.labClasses);
    } catch (error) {
      console.log(error);
    }
  }

  async getMaterial() {
    let materialId = this.$stateParams.materialId;
    let material = await this.materialService.get(materialId);
    this.material = material;
    this.$scope.$apply();
    console.log(material);
    try {
    } catch (error) {}
  }

  initializeCalendar(events) {
    const calendarOpts = {
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
        if (isValidHourRange(start, end)) {
          this.modaler.showAlert(
            'Máximo de horas superado',
            'Puedes reservar hasta por un máximo de 5 horas.',
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
          .then(res => {})
          .catch(err => {});
      },
      dragScroll: false,
      disableDragging: true,
    };
    $('#calendar').fullCalendar(calendarOpts);
  }
}

export default ReservationController;

function isValidHourRange(start, end) {
  const MAXIMUM_RESERVATION_HOURS = 5;
  let difference = end.diff(start, 'hours');
  return difference > MAXIMUM_RESERVATION_HOURS;
}
