export default class LabsService {
  constructor() {
    this.labs = [
      {
        id: 'EIAD01',
        name: 'Primer Piso',
      },
      {
        id: 'EIAD02',
        name: 'Segundo Piso',
      },
      {
        id: 'EIAD03',
        name: 'Tercer Piso',
      },
    ];
  }
  getLabs() {
    return this.labs;
  }
}
