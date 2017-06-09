
(function(){
	angular.module('ProvenoodleApp', []);

	angular.module('ProvenoodleApp').directive("studentsView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/students-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'studentsViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("studentView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/student-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'studentViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("addUpdateStudentView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/add-update-student-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'addUpdateStudentViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("deleteStudentView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/delete-student-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'deleteStudentViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("coursesView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/courses-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'coursesViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("courseView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/course-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'courseViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("addUpdateCourseView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/add-update-course-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'addUpdateCourseViewCtrl' // This is the alias
	  };
	});

	angular.module('ProvenoodleApp').directive("deleteCourseView", function () {
	  return {
	    restrict: 'E', // type of directive
	    templateUrl:"view/templates/delete-course-view.html",
	    controller: function() {
	      // When the document is ready execute this code
	    },
	    controllerAs: 'deleteCourseViewCtrl' // This is the alias
	  };
	});

	// http://stackoverflow.com/questions/11442632/how-can-i-post-data-as-form-data-instead-of-a-request-payload
	// http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
	angular.module('ProvenoodleApp').factory('apiService', ['$http', '$log', '$q', function($http, $log, $q) { 
	    return {
	    	root : "http://localhost:8081/test/v1/",
	  		query: function(url, async, method, params, data) {
	  			var deferred = $q.defer();
	  			$http({
	  				url: this.root + url,
	  				method: method,
	  				asyn: async,
	  				headers: {'Content-Type': 'application/json'},
	  				params: params,
	  				 transformRequest: function(obj) {
				        var str = [];
				        for(var p in obj)
				        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				        return str.join("&");
				    },
	  				data: data
	  			})
	  			.success(function(response, status, headers, config)  {
	  				deferred.resolve(response);
	  			})
	  			.error(function(msg, code) {
	  				deferred.reject(msg);
	  				$log.error(msg, code);
	  				console.log("There has been an error in the server, try again later.");
	  			});

	  			return deferred.promise;
	  		}
	  	}

  	}]);

	angular.module('ProvenoodleApp').service('studentService', ['$http', 'apiService', function($http, apiService) { 
	    return {
	  		getStudents: function() {
	  			return apiService.query('students', true, 'get', {}, {});
	  		},

	  		getStudent: function(id) {
	  			return  apiService.query('students/'+id, true, 'get', {}, {});
	  		},

	  		addStudent: function(name, lastname) {
	  			return  apiService.query('students', true, 'post', {}, {'name' : name, 'lastname': lastname});
	  		},

	  		updateStudent: function(id, name, lastname) {
	  			return  apiService.query('students/'+id, true, 'post', {}, {'name' : name, 'lastname': lastname});
	  		},
			
			deleteStudent: function(id) {
	  			return  apiService.query('students/'+id, true, 'delete', {}, {});
	  		}

	  	}
  	}]);

	angular.module('ProvenoodleApp').service('courseService', ['apiService', function(apiService) { 
	    return {
	  		getCourses: function() {
	  			return apiService.query('courses', true, 'get', {}, {});
	  		},
	  		
	  		getCourse: function(id) {
	  			return  apiService.query('courses/'+id, true, 'get', {}, {});
	  		},

	  		addCourse: function(name) {
	  			return  apiService.query('courses', true, 'post', {}, {'name' : name});
	  		},

	  		updateCourse: function(id, name) {
	  			return  apiService.query('courses/'+id, true, 'post', {}, {'name' : name});
	  		},
			
			deleteCourse: function(id) {
	  			return  apiService.query('courses/'+id, true, 'delete', {}, {});
	  		}
	  	}
  	}]);



})();