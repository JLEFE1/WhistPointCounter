/*global angular*/
(function () {
    'use strict';

    angular.module('whist').controller('WhistStandingController', ['sharedPropertiesService', '$state',  WhistStandingController]);



    function WhistStandingController(sharedPropertiesService, $state) {

        var vm = this, initGame = true;

        vm.game = sharedPropertiesService.getGame();

        vm.isGameStartedBool = false;

        vm.allNamesAreFilledIn = true;

        (function initNewGame() {
            if (initGame) {
                sharedPropertiesService.startNewGame();
                initGame = false;
            }
        }());

        vm.addNewResult = function addNewResult() {
          //TODO Add link when feature is added
          //$state.go("app.whistcalculatepoints");
        };

        function areAllNamesFilledIn() {
            var filledIn = true, i;

            for (i = 0; i < vm.game.players.length; i += 1) {
                if (vm.game.players[i].name === null) {
                    filledIn = false;
                }
            }

            return filledIn;

        }

        vm.startNewGame = function startNewGame() {
            if (areAllNamesFilledIn()) {
                sharedPropertiesService.startNewGame();
                vm.isGameStartedBool = true;
            } else {
                vm.allNamesAreFilledIn = false;
            }
        };

        vm.fetchPlayerStatistics = function fetchPlayerStatistics(playerId) {
            //TODO Add link when feature is added
            //$state.go("app.player", { id: playerId });
        };
    }

}());
