Meteor.subscribe("allGames");

Meteor.startup(function () {


});

function getMoveOnPosition(game, x, y) {
    return _.find(game.board, function (move) {
        return move.x === x && move.y === y;
    });
};

function getPlayerByName(game, email) {
    return _.find(game.players, function (player) {
        return player.email === email;
    });
};

function Cell(game, position, move) {





    var cell = {

        position: position,
        move: move
    };

    if(move) {
        cell.player = getPlayerByName(game, move.email)
    }

    return cell;
}


Template.bootstrapCanvas.events({
    'click .cell' : function() {

        console.log('MOVE');
        console.log(this);

        if(this.move) {
            return;
        }

        var game = Session.get('game');

        console.log(game);


        Meteor.call('move', {
            gameID: game['_id'],
            position: this.position,
            email: Meteor.user().emails[0].address

        }, function (error, data) {
            if (! error) {
                // success
            }
        });


    }
});


Template.bootstrapCanvas.game = function () {

    if(!Session.get('game')) {
        return;
    }

    var game = Games.findOne({'_id': Session.get('game')['_id']});

    if(game) {
    console.log(game.board);
    }

    if(game == undefined) {
        return;
    }



    var rows = [];

    for(var row = 0; row < game.size.x; row++) {

        var newRow = {
            cells: []
        }

        for(var column = 0; column < game.size.y; column++) {

            var move = getMoveOnPosition(game, row, column);

//            console.log('found move:');
//            console.log(move);

            var cell = new Cell(game, {x: row, y: column}, move);
            newRow.cells.push(cell);
        }

        rows.push(newRow);
    }

    return {game: game, board: rows};
};
