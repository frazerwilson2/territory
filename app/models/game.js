
var mongoose  = require('mongoose');
var Schema  = mongoose.Schema;

var GameSchema = new Schema({
 	players: {
 		one: {
 			active: Boolean,
 			name: String,
 			logo: Number,
 			color: String,
 			beltname: String,
 			cash: Number,
 			stories: Array,
 			matchcards: Array,
 			bonus: Array
 		},
 		two: {
 			active: Boolean,
 			name: String,
 			logo: Number,
 			color: String,
 			beltname: String,
 			cash: Number,
 			stories: Array,
 			matchcards: Array,
 			bonus: Array
 		},
 		three: {
 			active: Boolean,
 			name: String,
 			logo: Number,
 			color: String,
 			beltname: String,
 			cash: Number,
 			stories: Array,
 			matchcards: Array,
 			bonus: Array
 		},
 		four: {
 			active: Boolean,
 			name: String,
 			logo: Number,
 			color: String,
 			beltname: String,
 			cash: Number,
 			stories: Array,
 			matchcards: Array,
 			bonus: Array
 		}
 	},
 	month: Date
});

module.exports = mongoose.model('Game', GameSchema);