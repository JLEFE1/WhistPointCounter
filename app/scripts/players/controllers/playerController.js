/*global angular*/
(function () {
    'use strict';

    angular.module('players').controller('PlayerController', ['$scope', '$stateParams', 'sharedPropertiesService', PlayerController]);


    function PlayerController($scope, $stateParams, sharedPropertiesService) {

        var vm = this, playerId = Number($stateParams.id);

        vm.game = sharedPropertiesService.getGame();

        vm.info = {
            player: sharedPropertiesService.getPlayerById(playerId).name,
            ranking: sharedPropertiesService.getPlayerById(playerId).totalPoints

        };

        vm.player = _.find(sharedPropertiesService.getGame().players, function (chr) {

            return chr.id === playerId;
        });

      $scope.labels = (function(){
        var turns = [];

        for (var i =0; i < vm.game.players[0].pointsOverview.length; i += 1){
            turns.push(i + 1);
        }

        return turns;
      })();
      $scope.series = (function(){
        var names = [];

        for (var i =0; i < vm.game.players.length; i += 1){
          names.push(vm.game.players[i].name);
        }

        return names;
      })();
      $scope.data = (function(){
        var results = [];

        for (var i =0; i < vm.game.players.length; i += 1){
          results.push(vm.game.players[i].pointsEvolution);
        }

        return results;
      })();

      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };

    }

}());
