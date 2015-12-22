/*global angular*/
(function () {
    'use strict';

    angular.module('players').controller('PlayersController', ['$state', 'sharedPropertiesService', PlayersController]);



    function PlayersController($state, sharedPropertiesService) {

        var vm = this;



        vm.game = sharedPropertiesService.getGame();



        vm.selectPlayer = function selectPlayer(playerId) {
            $state.go('app.player', { id: playerId });
        };

    }


}());
