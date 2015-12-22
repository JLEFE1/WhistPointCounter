/*global angular*/
(function () {
    'use strict';

    angular.module('pointCalculator').controller('HomeController', ['$state', 'sharedPropertiesService', HomeController]);



    function HomeController($state, sharedPropertiesService) {

        var vm = this;



      vm.numberOfPlayers = 4;


      vm.test = true;

      //var players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
      vm.players = [{name:null},
        {name:null},
        {name:null},
        {name:null}];

      function goToWhistStanding(){
        if(vm.players.length & 1){
          $state.go('app.whiststandingOdd');
        } else {
          $state.go('app.whiststandingEven');
        }
      }


      vm.startNewGame = function startNewGame() {
        if (areAllNamesFilledIn()) {

          sharedPropertiesService.startNewGameWithNames(_(vm.players).chain().pluck('name').flatten().value());
          goToWhistStanding();

        } else {
          vm.warnMessage = 'Not all names are filled in!';
        }
      };

      vm.resumeGame = function resumeGame() {
        goToWhistStanding();
      };

      function areAllNamesFilledIn() {
        var filledIn = false;
        console.log(_(vm.players).chain().pluck('name').flatten().value().length);
        console.log(_(vm.players).chain().pluck('name').flatten().value());
        if(_(vm.players).chain().pluck('name').flatten().value().length >= 4){
          filledIn = true;

        }
        return filledIn;

      }

      vm.addPlayer = function addPlayer(){
        vm.players.push({name:null});
      };

      vm.removePlayer = function removePlayer(){
        vm.players.pop();
      };

    }


}());
