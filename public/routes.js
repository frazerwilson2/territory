app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('index', {
        url: "/",
        templateUrl: "views/home.html",
        controller: 'indexCtrl'
    })
    .state('game', {
        url: "/game/:gameid",
        templateUrl: "views/game.html",
        controller: 'gameCtrl'
    })
    .state('dnd', {
        url: "/dnd",
        templateUrl: "views/dnd.html",
        controller: 'dndCtrl'
    })
});
