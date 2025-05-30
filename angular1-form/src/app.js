// src/app.js

angular.module('myApp', [])
    .controller('FormController', function () {
        var vm = this;

        vm.firstName = '';
        vm.lastName = '';

        vm.submitForm = function () {
            console.log('Form submitted with:', {
                firstName: vm.firstName,
                lastName: vm.lastName
            });
        };
    });