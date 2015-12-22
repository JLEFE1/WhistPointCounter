/*global angular*/
(function () {
    'use strict';

    angular.module('whist').controller('WhistStandingController', ['sharedPropertiesService', '$state',  WhistStandingController]);



    function WhistStandingController(sharedPropertiesService, $state) {

        var vm = this;

        vm.range = function(n) {
          return new Array(n);
        };

        vm.game = sharedPropertiesService.getGame();

        vm.numberOfRows = (function numberOfRows (){
          if(vm.game.players.length & 1){
            return (vm.game.players.length - 1) / 2;
          } else {
            return vm.game.players.length / 2;
          }
        })();

        vm.addNewResult = function addNewResult() {
          $state.go('app.whistcalculatepoints');
        };

        vm.fetchPlayerStatistics = function fetchPlayerStatistics(playerId) {
            $state.go('app.player', { id: playerId });
        };
    }

}());
