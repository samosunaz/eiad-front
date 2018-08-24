export default class HomeController {
  constructor() {
    $('.carousel').carousel();
    this.name = 'Samuel';
  }

  changeName() {
    this.name = 'Osuna';
  }
}
