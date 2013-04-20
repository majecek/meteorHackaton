Template.availableGames.games = function () {
    return Games.find({});
};


Template.availableGames.events({
	'click input.join-game' : function() {

        Session.set('game', this);

		Games.update({
			_id : this['_id']
		}, {
			$set : {
				status : "III"
			}
		});
	},
	'click input.create-game' : function() {

        var game = {
            status: "WAITING",
            size: {
                x: 5,
                y: 5
            },
            players: [
                {
                    name: "Adam",
                    symbol: "x"
                },
                {
                    name: "Bohumil",
                    symbol: "o"
                }
            ],
            board: [
                {
                    x: 1,
                    y: 1,
                    moveNumber: 1,
                    name: "Adam"
                }
            ]
        };

		var id = Games.insert(game);
        game['_id'] = id;

        Session.set('game', game);
	}
});
