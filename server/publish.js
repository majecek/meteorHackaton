Meteor.publish("allGames", function() {
	if (this.userId != null) {
		return Games.find();
	}
	return {};
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

        createGame: function () {
            Games.insert({
                name: "game3",
                status: "ACTIVE",
                size: { x: 5, y: 5 },
                players: [
                    {
                        name: "Dan",
                        symbol: "x"
                    },
                    {
                        name: "Emil",
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
            });
        },

        move: function (data) {

            var game = Games.findOne({_id: data.gameID});

            var maxMoveNumber = _.max(game.board, function (item) {
                return item.moveNumber;
            });

            var newMoveNumber = maxMoveNumber ? maxMoveNumber.moveNumber + 1 : 1;

            var move = {

                x: data.position.x,
                y: data.position.y,
                moveNumber: newMoveNumber,
                email: data.email
            };

//            game.board.push(move);

            Games.update(
                { _id: data.gameID},
                {
                    $push: {
                        board: move
                    }
                }
            );
        },

        cancelGame: function (gameId) {
            Games.remove({_id: gameId});
        }
    });

});
