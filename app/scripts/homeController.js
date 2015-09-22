/*global angular*/
(function () {
    'use strict';

    angular.module('pointCalculator').controller('HomeController', ['$state', 'sharedPropertiesService', HomeController]);



    function HomeController($state, sharedPropertiesService) {

        var vm = this;

      var players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];


      vm.startNewGame = function startNewGame() {
        if (areAllNamesFilledIn()) {

          sharedPropertiesService.startNewGameWithNames(players);
          $state.go('app.whiststanding');

        } else {

        }
      };

      vm.resumeGame = function resumeGame() {
          $state.go('app.whiststanding');
      };

      function areAllNamesFilledIn() {

        return true;

      }

    }


}());
