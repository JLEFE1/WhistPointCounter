// Ionic Starter App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('pointCalculator', [
  'ionic',
  'pointCalculator.controllers',
  'pascalprecht.translate',
  'checklist-model',
  'settings',
  'players',
  'whist'
  ])

  .run(function($ionicPlatform, sharedPropertiesService) {

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      if (typeof navigator.globalization !== 'undefined') {
        navigator.globalization.getPreferredLanguage(function (language) {
          $translate.use((language.value).split('-')[0]).then(function (data) {
            console.log('SUCCESS -> ' + data);
          }, function (error) {
            console.log('ERROR -> ' + error);
          });
        }, null);
      }

      sharedPropertiesService.startNewGame();

    });
  })

  .config(function($stateProvider, $urlRouterProvider, $translateProvider) {


    var lang;
    for (lang in translations) {
      $translateProvider.translations(lang, translations[lang]);
    }

    $translateProvider.preferredLanguage('be');

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      })


      .state('app.whiststanding', {
        url: '/whist/whiststanding',
        views: {
          'menuContent': {
            templateUrl: 'templates/whist/whiststanding.html',
            controller: 'WhistStandingController as vm'
          }
        }
      })
      .state('app.whistcalculatepoints', {
        url: '/whist/whistcalculatepoints',
        views: {
          'menuContent': {
            templateUrl: 'templates/whist/whistcalculatepoints.html',
            controller: 'WhistCalculatePointController as vm'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/I18n/settings.html',
            controller: 'SettingsController as vm'
          }
        }
      })
      .state('app.players', {
        url: "/players/players",
        views: {
          'menuContent': {
            templateUrl: "templates/players/players.html",
            controller: 'PlayersController as vm'
          }
        }
      })
      .state('app.player', {
        url: "/players/player/:id",
        views: {
          'menuContent': {
            templateUrl: "templates/players/player.html",
            controller: 'PlayerController as vm'
          }
        }
      })
      .state('app.changePoints', {
        url: "/whist/changePoints",
        views: {
          'menuContent': {
            templateUrl: "templates/whist/changePoints.html",
            controller: 'ChangePointsController as vm'
          }
        }
      })


    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/whist/whiststanding');
  });
