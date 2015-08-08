window.app = angular.module('makeItSnappy', ['ui.router']);

app.config(function($locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
});
