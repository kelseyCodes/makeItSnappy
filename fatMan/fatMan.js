app.config(function ($stateProvider) {
    $stateProvider.state('fatMan', {
        url: '/fatMan',
        templateUrl: 'fatMan/fatMan.html',
        controller: 'mainCtrl'
    });
});