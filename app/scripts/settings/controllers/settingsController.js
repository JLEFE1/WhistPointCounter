/*global angular*/
(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name settingsModule.controllers:SettingsController
     * @description
     * # SettingsController
     * Controller of the settings Module
     */

    angular.module('settings').controller('SettingsController', ['$scope', '$translate', SettingsController]);

    function SettingsController($scope, $translate) {

        $scope.ChangeLanguage = function (lang) {
            $translate.use(lang);
        };

    }

}());
