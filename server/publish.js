Meteor.publish("allGames", function() {
	return Games.find();
	// return Games.find({ status: "ACTIVE"});
});

Meteor.startup(function() {
	// code to run on server at startup
	Games.remove({});
	if (Games.find().count() === 0) {
		Games.insert({
			name : "game1",
			status : "WAITING",
			size : {
				x : 5,
				y : 5
			},
			players : [ {
				email : "Adam@example.com",
				symbol : "x"
			} ],
			board : [ {
				x : 1,
				y : 1,
				moveNumber : 1,
				email : "Adam@example.com"
			} ]
		});
		Games.insert({
			name : "game2",
			status : "ACTIVE",
			size : {
				x : 5,
				y : 5
			},
			players : [ {
				email : "Dan@example.com",
				symbol : "x"
			}, {
				email : "Emil@example.com",
				symbol : "o"
			} ],
			board : [ {
				x : 1,
				y : 1,
				moveNumber : 1,
				email : "Emil@example.com"
			} ]
		});
	}

	Meteor.methods({

		findGameByID : function(gameID) {
			var game = Games.find({
				_id : gameID
			}).fetch();
			return game;
		},

		findGameByName : function(gameName) {
			var game = Games.findOne({
				name : gameName
			});
			return game;
		},

		createGame : function() {
			Games.insert({
				name : "game3",
				status : "ACTIVE",
				size : [ 5, 5 ],
				players : [ {
					name : "Dan",
					symbol : "x"
				}, {
					name : "Emil",
					symbol : "o"
				} ],
				board : [ {
					x : 1,
					y : 1,
					moveNumber : 1,
					name : "Adam"
				} ]
			});
		},

		cancelGame : function(gameId) {
			Games.remove({
				_id : gameId
			});
		}
	});

});
