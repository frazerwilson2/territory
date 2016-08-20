app.controller('indexCtrl', function($scope, $rootScope, $http, mainService, $state) {

// getGames
getGames();
function getGames() {
getgame = mainService.getGames();
getgame.then(function successCallback(response) {
  console.log(response.data);
  $scope.games = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
}

$scope.showGamesForm = false;

$scope.newGameToggle = function(){
  $scope.showGamesForm = !$scope.showGamesForm;  
}

$scope.gameForm = {
  'month': new Date(1975, 01, 01, 00, 00, 00, 0),
  'players': {
    'one': {
      'active': true,
      'name': '',
      'logo': 0,
      'color': 'red',
      'beltname': '',
      'cash': 2000
    },
    'two': {
      'active': true,
      'name': '',
      'logo': 0,
      'color': 'blue',
      'beltname': '',
      'cash': 2000
    },
    'three': {
      'active': false,
      'name': '',
      'logo': 0,
      'color': 'green',
      'beltname': '',
      'cash': 2000
    },
    'four': {
      'active': false,
      'name': '',
      'logo': 0,
      'color': 'orange',
      'beltname': '',
      'cash': 2000
    }
  }
};

$scope.setCash = 2000;
$scope.setCashTotal = function(x){
angular.forEach($scope.gameForm.players, function(val, key){
  val.cash = x;
});
}

$scope.addPlayer = function(player){
player.active = true;
}

$scope.newGame = function() {
//  console.log($scope.gameForm);
newgame = mainService.newGame($scope.gameForm);
newgame.then(function successCallback(response) {
  console.log(response.data);
  $state.go('game', { 'gameid':response.data._id });
  }, function errorCallback(response) {
    console.log(response);
  });
}

});

app.controller('gameCtrl', function($scope, $rootScope, $stateParams, $http, mainService, $state) {

// getGame
getGame();
function getGame(){
  loadgame = mainService.getGame($stateParams.gameid);
  loadgame.then(function successCallback(response) {
  //  console.log(response.data);
  $scope.gameData = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

 var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
 shuffle(a);
 var numplayers = 4;
var chunks = [];
for (var i = 0; i < numplayers; ++i) {
    chunks[i] = a.splice(0,3);
}
console.log(chunks);
console.log(a);

});

app.controller('dndCtrl', function($scope, $rootScope, $http, mainService, $state) {

$scope.emptybox = [];

    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});