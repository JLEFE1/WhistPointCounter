/*global angular*/
(function () {
    'use strict';

    angular.module('whist').factory('whistService', ['sharedPropertiesService', whistService]);

    function whistService(sharedPropertiesService) {

        function startNewGame() {
            return sharedPropertiesService.startNewGame();
        }

        function addPoints(playerId, points) {
            var game = sharedPropertiesService.getGame();

            //TODO Has do be done by player id
            game.players[playerId - 1].totalPoints = game.players[playerId - 1].totalPoints + points;
            game.players[playerId - 1].pointsOverview.push(points);

            sharedPropertiesService.setGame(game);
        }

        function findTricksNeeded(players) {
            var neededTricks = 5;

            if (players.length === 2) {
                neededTricks = 8;
            }

            return neededTricks;
        }

        function calculatePoints(tricks, neededTricks) {
            var points = 2, calculatedTricks = tricks - neededTricks;
            if (calculatedTricks >= 0) {
                points = points + calculatedTricks;
            } else {
                points = -1 * (points + (-1 * calculatedTricks));
            }

            return points;
        }
        function normalBidding(players, tricks) {
            var numberOfPLayers = players.length, rest = sharedPropertiesService.removePlayers(players),
                neededTricks = findTricksNeeded(players), points = calculatePoints(tricks, neededTricks), i;

            if (numberOfPLayers === 1) {
                addPoints(players, 3 * points);
            } else {
                for (i = 0; i < players.length; i += 1) {
                    addPoints(players[i], points);
                }
            }

            for (i = 0; i < rest.length; i += 1) {
                addPoints(rest[i], -1 * points);
            }

        }

        function abondance(player, success, typeOfAbondance) {
            var multiplier = 1, rest = sharedPropertiesService.removePlayers(player), i;

            if (!success) {
                multiplier = -1;
            }

            addPoints(player, multiplier * 3 * typeOfAbondance);

            for (i = 0; i < rest.length; i += 1) {
                addPoints(rest[i], -1 * multiplier * typeOfAbondance);
            }

        }

        function soloSlim(player, success) {
            var multiplier = 1, rest = sharedPropertiesService.removePlayers(player), i;

            if (!success) {
                multiplier = -1;
            }

            addPoints(player, multiplier * 150);

            for (i = 0; i < rest.length; i += 1) {
                addPoints(rest[i], -1 * multiplier * 50);
            }

        }

        function miserie(winners, losers) {
            var rest = sharedPropertiesService.removePlayers(winners.concat(losers)), i;

            if (winners.length === 1 && losers.length === 0) {
                addPoints(winners[0], 3 * 5);

                for (i = 0; i < rest.length; i += 1) {
                    addPoints(rest[i], -1 * 5);
                }
            } else if (winners.length === 0 && losers.length === 1) {
                addPoints(losers[0], -1 * 3 * 5);

                for (i = 0; i < rest.length; i += 1) {
                    addPoints(rest[i], 5);
                }
            } else if (winners.length === 2 && losers.length === 0) {
                for (i = 0; i < winners.length; i += 1) {
                    addPoints(winners[i], 5);
                }
                for (i = 0; i < rest.length; i += 1) {
                    addPoints(rest[i], -1 * 5);
                }
            } else if (winners.length === 1 && losers.length === 1) {
                addPoints(winners[0], 5);
                addPoints(losers[0], -1 * 5);

                for (i = 0; i < rest.length; i += 1) {
                    addPoints(rest[i], 0);
                }
            } else if (winners.length === 0 && losers.length === 2) {
                for (i = 0; i < losers.length; i += 1) {
                    addPoints(losers[i], -1 * 5);
                }
                for (i = 0; i < rest.length; i += 1) {
                    addPoints(rest[i], 5);
                }
            } else if (winners.length === 3 && losers.length === 1) {
                for (i = 0; i < winners.length; i += 1) {
                    addPoints(winners[i], 5);
                }
                addPoints(losers[0], -1 * 3 * 5);
            } else if (winners.length === 2 && losers.length === 2) {
                for (i = 0; i < winners.length; i += 1) {
                    addPoints(winners[i], 5);
                }
                for (i = 0; i < losers.length; i += 1) {
                    addPoints(losers[i], -1 * 5);
                }
            } else if (winners.length === 1 && losers.length === 3) {
                addPoints(winners[0], 3 * 5);
                for (i = 0; i < losers.length; i += 1) {
                    addPoints(losers[i], -1 * 5);
                }
            } else if (winners.length === 0 && losers.length === 4) {
                for (i = 0; i < winners.length; i += 1) {
                    addPoints(winners[i], 0);
                }
                for (i = 0; i < losers.length; i += 1) {
                    addPoints(losers[i], 0);
                }
            }
        }

        return {
            startNewGame: startNewGame,
            normalBidding: normalBidding,
            abondance: abondance,
            soloSlim: soloSlim,
            miserie: miserie
        };

    }


}());
