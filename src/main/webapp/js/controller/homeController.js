// jQuery code
$(document).ready(function () {

});

// angularjs code
/* (function(){ // write your code here })(); */
(function(){
  // This is the instance of our angular app
  //var app = angular.module("VideoClubApp", []);

// http://stackoverflow.com/questions/20612484/angularjs-separating-directive-files-but-staying-on-the-same-module
// http://stackoverflow.com/questions/20087627/how-to-create-separate-angularjs-controller-files
// https://docs.angularjs.org/api/ng/directive/ngApp

angular.module('ProvenoodleApp').controller('StudentController', ['$scope', '$window', function($scope, $window){

//  app.controller("VideoClubController", function($scope) {
    // Controller properties
    this.filmTypes; // Type of films in the system
    this.filmType; // Selected value in the select
    this.nFilms; // Number of films to add
    this.films; // Film data to add

    // Scope variables
    // action: {"init", "add-films"}
    
    
    this.initialize = function () {
      // TODO
      // Get the filmType from the server, an example here:
      // https://github.com/rusben/league-of-developers

      $scope.action = "init";   

      // Initialize filmTypes
      this.filmTypes = [];
      var filmTypeNames = ["Terror", "Comedy", "Romantic"];

      // Create the objects and push into this.filmTypes
      for (var i = 0; i < filmTypeNames.length; i++) {
        var filmTypeObj = new FilmType();
        filmTypeObj.construct(i, filmTypeNames[i]);
        this.filmTypes.push(filmTypeObj);
      }

      // Default values
      this.filmType = this.filmTypes[0];
      this.nFilms = 3;

    };

    this.initializeAddFilmsForm = function () {
      this.films = [];
      // We construct the film objects with the selected parameters and the default values
      for (var i = 0; i < this.nFilms; i++) {
        var filmObj = new Film();
        // id, idFilmType, name, director, price, available
        filmObj.construct(i, this.filmType, "", "", "", true);
        this.films.push(filmObj);
      }
    };

    this.validNFilms = function () {
      return (!isNaN(this.nFilms) && this.nFilms >= 1 && this.nFilms % 1 === 0 && this.nFilms !== "");
    };

    this.validFilmName = function (i) {
      return (this.films[i].getName() !== "");
    };

    this.validFilmDirector = function (i) {
      return (this.films[i].getDirector() !== "");
    };

    this.validFilmPrice = function (i) {
      return (!isNaN(this.films[i].getPrice()) && this.films[i].getPrice() > 0 && this.films[i].getPrice() !== "");
    };

    // Get an Array with dimension num
    $scope.getNumber = function(num) {
      var a = []; 
      for(var i=0; i<num; i++) a.push(i);
      return a;
    }

    this.addFilmsForm = function () {
      if (this.validNFilms()) {       
        this.initializeAddFilmsForm();
        $scope.action= "add-films";
      }
    }

    this.validForm = function () {
      for (var i = 0; i < this.films.length; i++) {
        if (!this.validFilmName(i) || !this.validFilmDirector(i) || !this.validFilmPrice(i)) return false;
      }
      return true;      
    }

    /* PopUp  http://stackoverflow.com/questions/21519113/angularjs-open-a-new-browser-window-yet-still-retain-scope-and-controller-and 
              http://stackoverflow.com/questions/23995765/using-window-opener-for-a-function-in-angularjs */

    this.popupResult = function () {
      if (this.validForm()) {
        var popupWindow = window.open('view/popup/popup.html');
        $scope.action= "init";
      }
    }

    this.initialize();
    
  }]);

angular.module('ProvenoodleApp').directive("addFilmsViewForm", function () {
  return {
    restrict: 'E', // type of directive
    templateUrl:"view/templates/add-films-view-form.html",
    controller: function() {
      // When the document is ready execute this code
    },
    controllerAs: 'addFilmsViewFormCtrl' // This is the alias
  };
});

})();
