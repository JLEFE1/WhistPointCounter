/*global angular*/
(function () {
    'use strict';

    angular.module('whist').controller('ChangePointsController', ['$state', 'sharedPropertiesService', ChangePointsController]);



    function ChangePointsController($state, sharedPropertiesService) {

        var vm = this, player;

        vm.hasNoError = true;

        vm.points = [];

        vm.game = sharedPropertiesService.getGame();

        (function setPoints() {
            var game = sharedPropertiesService.getGame(), i;
            for (i = 0; i < game.players.length; i += 1) {
                player = {
                    id: game.players[i].id,
                    name: game.players[i].name,
                    totalPoints: game.players[i].totalPoints
                    //TODO Needs an updat of the global result array
                    //pointsOverview: game.players[i].pointsOverview
                };
                vm.points.push(player);

            }

        }());

        function reset() {
            vm.points = [];
        }

        vm.calculateSum = function calculateSum() {
            var sum = 0, i;
            for (i = 0; i < vm.points.length; i += 1) {
              sum = sum + vm.points[i].totalPoints;
            }

            return sum;
        };

        vm.sumEqualsZero = function sumEqualsZero() {
            return vm.calculateSum() === 0;
        };

        vm.saveChanges = function saveChanges() {

            if (vm.sumEqualsZero()) {
                sharedPropertiesService.alterPoints(vm.points);

                //TODO Solve problems with go back errorS
                //reset();
                //$state.go("app.whiststanding");
            } else {
                //TODO Add error message
                vm.hasNoError = false;
            }


        };

    }


}());
