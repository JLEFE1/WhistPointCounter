/*global angular*/
(function () {
    'use strict';

    angular.module('whist').controller('WhistCalculatePointController', ['sharedPropertiesService', 'whistService', '$state', WhistCalculatePointController]);



    function WhistCalculatePointController(sharedPropertiesService, whistService, $state) {

        var vm = this, game = sharedPropertiesService.getGame(), playTypeCheck = null;

        vm.abondancePoints = 5;

        vm.toBeHighlight = true;

        vm.selectedPlayers = [];

        vm.numberOfTricks = null;

        vm.miserieSelectionTrue = [];
        vm.miserieSelectionFalse = [];

      vm.trull = false;

        vm.playerButtons = (function createButtons() {

            var index, buttons = [], button;

            for (index = 0; index < game.players.length; index += 1) {
                button = {id: index + 1, playerId: game.players[index].id, name: game.players[index].name, selected: true};
                buttons.push(button);
            }

            return buttons;
        }());

        vm.setPlayTypeCheck = function setPlayTypeCheck(playType) {


            if (playTypeCheck !== playType) {
                playTypeCheck = playType;
            } else {
                playTypeCheck = null;
            }

            vm.selectedPlayers = [];

            return playTypeCheck;
        };

        vm.activePlayType = function activePlayType(type) {
            return playTypeCheck === type;
        };

        function reset() {
            vm.selectedPlayers = [];
            vm.numberOfTricks = null;
            playTypeCheck = null;
            vm.miserieSelectionTrue = [];
            vm.miserieSelectionFalse = [];
            sharedPropertiesService.updateDealerAndBenchedPlayers();
          console.log(sharedPropertiesService.getGame());
        }

        function goToWhistStanding(){
          if(game.players.length & 1){
            $state.go('app.whiststandingOdd');
          } else {
            $state.go('app.whiststandingEven');
          }
        }

        vm.normalBidding = function normalBidding() {
            whistService.normalBidding(vm.selectedPlayers, vm.numberOfTricks, vm.trull);

            reset();

            goToWhistStanding();
        };

        vm.abondance = function abondance(success) {
            whistService.abondance(vm.selectedPlayers, success, vm.abondancePoints, vm.trull);
            reset();
            goToWhistStanding();
        };


        vm.soloSlim = function soloSlim(success) {
            whistService.soloSlim(vm.selectedPlayers, success, vm.trull);
            reset();
            goToWhistStanding();
        };

        vm.miserie = function miserie() {
            whistService.miserie(vm.miserieSelectionTrue, vm.miserieSelectionFalse, vm.trull);
            reset();
            goToWhistStanding();


        };

        vm.rafachol = function rafachol() {
          whistService.normalBidding(vm.selectedPlayers, 4, vm.trull);
          reset();
          goToWhistStanding();


        };

        function calcTricks() {

            var baseTricks = null;

            switch (vm.selectedPlayers.length) {
            case 1:
                baseTricks = 5;
                break;
            case 2:
                baseTricks = 8;
                break;
            default:
                baseTricks = 0;
            }

            return baseTricks;
        }

        vm.selectPlayer = function selectPlayer(id, max) {
            if (_.contains(vm.selectedPlayers, id)) {
                vm.selectedPlayers = _.reject(vm.selectedPlayers, function (el) { return el === id; });
            } else {
                if (vm.selectedPlayers.length < max) {
                    vm.selectedPlayers.push(id);
                }

            }

            vm.numberOfTricks = calcTricks();

        };

        vm.containsId = function containsId(id) {
            return _.contains(vm.selectedPlayers, id);
        };

    }

}());
