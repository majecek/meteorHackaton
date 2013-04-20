var width = 600;
var height = 600;
var cellSize = 30;
var halfCellSize = (cellSize / 2);

var meshColor = '#000';


function drawLine(startX, startY, endX, endY, context, color) {

    context.strokeStyle = color;
    context.lineWidth = 1;

    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
}

function drawBoard(game) {

    if (game === undefined) {
        return;
    }

    var size = game.size;

    console.log('SIZE');
    console.log(size);

//    canvas.width = canvas.width;

    console.log('AAAAAA');
    console.log(backgroundContext);

    backgroundContext.beginPath();

    drawLine(0, 0, 0, height, backgroundContext, meshColor);
    drawLine(0, 0, width, 0, backgroundContext, meshColor);
    drawLine(width, 0, width, height, backgroundContext, meshColor);
    drawLine(0, height, width, height, backgroundContext, meshColor);

    var x = 0;

    for (var i = 0; i < size.x; i++) {

        drawLine(x, 0, x, height, backgroundContext, meshColor);

        x += cellSize;
    }

    var y = 0;

    for (var j = 0; j < size.y; j++) {

        drawLine(0, y, width, y, backgroundContext, meshColor);

        y += cellSize;
    }

    backgroundContext.stroke();
};

function drawMoves(game) {

    if (game === undefined) {
        return;
    }

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

    return {x: Math.floor(x / cellSize), y: Math.floor(y / cellSize)};
}


function clickOnBoard(e) {
    console.log('cursor position:');
    console.log(getCursorPosition(e));

    var cursorPosition = getCursorPosition(e);

    drawMove({x: cursorPosition.x, y: cursorPosition.y, playerId: 1, moveNumber: 3});
}
