Template.availableGames.games = function () {
    return Games.find({});
};


Template.availableGames.events({
	'click input.join-game' : function(event, template) {
		var gameId = event.currentTarget.id;
		console.log("joining game: " + gameId);
		Games.update({
			_id : gameId
		}, {
			$set : {
				status : "III"
			}
		});
	},
	'click input.create-game' : function(event, template) {
		var gameId = event.currentTarget.id;
		Games.insert({
			status : "WAITING",
			size : {
				x : 5,
				y : 5
			},
			players : [ {
				name : "Adam",
				symbol : "x"
			}, {
				name : "Bohumil",
				symbol : "o"
			} ],
			board : [ {
				x : 1,
				y : 1,
				moveNumber : 1,
				name : "Adam"
			} ]
		});
	}
});
