Games = new Meteor.Collection("games");

Games.allow({
	insert : function(userId, doc) {
		return (userId != null);
	},
	update : function(userId, doc, fields, modifier) {
		// the user must be logged in
		return (userId != null);
	},
	remove : function(userId, doc) {
		// the user must be logged in
		return (userId != null);
	},
	fetch : []
});
