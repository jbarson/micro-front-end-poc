angular.module('myApp').controller('FormController', function($scope) {
    $scope.formData = {
        firstName: '',
        lastName: ''
    };

    $scope.submitForm = function() {
        console.log('Form submitted with data:', $scope.formData);
    };
});