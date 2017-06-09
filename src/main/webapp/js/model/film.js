function Film() {
  // Properties definition
  this.id;
  this.idFilmType;
  this.name;
  this.director;
  this.price;
  this.available;

  // Methods definition
  this.construct = function (id, idFilmType, name, director, price, available) {
    this.id = id;
    this.idFilmType = idFilmType;
    this.name = name;
    this.director = director;
    this.price = price;
    this.available = available;
  }

  this.getId = function () {
    return this.id;
  }

  this.getIdFilmType = function () {
    return this.idFilmType;
  }

  this.getName = function () {
    return this.name;
  }

  this.getDirector = function () {
    return this.director;
  }

  this.getPrice = function () {
    return this.price;
  }

  this.getAvailable = function () {
    return this.available;
  }

  this.setId = function (id) {
    this.id = id;
  }

  this.setIdFilmType = function (idFilmType) {
    this.idFilmType = idFilmType;
  }

  this.setName = function (name) {
    this.name = name;
  }

  this.setDirector = function (director) {
    this.director = director;
  }

  this.setPrice = function (price) {
    this.price = price;
  }

  this.setAvailable = function (available) {
    this.available = available;
  }

}
