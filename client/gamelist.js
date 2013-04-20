Template.gamelist.Games = function(){
	return Games.find();
}

Template.gamelist.events( {
    'click input.join-game' : function(evt, template) {
    	console.log("joining game");
    }
});