app.config(function ($stateProvider) {
    $stateProvider.state('bird', {
        url: '/',
        templateUrl: 'birds/bird.html',
        controller: 'mainCtrl'
    });
});