
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/'); // connect to our database
//mongoose.connect('mongodb://frazer:frazer@ds013569.mlab.com:13569/heroku_c741jbjg');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Models
var Game = require('./app/models/game');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.use(express.static('public'));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/games')

    // create a player (accessed at POST http://localhost:8080/api/players)
    .post(function(req, res) {
   console.log(req.body);  
        var game = new Game();
        game.month = req.body.month;
        game.players = req.body.players;

        // save the player and check for errors
        game.save(function(err, newGame) {
            if (err)
                res.send(err);

            res.json(newGame);
        });
        
    })
    // get all the players (accessed at GET http://localhost:8080/api/players)
    .get(function(req, res) {
        Game.find({},{ month: 1 }, function(err, games) {
            if (err)
                res.send(err);

            res.json(games);
        });
    });

 router.route('/game/:gameid')
 
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log(req.params);
        Game.findOne({_id: req.params.gameid}, {}, function(err, data) {           
            if (err) return console.error(err);
            // console.log(data);
            if(data){
                res.json(data);
            }
        });
    })

    // .post(function(req, res) {        
    //     var player = new Player();
    //     player.name = req.params.player_name;
    //     player.hasBall = false;

    //     // save the player and check for errors
    //     player.save(function(err, data) {
    //         if (err)
    //             res.send(err);
    //         res.json(data);
    //     });       
    // });

    router.route('/putPass/:player_id/:player_pass')
    .post(function(req, res) {
        // update ball pos
        id = req.params.player_id;
        pass = req.params.player_pass;
        Player.update({ _id: id }, { pass: pass }, { multi: false }, function (err, raw) {
          if (err) return handleError(err);
          res.json(raw);
        });
     })

    .get(function(req, res) {
        // update ball pos
        id = req.params.player_id;
        pass = req.params.player_pass;
        Player.findOne({ _id: id }, { pass: pass }, { multi: false }, function (err, raw) {
          if (err) return handleError(err);
          console.log(raw);
          thePass = raw.pass;
          if(pass == thePass) {
            res.json(true);
          }
          else {
            res.json(false);
          }
        });
     });

    // BALL methods
    router.route('/getball')
    .get(function(req, res) {
        Ball.findOne({}, {}, { sort: { 'taketime' : -1 } }, function(err, ball) {
            if (err)
                res.send(err);

            res.json(ball);
        });
    });

     router.route('/getball/:player_id/:player_name/:player_lat/:player_lon')

     .post(function(req, res) {
        // set hasball false
        Player.update({hasBall:true}, {hasBall: false}, {multi: true}, 
            function(err, num) {
            console.log("updated "+num);
            }
        );
        // set new hasball true
        var query = { _id: req.params.player_id };
        Player.findOneAndUpdate(query, { hasBall: true }, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });
        // update ball
        var ballRec = new Ball();
        ballRec.owner = req.params.player_name;
        ballRec.loc = {lat:req.params.player_lat, lon:req.params.player_lon};
        ballRec.taketime = new Date();
        ballRec.bouncetime = new Date();
        ballRec.save(function(err, data) {
            if (err)
                res.send(err);
            res.json(data);
        });
     });

router.route('/bounce/:ball_id/:player_lat/:player_lon')
.post(function(req, res) {
        // update ball pos
        id = req.params.ball_id;
        loc = {lat:req.params.player_lat, lon:req.params.player_lon};
        bouncetime = new Date();
        Ball.update({ _id: id }, { loc: loc, bouncetime: bouncetime }, { multi: false }, function (err, raw) {
          if (err) return handleError(err);
          console.log('The raw response from Mongo was ', raw);
        });
     });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);