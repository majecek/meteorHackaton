Meteor.publish("allGames", function() {
	if (this.userId != null) {
		return Games.find();
	}
	return {};
	// return Games.find({ status: "ACTIVE"});
});

Meteor
		.startup(function() {
			// code to run on server at startup
			Games.remove({});
			// if (Games.find().count() === 0) {
			// Games.insert({
			// name : "game1",
			// status : "WAITING",
			// size : {
			// x : 5,
			// y : 5
			// },
			// players : [ {
			// email : "Adam@example.com",
			// symbol : "x"
			// } ],
			// board : [ {
			// x : 1,
			// y : 1,
			// moveNumber : 1,
			// email : "Adam@example.com"
			// } ],
			// nextPlayer: ""
			// });
			// Games.insert({
			// name : "game2",
			// status : "ACTIVE",
			// size : {
			// x : 5,
			// y : 5
			// },
			// players : [ {
			// email : "Dan@example.com",
			// symbol : "x"
			// }, {
			// email : "Emil@example.com",
			// symbol : "o"
			// } ],
			// board : [ {
			// x : 1,
			// y : 1,
			// moveNumber : 1,
			// email : "Emil@example.com"
			// } ],
			// nextPlayer: ""
			// });
			// }

			Meteor
					.methods({

						move : function(data) {

							var game = Games.findOne({
								_id : data.gameID
							});
							var maxMoveNumber = _.max(game.board,
									function(item) {
										return item.moveNumber;
									});

							var newMoveNumber = maxMoveNumber ? maxMoveNumber.moveNumber + 1
									: 1;

							var nextPlayer = "";

							if (newMoveNumber > 1) {
								nextPlayer = game.players[0].email == data.email ? (game.players.length > 1 ? game.players[1].email
										: "")
										: game.players[0].email;
								var latestUser = _.last(game.board).email;
								if (latestUser == data.email) {
									Games.update({
										_id : data.gameID
									}, {
										$set : {
											nextPlayer : nextPlayer
										}
									});
									return;
								}
							}

							var move = {
								x : data.position.x,
								y : data.position.y,
								moveNumber : newMoveNumber,
								email : data.email
							};

							Games.update({
								_id : data.gameID
							}, {
								$push : {
									board : move
								},
								$set : {
									nextPlayer : nextPlayer
								}
							});

							var boardState = new Array(game.size.x);
							for ( var i = 0; i < game.size.x; i++) {
								boardState[i] = new Array(game.size.y);
							}
							// Put the new move separately, it is not yet in the
							// collection
							boardState[move.y][move.x] = move.email;
							for ( var mv = 0; mv < game.board.length; mv++) {
								var mov = game.board[mv];
								boardState[mov.y][mov.x] = mov.email;
								console.log(mov.x + ", " + mov.y + " = "
										+ mov.email);
							}

							var stack = new Array();
							stack.push({
								x : move.x,
								y : move.y
							});
							var limit = 5;
							// Vertical
							var onY = move.y;
							for ( var xp = move.x + 1; xp < game.size.x
									&& xp < move.x + limit; xp++) {
								if (boardState[onY][xp] != null
										&& boardState[onY][xp] === move.email) {
									stack.push({
										x : xp,
										y : onY
									});
								}
							}
							for ( var xp = move.x - 1; xp >= 0
									&& xp > move.x - limit; xp--) {
								if (boardState[onY][xp] != null
										&& boardState[onY][xp] === move.email) {
									stack.push({
										x : xp,
										y : onY
									});
								}
							}
							if (stack.length == limit) {
								Games.update({
									_id : data.gameID
								}, {
									$set : {
										winner : {
											email : move.email,
											line : stack
										}
									}
								});
							}

							// Horizontal
							var stack = new Array();
							stack.push({
								x : move.x,
								y : move.y
							});
							var onY = move.x;
							for ( var xp = move.y + 1; xp < game.size.y
									&& xp < move.y + limit; xp++) {
								if (boardState[xp][onY] != null
										&& boardState[xp][onY] === move.email) {
									stack.push({
										x : xp,
										y : onY
									});
								}
							}
							for ( var xp = move.y - 1; xp >= 0
									&& xp > move.y - limit; xp--) {
								if (boardState[xp][onY] != null
										&& boardState[xp][onY] === move.email) {
									stack.push({
										x : xp,
										y : onY
									});
								}
							}
							if (stack.length == limit) {
								Games.update({
									_id : data.gameID
								}, {
									$set : {
										winner : {
											email : move.email,
											line : stack
										}
									}
								});
							}

							// Diagonal Left
							var stack = new Array();
							stack.push({
								x : move.x,
								y : move.y
							});
							for ( var xp = move.x + 1, yp = move.y + 1; (xp < game.size.x && xp < move.x
									+ limit)
									&& (yp < game.size.y && yp < move.y + limit); xp++, yp++) {
								if (boardState[yp][xp] != null
										&& boardState[yp][xp] === move.email) {
									stack.push({
										x : xp,
										y : yp
									});
								}
							}
							for ( var xp = move.x - 1, yp = move.y - 1; (xp >= 0 && xp > move.x
									- limit)
									&& (yp >= 0 && yp > move.y - limit); xp--, yp--) {
								if (boardState[yp][xp] != null
										&& boardState[yp][xp] === move.email) {
									stack.push({
										x : xp,
										y : yp
									});
								}
							}
							if (stack.length == limit) {
								Games.update({
									_id : data.gameID
								}, {
									$set : {
										winner : {
											email : move.email,
											line : stack
										}
									}
								});
							}
							// Diagonal Right
							var stack = new Array();
							stack.push({
								x : move.x,
								y : move.y
							});
							for ( var xp = move.x + 1, yp = move.y - 1; (xp < game.size.x && xp < move.x
									+ limit)
									&& (yp >= 0 && yp > move.y - limit); xp++, yp--) {
								if (boardState[yp][xp] != null
										&& boardState[yp][xp] === move.email) {
									stack.push({
										x : xp,
										y : yp
									});
								}
							}
							for ( var xp = move.x - 1, yp = move.y + 1; (xp >= 0 && xp > move.x
									- limit)
									&& (yp < game.size.y && yp < move.y + limit); xp--, yp++) {
								if (boardState[yp][xp] != null
										&& boardState[yp][xp] === move.email) {
									stack.push({
										x : xp,
										y : yp
									});
								}
							}
							if (stack.length == limit) {
								Games.update({
									_id : data.gameID
								}, {
									$set : {
										winner : {
											email : move.email,
											line : stack
										}
									}
								});
							}
							// console.log(game.board.length);

						},

						cancelGame : function(gameId) {
							Games.remove({
								_id : gameId
							});
						}
					});

		});
