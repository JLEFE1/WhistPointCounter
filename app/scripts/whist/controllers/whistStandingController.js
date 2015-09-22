/*global angular*/
(function () {
    'use strict';

    angular.module('whist').controller('WhistStandingController', ['sharedPropertiesService', '$state',  WhistStandingController]);



    function WhistStandingController(sharedPropertiesService, $state) {

        var vm = this;

        vm.game = sharedPropertiesService.getGame();

        vm.addNewResult = function addNewResult() {
          $state.go('app.whistcalculatepoints');
        };

        vm.fetchPlayerStatistics = function fetchPlayerStatistics(playerId) {
            $state.go('app.player', { id: playerId });
        };
    }

}());
