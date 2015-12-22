/*global angular*/
(function (){
    'use strict';

     angular.module('whist').factory('sharedPropertiesService', [sharedPropertiesService]);



    function sharedPropertiesService() {

        var game;

        function getGame(){
          return game;
        }

        function setGame(newGame){
          game = newGame;
        }

      function initBenchedPlayers(initGame){
        if(playersInGame === 5){
          initGame.benchedPlayers.push(1);
          initGame.players[0].dealer = true;
        } else if (playersInGame === 6){
          initGame.benchedPlayers.push(1);
          initGame.benchedPlayers.push(4);
          initGame.players[0].benched = true;
          initGame.players[3].benched = true;
        }
        return initGame;
      }

        var playersInGame;

      function startNewGameWithNames (players) {
        var startNewGame = {dealer: 1, players: [], benchedPlayers: [], points: []};
        for (var i =0; i < players.length; i += 1){
          var player = {id: i + 1, pointsEvolution: [], name: players[i], totalPoints:0, pointsOverview:[], dealer:false, benched:false};
          startNewGame.players.push(player);
        }

        playersInGame = startNewGame.players.length;
        startNewGame.players[0].dealer = true;

        startNewGame = initBenchedPlayers(startNewGame);
        setGame(startNewGame);
      }



         function getPlayersInGame(){
             return playersInGame;
         }

         function setPlayersInGame(number){
             playersInGame = number;
         }

         function getIdByName(name){
            return _.find(game.players, function(chr) {
                return chr.name === name;
            }).id;
         }

         function getNameById(id){
             return _.find(game.players, function(chr) {
                return chr.id === id;
            }).name;
          }

         function getPlayerById(playerIdToFind){
            return  _.findWhere(game.players,{id:Number(playerIdToFind)});
         }

         function getPlayerIds(){
            return _.pluck(game.players,'id');
         }

         function removePlayers(players){
           var withoutActivePlayers = _.difference(getPlayerIds(), players);
           var withoutBenchedPlayers =_.difference(withoutActivePlayers, game.benchedPlayers);
           return withoutBenchedPlayers;
         }

         //TODO Has to be based on payer id and not index
         function alterPoints(points){
            for (var i =0; i < game.players.length;i++){
                game.players[i].totalPoints = points[i].totalPoints;
            }
         }

      function updateDealer(){
        var currentDealerId = game.dealer;
        var currentDealer = getPlayerById(currentDealerId);
        var nextDealer;
        if (currentDealerId < game.players.length) {
          game.dealer = currentDealerId + 1;
          nextDealer = getPlayerById(currentDealerId + 1);
        } else {
          game.dealer = 1;
          nextDealer = getPlayerById(1);
        }
        currentDealer.dealer = false;
        nextDealer.dealer = true;

      }

      function updateBenchedPlayers(){
        var currentBenchedPlayers = game.benchedPlayers;
        //TODO shoulde be  game.benchedPlayers.length = 0; => but
        // clears also all references
        // need a copy
        game.benchedPlayers = [];

        for (var i = 0; i < currentBenchedPlayers.length;i++) {

          var benchedPlayerId = currentBenchedPlayers[i];
          var benchedPlayer = getPlayerById(benchedPlayerId);
          var nextBenchedPlayer;
          if (benchedPlayerId < game.players.length) {
            game.benchedPlayers.push(benchedPlayerId + 1);
            nextBenchedPlayer = getPlayerById(benchedPlayerId + 1);
          } else {
            game.benchedPlayers.push(1);
            nextBenchedPlayer = getPlayerById(1);
          }
          benchedPlayer.benched = false;
          nextBenchedPlayer.benched = true;

        }


      }
        function updateDealerAndBenchedPlayers(){
          updateDealer();
          updateBenchedPlayers();
        }


         return {
             getGame: getGame,
             setGame: setGame,
             getPlayersInGame: getPlayersInGame,
             setPlayersInGame: setPlayersInGame,
             getIdByName: getIdByName,
             getNameById: getNameById,
             getPlayerById: getPlayerById,
             getPlayerIds: getPlayerIds,
             removePlayers: removePlayers,
             alterPoints: alterPoints,
             startNewGameWithNames: startNewGameWithNames,
           updateDealerAndBenchedPlayers: updateDealerAndBenchedPlayers
         };

    }


}());
