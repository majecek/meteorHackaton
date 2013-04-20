Template.availableGames.games = function() {
	return Games.find({});
};

Template.availableGames.emails = function() {
	var p1 = this.players[0];
	var p2 = this.players[1];
	if (p2 != null) {
		return "(" + p1.email + " / " + p2.email + ")";
	}
	return p1.email;
}

Template.availableGames.canJoin = function() {
	var p1 = this.players[0];
	var p2 = this.players[1];
	if (p2 != null) {
		return false;
	}
	var actualUser = Meteor.user().emails[0].address;
	if (actualUser === p1.email) {
		return false;
	}
	return true;
}

Template.availableGames.events({
	'click input.view-game' : function() {

		Session.set('game', this);

	},
	'click input.join-game' : function() {

		Session.set('game', this);

		var userEmail = Meteor.user().emails[0].address;

		var player = {
			email : userEmail,
			symbol : "o"
		};
		Games.update({
			_id : this['_id']
		}, {
			$set : {
				status : "ACTIVE"
			},
			$push : {
				players : player
			}
		});
	},
	'click input.create-game' : function() {
		var userEmail = Meteor.user().emails[0].address;
		var game = {
			status : "WAITING",
			size : {
				x : 10,
				y : 10
			},
			players : [ {
				email : userEmail,
				symbol : "x"
			} ],
			board : []
		};

		var id = Games.insert(game);
		game['_id'] = id;

		Session.set('game', game);
	}
});
