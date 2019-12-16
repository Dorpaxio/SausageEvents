export default class Marker {

  constructor(public obj: {latitude, longitude, description}) {

  }


  getDescription() {
    return this.obj.description;
  }

  isActive() {
    return true;
  }

}
