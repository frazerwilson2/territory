app.service("mainService", function ($http) {

   // /players/:player_name
   this.getGames = function(name) {
     return $http.get('/api/games/');
   }

   // /putPass/:player_id/:player_pass
   this.newGame = function(game) {
    return $http.post('/api/games/', game);
   }

   ///game/:id
	this.getGame = function(id) {
     return $http.get('/api/game/' + id);
   }

});