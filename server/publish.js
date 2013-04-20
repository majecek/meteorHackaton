
Meteor.publish("allGames", function() {
	return Games.find({	status: "ACTIVE"});
});



Meteor.startup(function() {
	// code to run on server at startup
	Games.remove({});
	if (Games.find().count() === 0) {
		Games.insert({
			status: "ACTIVE",
			size : [ 5, 5 ],
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
		Games.insert({
			status: "INACTIVE",
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
	}
});