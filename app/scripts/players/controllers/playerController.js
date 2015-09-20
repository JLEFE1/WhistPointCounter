/*global angular*/
(function () {
    'use strict';

    angular.module('players').controller('PlayerController', ['$stateParams', 'sharedPropertiesService', PlayerController]);


    function PlayerController($stateParams, sharedPropertiesService) {

        var vm = this, playerId = Number($stateParams.id);
        vm.info = {
            player: sharedPropertiesService.getPlayerById(playerId).name,
            ranking: sharedPropertiesService.getPlayerById(playerId).totalPoints

        };

        vm.player = _.find(sharedPropertiesService.getGame().players, function (chr) {

            return chr.id === playerId;
        });

    }

}());
