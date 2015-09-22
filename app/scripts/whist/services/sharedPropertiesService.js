/*global angular*/
(function (){
    'use strict';

     angular.module('whist').factory('sharedPropertiesService',[sharedPropertiesService]);



    function sharedPropertiesService() {

        var game;

        function getGame(){
          return game;
        }

        function setGame(newGame){
          game = newGame;
        }

        var playersInGame = 4;

        var newGame = {
              players:
                   [{id: 1, pointsEvolution: [], name: null, totalPoints:0, pointsOverview:[]},
                       {id: 2, pointsEvolution: [], name: null, totalPoints:0, pointsOverview:[]},
                       {id: 3, pointsEvolution: [], name: null, totalPoints:0, pointsOverview:[]},
                       {id: 4, pointsEvolution: [], name: null, totalPoints:0, pointsOverview:[]}]

        };

        function startNewGame () {
            setGame(newGame);
            return newGame;
        }

      function startNewGameWithNames (players) {
        var startNewGame = {players: []};
        for (var i =0; i < players.length; i += 1){
          var player = {id: i + 1, pointsEvolution: [], name: players[i], totalPoints:0, pointsOverview:[]};
          startNewGame.players.push(player);
        }
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
            return [1, 2, 3, 4];
         }

         function removePlayers(players){
            return _.difference(getPlayerIds(), players);
         }

         //TODO Has to be based on payer id and not index
         function alterPoints(points){
            for (var i =0; i < game.players.length;i++){
                game.players[i].totalPoints = points[i].totalPoints;
            }
         }


         return {
             getGame: getGame,
             setGame: setGame,
             getPlayersInGame: getPlayersInGame,
             setPlayersInGame: setPlayersInGame,
             getIdByName: getIdByName,
             getNameById: getNameById,
             getPlayerById: getPlayerById,
             startNewGame: startNewGame,
             getPlayerIds: getPlayerIds,
             removePlayers: removePlayers,
             alterPoints: alterPoints,
             startNewGameWithNames: startNewGameWithNames
         };

    }


}());
