//var backgroundCanvas, backgroundContext, gameCanvas, gameContext;
//
//Template.canvas.findCanvas = function () {
//
//    backgroundCanvas = $('#canvas')[0];
//
//    console.log('RENDERED');
//    console.log(backgroundCanvas);
//
//    backgroundContext = backgroundCanvas.getContext("2d");
//
//    gameCanvas = $('#canvasActive')[0];
//    gameCanvas.addEventListener('click', clickOnBoard, false);
//    gameContext = gameCanvas.getContext("2d");
//};
//
//Template.canvas = function () {
//
//    console.log('aaa');
//
//    var games = Games.find({}).fetch();
//    console.log('Games');
//    console.log(games);
//    console.log(games.length);
//
//    var game = undefined;
//
//    if (games.length > 0) {
//        game = games[0];
//    }
//
//    game = {
//
//        size: {
//            x: 10,
//            y: 10
//        },
//
//        board: [
//            {x: 0, y: 0, playerId: 1, moveNumber: 1},
//            {x: 3, y: 0, playerId: 1, moveNumber: 2},
//            {x: 2, y: 2, playerId: 1, moveNumber: 3}
//        ]
//    };
//
//
//    console.log('game');
//    console.log(game);
//
//    drawBoard(game);
//
//    drawMoves(game);
//
//};
