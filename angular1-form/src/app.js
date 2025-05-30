// src/app.js

angular.module('myApp', [])
    .controller('FormController', function ($scope) {
        var vm = this;

        vm.firstName = '';
        vm.lastName = '';

        vm.submitted = false;

        function sendUpdate() {
            var formData = {
                firstName: vm.firstName,
                lastName: vm.lastName
            };

            console.log('Sending update:', formData);
            if (window.parent && window.parent !== window) {
                console.log('Sending update to parent window:', formData);
                window.parent.postMessage({
                    type: 'ANGULAR_FORM_SUBMITTED',
                    data: formData
                }, '*');
            }
        }

        // Watch for all form changes
        $scope.$watchGroup([
            function () { return vm.firstName; },
            function () { return vm.lastName; },
            function () { return vm.submitted; }
        ], function () {
            if (vm.submitted) {
                sendUpdate();
            }
        });

        vm.submitForm = function () {
            console.log('Form submitted');
            vm.submitted = true;
            sendUpdate(); // Send update immediately on submit
        };
    });