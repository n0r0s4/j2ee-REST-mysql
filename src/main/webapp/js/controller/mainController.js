(function(){
  
angular.module('ProvenoodleApp').controller('MainController', ['$scope', '$window', 'studentService', 'courseService', function($scope, $window, studentService, courseService) { 
    
    this.initialize = function () {
      // TODO
      // Get the filmType from the server, an example here:
      // https://github.com/rusben/league-of-developers

      $scope.action = 'home';

      $scope.isAction = function(action) {
        if ($scope.action === action) return true;
        return false;
      };
      
      $scope.getActionToken = function(action) {
        if ($scope.action === 'students') return "Students";
        if ($scope.action === 'student') return "Student";
        if ($scope.action === 'add-student') return "Add student";
        if ($scope.action === 'delete-student') return "Delete student";
        if ($scope.action === 'courses') return "Courses";
        if ($scope.action === 'course') return "Course";
        if ($scope.action === 'add-course') return "Add course";
        if ($scope.action === 'delete-course') return "Delete course";
      };

    };

    this.studentsView = function () {
      $scope.action = 'students';
      studentService.getStudents().then(function (data) {
        $scope.students = data.student;
      });
    };

    this.studentView = function (id) {
      $scope.action = 'student';
      studentService.getStudent(id).then(function (data) {
        $scope.student = data;
      });
    };

    this.addStudentView = function () {
      $scope.action = 'add-student';
    };

    this.addStudentAction = function (name, lastname) {
      studentService.addStudent(name, lastname).then(function (data) {
        $scope.student = data;
      });
      this.studentsView();
    };

    this.updateStudentView = function (id) {
      $scope.action = 'update-student';
      studentService.getStudent(id).then(function (data) {
        $scope.student = data;
      });
    }; 

    this.updateStudentAction = function (id, name, lastname) {
      studentService.updateStudent(id, name, lastname).then(function (data) {
        $scope.student = data;
      });
      this.studentView(id);
    };

    this.deleteStudentView = function (id) {
      $scope.action = 'delete-student';
      studentService.getStudent(id).then(function (data) {
        $scope.student = data;
      });
    };

    this.deleteStudentAction = function (id) {
      studentService.deleteStudent(id).then(function (data) {
        $scope.student = data;
      });
      this.studentsView();
    };       

    this.coursesView = function () {
      $scope.action = 'courses';
      courseService.getCourses().then(function (data) {
        $scope.courses = data.course;
      });
    };

    this.courseView = function (id) {
      $scope.action = 'course';
      courseService.getCourse(id).then(function (data) {
        $scope.course = data;
      });
    };

    this.addCourseView = function () {
      $scope.action = 'add-course';
    };

    this.addCourseAction = function (name) {
      courseService.addCourse(name).then(function (data) {
        $scope.course = data;
      });
      this.coursesView();
      
    };

    this.updateCourseView = function (id) {
      $scope.action = 'update-course';
      courseService.getCourse(id).then(function (data) {
        $scope.course = data;
      });
    }; 

    this.updateCourseAction = function (id, name) {
      courseService.updateCourse(id, name).then(function (data) {
        $scope.course = data;
      });
      this.courseView(id);
    };

    this.deleteCourseView = function (id) {
      $scope.action = 'delete-course';
      courseService.getCourse(id).then(function (data) {
        $scope.course = data;
      });
    };

    this.deleteCourseAction = function (id) {
      courseService.deleteCourse(id).then(function (data) {
        $scope.course = data;
      });
      this.coursesView();
    };

    $scope.log = function(item) {
      console.log(item);
    }

    $scope.isArray = function(item) {
      return angular.isArray(item);
    }

    
  }]);


})();


/*

http://stackoverflow.com/questions/29467339/how-to-call-a-function-from-another-controller-in-angularjs

Communication between controllers is done though $emit + $on / $broadcast + $on methods.

So in your case you want to call a method of Controller "One" inside Controller "Two", the correct way to do this is:

app.controller('One', ['$scope', '$rootScope'
    function($scope) {
        $rootScope.$on("CallParentMethod", function(){
           $scope.parentmethod();
        });

        $scope.parentmethod = function() {
            // task
        }
    }
]);
app.controller('two', ['$scope', '$rootScope'
    function($scope) {
        $scope.childmethod = function() {
            $rootScope.$emit("CallParentMethod", {});
        }
    }
]);

While $rootScope.$emit is called, you can send any data as second parameter.


*/