class MaterialCardController {
  constructor() {
    this.$onInit = this.onInit;
  }

  loadImage() {
    return require('./../../../../assets/img/materials/' + this.material.name +'.jpg');
  }

  onInit() {}
}

export default MaterialCardController;
