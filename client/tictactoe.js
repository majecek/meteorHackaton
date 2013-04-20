var width = 600;
var height = 600;
var cellSize = 30;
var halfCellSize = (cellSize / 2);

var meshColor = '#000';
var gameCanvas, gameContext;

Meteor.subscribe("allGames");

function drawLine(startX, startY, endX, endY, context, color) {

    context.strokeStyle = color;
    context.lineWidth = 1;

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
}

function drawBoard(game) {

    var size = game.size;

    var canvas = $('#canvas')[0];
    var context = canvas.getContext("2d");

    context.beginPath();

    drawLine(0, 0, 0, height, context, meshColor);
    drawLine(0, 0, width, 0, context, meshColor);
    drawLine(width, 0, width, height, context, meshColor);
    drawLine(0, height, width, height, context, meshColor);

    var x = 0;

    for (var i = 0; i < size.x; i++) {

        drawLine(x, 0, x, height, context, meshColor);

        x += cellSize;
    }

    var y = 0;

    for (var j = 0; j < size.y; j++) {

        drawLine(0, y, width, y, context, meshColor);

        y += cellSize;
    }

    context.stroke();
};

function drawMoves(game) {

    _.each(game.board, function (move) {
        console.log('drawing move: ');
        console.log(move);
        drawMove(move);
    });
}

function drawMove(move) {

    gameContext.beginPath();

    drawCircle(move);
//    drawCross(move);

    gameContext.stroke();
}

function drawCircle(move) {

    var center = findCenterOfCell(move.x, move.y);

    gameContext.arc(center.x, center.y, 10, 0, Math.PI * 2, false);
    gameContext.closePath();
    gameContext.strokeStyle = "red";
}

function drawCross(move) {

    var center = findCenterOfCell(move.x, move.y);

    var topLeft = {
        x: center.x - halfCellSize,
        y: center.y - halfCellSize
    };

    var bottomRight = {
        x: center.x + halfCellSize,
        y: center.y + halfCellSize
    };

    var topRight = {
        x: center.x + halfCellSize,
        y: center.y - halfCellSize
    };

    var bottomLeft = {
        x: center.x - halfCellSize,
        y: center.y + halfCellSize
    };

    drawLine(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y, gameContext, 'red');
    drawLine(topRight.x, topRight.y, bottomLeft.x, bottomLeft.y, gameContext, 'red');
}

function findCenterOfCell(x, y) {

    var xCenter = ((x + 1) * cellSize) - halfCellSize;
    var yCenter = ((y + 1) * cellSize) - halfCellSize;

    return {x: xCenter, y: yCenter}
}


function getCursorPosition(e) {
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gameCanvas.offsetLeft;
    y -= gameCanvas.offsetTop;
    x = Math.min(x, 10 * cellSize);
    y = Math.min(y, 10 * cellSize);

    return {x: Math.floor(x/cellSize), y: Math.floor(y/cellSize)};
}


function clickOnBoard(e) {
    console.log('cursor position:');
    console.log(getCursorPosition(e));

    var cursorPosition = getCursorPosition(e);

    drawMove({x: cursorPosition.x, y: cursorPosition.y, playerId: 1, moveNumber: 3});
}

Meteor.startup(function () {

});


Template.canvas.rendered = function () {

    gameCanvas = $('#canvasActive')[0];
    gameCanvas.addEventListener('click', clickOnBoard, false);
    gameContext = gameCanvas.getContext("2d");

    var game = {

        size: {
            x: 10,
            y: 10
        },

        board: [
            {x: 0, y: 0, playerId: 1, moveNumber: 1},
            {x: 3, y: 0, playerId: 1, moveNumber: 2},
            {x: 2, y: 2, playerId: 1, moveNumber: 3}
        ]
    };


    drawBoard(game);

    drawMoves(game);
};
