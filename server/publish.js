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
			} ],
            nextPlayer: ""
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
			} ],
            nextPlayer: ""
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
                ],
                nextPlayer: ""
            });
        },

        move: function (data) {


            var game = Games.findOne({_id: data.gameID});
            var maxMoveNumber = _.max(game.board, function (item) {
                return item.moveNumber;
            });

            var newMoveNumber = maxMoveNumber ? maxMoveNumber.moveNumber + 1 : 1;

            var nextPlayer = "";

            if (newMoveNumber > 1) {
                nextPlayer = game.players[0].email == data.email ?  (game.players.count > 1 ? game.players[1].email : "" ): game.players[0].email;
                var latestUser = _.last(game.board).email;
                if (latestUser == data.email){
                    Games.update(
                        { _id: data.gameID},
                        {
                            $set: {
                                nextPlayer:  nextPlayer
                            }
                        }
                    );
                    return;
                }
            }

            var move = {
                x: data.position.x,
                y: data.position.y,
                moveNumber: newMoveNumber,
                email: data.email
            };

            Games.update(
                { _id: data.gameID},
                {
                    $push: {
                        board: move
                    } ,
                    $set: {
                        nextPlayer:  nextPlayer
                    }
                }
            );
        },

        cancelGame: function (gameId) {
            Games.remove({_id: gameId});
        }
    });

});
