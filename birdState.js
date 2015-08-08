app.config(function ($stateProvider) {
    $stateProvider.state('bird', {
        url: '/',
        templateUrl: 'bird.html',
        controller: 'mainCtrl'
    });
});