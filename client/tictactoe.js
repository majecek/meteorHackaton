Meteor.subscribe("allGames");

Meteor.startup(function () {

    Meteor.call ('findGameByName', "game1", function(error,result) {
        if(error){
            console.log('error:', error);
        }
        console.log(result);
    })

});

function getMoveOnPosition(game, x, y) {
    return _.find(game.board, function (move) {
        return move.x === x && move.y === y;
    });
};

function getPlayerByName(game, name) {
    return _.find(game.players, function (player) {
        return player.name === name;
    });
};

function Cell(game, position, move) {





    var cell = {

        position: position,
        move: move
    };

    if(move) {
        cell.player = getPlayerByName(game, move.name)
    }

    return cell;
}


Template.bootstrapCanvas.game = function () {

    var game = Session.get('game');

    console.log('board');

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

            console.log('found move:');
            console.log(move);

            var cell = new Cell(game, {x: row, y: column}, move);
            newRow.cells.push(cell);
        }

        rows.push(newRow);
    }

    return {game: game, board: rows};
};
