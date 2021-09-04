$( document ).ready(function() { 

    var [
        eye, //which player are you playing (black/white)
        eyeView, //which perspective are you watching from (black/white)
        canvas, //the canvas
        alphabet,
        nbSqPSideX, 
        nbSqPSideY, 
        sqSize, 
        board, 
        hasMove, 
        peice, 
        kingPosition, 
        newPieceMoves, 
        isStale, 
        occupied, 
        mySquares, 
        hisSquares, 
        promoteConfig
        ] 
        = 
        [
        "white", 
        "white",
        document.getElementById("chesscreator"), 
        "abcdefghijklmnopqrstuvwxyz"
    ];

    var boardPixelsHorizontal = 9000; //warning: avoid going under canvas css width as canvas scaling pixelates images
    var boardPixelsVertical = 10000;

    $("#chesscreator").css({
        'width':'400px',
        'height': '450px'
    })

    // Create context from canvas
    var ctx = canvas.getContext("2d")

    function isStrInArray(array, value) { //returns true if e.g isStrInArray(["a1"], "a1")
        return array.indexOf(value) > -1;
    }

    function isArrayInArray(array, value){ //returns true if e.g isArrayInArray([[1,2]], [1,2])
        var i, j, current;
        for(i = 0; i < array.length; ++i){
            if(value.length === array[i].length){
                current = array[i];
                for(j = 0; j < value.length && value[j] === current[j]; ++j);
                if(j === value.length)
                    return true;
            }
        }
        return false;
    }

    function arraysEqual(a, b) { //checks if two arrays are equal 
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    function getPromotedStrs(str, num){ //returns squares where promoted configs need to be displayed
        var i;
        var squares = [];
        if(eye=="white"){ //decrement
            for(i=0;i<num;i++){
                squares.push(str[0]+(str.substring(1)-i));
            }
        }else{ //increment
            for(i=0; i<num;i++){
                squares.push(str[0]+(parseInt(str.substring(1))+i));
            }
        }
        return squares;
    }

    function strToDrawPos(str){ //returns coord position depending on perspective from string 
        var letter = str[0];
        var number = str.substring(1)-1;

        if(eyeView=="white"){
            letter = alphabet.indexOf(letter);
            number = -number + nbSqPSideY - 1;
        }
        else{
            letter = alphabet.indexOf(letter);
            letter = -letter + nbSqPSideX - 1;
        }
        return [letter, number];
    }

    function strToPos(str){ //returns coord position from string
        return [alphabet.indexOf(str[0]), str.substring(1)-1];
    }
    
    function drawPosToStr(pos) { //returns string depending on perspective from coord position
        if(eyeView == "white"){
                pos[1] = -pos[1]  + nbSqPSideY;
            }
            else{
                pos[0] = -pos[0]  + nbSqPSideX - 1
                pos[1] += 1;
            }
            return alphabet[pos[0]]+pos[1];
    }

    function posToStr(pos){ //return string from coord position
        return alphabet[pos[0]]+(pos[1]+1)
    }

    function deepCopyState(state){ //returns deep copy of board state
        var newState = {"gameMode":state.gameMode,"moveNb":state.moveNb,"check":state.check,"lastMove":state.lastMove, pieces:[]}
        for(var piece in state.pieces){
            newState.pieces.push(
                {
                "pid": state.pieces[piece].pid,
                "alive": state.pieces[piece].alive,
                "numberMoves": state.pieces[piece].numberMoves,
                "positionStr": state.pieces[piece].positionStr,
                "positionCoord": state.pieces[piece].positionCoord,
                "originalType": state.pieces[piece].originalType,
                "type": state.pieces[piece].type,
                "colour": state.pieces[piece].colour,
                "spriteCoord": state.pieces[piece].spriteCoord
            })  
        }
            return newState;
    }

    function isKingInCheck(board, state, colour){ //checks if king with in check, returns false or object {positionStr:value} if true, colour arg is the king's colour (w o)
        var occupancy;
        var isInCheck = false;
        var kingPos;
        var piece;
        var moves;
        var attackMove;

        for(var pieceIndex in state.pieces){ //get king position 
            piece = state.pieces[pieceIndex];
            if(piece.colour == colour && piece.alive && piece.type=="king"){
                kingPos = piece.positionStr;
                break;
            }
        }

        occupancy = board.getSquareOccupancy(state, returnOpponentEye(colour)); //get coords of all pieces on board

        for(var pieceIndex in state.pieces){ //if piece can attack the king then it is in check
            piece = state.pieces[pieceIndex];
            if(piece.colour==returnOpponentEye(colour) && piece.alive){ 
                moves = board.getPieceMoves(piece, occupancy[0], occupancy[1]); 
                for(var moveIndex in moves.canAttack){ 
                    attackMove = moves.canAttack[moveIndex];
                    if(attackMove == kingPos){
                        isInCheck=true;
                        break;
                    }
                }
            }
            if(isInCheck==true){
                break;
            }
        }

        if(isInCheck){
            return {
                positionStr: kingPos
            }
        }else{
            return false;
        }
    }

    function drawPiece(context, board, s, d, sqSize, cwidth=null, cheight=null, degree=null, alpha=null){ //draws all motifs that appear on the canvas board object
        if(degree!=null){
            context.save(); 
            context.translate(cwidth, cheight);
            context.rotate(degree*Math.PI/180);
            if(alpha!=null){
                context.globalAlpha = 0.8;
            }
            context.drawImage(
                board.images.pieces, //img
                s[0]*board.subSizeX, //sx 
                s[1]*board.subSizeY, //sy
                board.subSizeX,  //sWidth
                board.subSizeY,  //sHeight
                -d[0]*sqSize+(cwidth-50), //dx
                -d[1]*sqSize+(cheight-50), //dy
                sqSize, //dWidth
                sqSize); //dHeight
            if(alpha!=null){
                context.globalAlpha = 1.0;
            }
            context.restore();
        }else{
            if(alpha!=null){
                context.globalAlpha = 0.8;
            }
            context.drawImage(
                board.images.pieces, //img
                s[0]*board.subSizeX, //sx 
                s[1]*board.subSizeY, //sy
                board.subSizeX,  //sWidth
                board.subSizeY,  //sHeight
                d[0]*sqSize, //dx
                d[1]*sqSize, //dy
                sqSize, //dWidth
                sqSize); //dHeight
            if(alpha!=null){
                context.globalAlpha = 1.0;
            }
        }
    }

    function drawSquare(context, position, sqSize, alpha=null, fillStyle=null){ //draw square on canvas given certain arguments
        if(fillStyle!=null){
            context.fillStyle = fillStyle;
        }
        if(alpha!=null){
            context.globalAlpha = 0.8;
        }
        context.fillRect(position[0]*sqSize, position[1]*sqSize, sqSize, sqSize);
        if(alpha!=null){
            context.globalAlpha = 1.0;
        }
    }

    function drawSbPieceAndDecoration(spanElement, nbDeadPieces, owner, type, colour, getSpriteCoord){ //draws pieces on sideboard
        if(nbDeadPieces[owner][type]!=0){
            spanElement.parentNode.style.display = "block";
            spanElement.innerHTML = "&nbsp;"+nbDeadPieces[owner][type];
            ((eyeView==colour) ?
                ((eyeView=="white")? 
                    drawPiece(ctxCptTwo, board, board.coordinates[getSpriteCoord(type, colour)], strToPos(sbPlacement(type)), sqSize, 150, 150, 180, 0.2)
                    : 
                    drawPiece(ctxCptTwo, board, board.coordinates[getSpriteCoord(type, colour)], strToPos(sbPlacement(type)), sqSize, null, null, null, 0.2)
                )
                : 
                ((eyeView=="white")? 
                    drawPiece(ctxCptOne, board, board.coordinates[getSpriteCoord(type, colour)], strToPos(sbPlacement(type)), sqSize, 150, 150, 180, 0.2)
                    : 
                    drawPiece(ctxCptOne, board, board.coordinates[getSpriteCoord(type, colour)], strToPos(sbPlacement(type)), sqSize, null, null, null, 0.2)
                )
            )
        }else{
            spanElement.parentNode.style.display = "none";
        }
    }

    function draw(board, moveNb){ //draws board gamestate onto the canvas
        
        // Some necessary variables
        var validSquare; 
        var piece; 
        var boardPosition; 
        var srcImgPosition;
        var config;
        var configSquares;

        // Clearing and setting background
        ctx.clearRect(0, 0, boardPixelsHorizontal, boardPixelsVertical); //clear canvas
        ctx.drawImage(board.images.board, 0, 0, boardPixelsHorizontal, boardPixelsVertical); //background
        

        // Previous move
        if(board.eyeNb!=0 && board.gameStates[moveNb].lastMove.originStr != null && board.gameStates[moveNb].lastMove.destinationStr != null){ 
            drawSquare(ctx, strToDrawPos(board.gameStates[moveNb].lastMove.originStr), sqSize, alpha=0.5, fillStyle="#00ccff")
            drawSquare(ctx, strToDrawPos(board.gameStates[moveNb].lastMove.destinationStr), sqSize, alpha=0.5, fillStyle="#00ccff")
        }

        // Legal moves
        if(board.focus.piece != null){ 
            if(board.focus.piece.positionStr != null){
                drawSquare(ctx, strToDrawPos(board.focus.piece.positionStr), sqSize, alpha=0.8, fillStyle="#8080ff") //piece selected square
            }

            for(var square in board.focus.validSquares.canMove){ //piece move squares
                drawSquare(ctx, strToDrawPos(board.focus.validSquares.canMove[square]), sqSize, alpha=0.8, fillStyle="#cc6600")
            }

            for(var square in board.focus.validSquares.canAttack){ //piece attack squares
                drawSquare(ctx, strToDrawPos(board.focus.validSquares.canAttack[square]), sqSize, alpha=0.8, fillStyle="#ff3300")
            }
        }

        // King in check 
        if(board.gameStates[moveNb].check!=false){
            drawSquare(ctx, strToDrawPos(board.gameStates[moveNb].check.positionStr), sqSize, alpha=0.8, fillStyle="#ff1a1a")
        }

        // Pieces
        for(var pIndex in board.gameStates[moveNb].pieces){
            piece = board.gameStates[moveNb].pieces[pIndex]
            if(piece.alive){ 
                drawPiece(ctx, board, board.coordinates[piece.spriteCoord], strToDrawPos(piece.positionStr), sqSize);
            }
        }

        // Promotion
        if(board.promoting){ 
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#4d0000"; 
            ctx.fillRect(0, 0, boardPixelsHorizontal, boardPixelsVertical); //hide background
            ctx.globalAlpha = 1.0;

            configSquares = getPromotedStrs(board.promotingSquare, board.promotionConfigs.length);

            for(var pConfig in board.promotionConfigs){
                drawPiece(ctx, board, board.coordinates[board.promotionConfigs[pConfig].spriteCoord], strToDrawPos(configSquares[pConfig]), sqSize);
            }
        }
    }

    class Board{ //superclass that holds board variables and validates board events
        constructor(){
            this.nbSqPSideX; //number of squares on the horizontal axes
            this.nbSqPSideY; //number of squares on the vertical axes
            this.images = { //file locations for board and piece images
                board: null,
                pieces: null
            };
            this.moveNb = 0; //current game move
            this.eyeNb = 0; //game move being drawn onto the canvas
            this.gameStates = []; //set of all moves and piece positions
            this.moves = {}; //set of valid squares which piece can move to (generated before canvas is drawn)
            this.focus = { //structure which holds data to show user which piece is selected and where it can be moved
                piece: null,
                validSquares: null
            };
            this.promotionConfigs = []; //set of promotion rules applied to each piece
            this.promotingChoice = []; //set of promotion choices if piece dropped in promotion zone
            this.promoting = false; //false if piece isn't being promoted, true otherwise
            this.promotingSquare; //keeps track of which square promoted piece must be dropped to
        }

        getSquareOccupancy(gamestate, pov){ //returns two arrays that hold information about which pieces are actively on the board
            var myOccupiedSquares = [];
            var opponentOccupiedSquares = [];
            var piece;
            for(var pIndex in gamestate.pieces){
                piece = gamestate.pieces[pIndex];
                if(piece.alive){
                    if(piece.colour == pov){
                        myOccupiedSquares.push(piece.positionCoord);
                    }
                    else{
                        opponentOccupiedSquares.push(piece.positionCoord);
                    }
                }
            }
            return [myOccupiedSquares, opponentOccupiedSquares]
        }


        generateValidMoves(){ //the master function which creates moves for each piece belonging to the player who's about to play
            var piece;
            var move;
            var newState;
            var occupancy = this.getSquareOccupancy(this.gameStates[this.moveNb], eye); //tracks down pieces on board with string position
            var myOccupiedSquares = occupancy[0];
            var opponentOccupiedSquares = occupancy[1];


            for(var pIndex in this.gameStates[this.moveNb].pieces){ //for each piece in current gamestate
                piece = this.gameStates[this.moveNb].pieces[pIndex];
                if(piece.colour == eye && piece.alive){ //if piece belongs to the user whos turn it is to play
                    this.moves[piece.pid] = this.getPieceMoves(piece, myOccupiedSquares, opponentOccupiedSquares); //generate positions
                }
            }

            var newMoves = {};
            var newMove;
            var isValid;

            for(var pIndex in this.moves){ //filter out moves which would result in the king being attacked next move
                newMove = {
                    canMove: [],
                    canAttack: []
                };

                for(var mIndex in this.moves[pIndex].canMove){ //for each no capture move
                    isValid = true;
                    move = this.moves[pIndex].canMove[mIndex];
                    newState = deepCopyState(this.gameStates[this.moveNb]); //create a copy gamestate
                    newState.pieces[pIndex].positionStr = move; //move piece in copy gamestate
                    newState.pieces[pIndex].positionCoord = strToPos(move);
                    newState.pieces[pIndex].alive = true;

                    if(isKingInCheck(this, newState, eye) == false){ //if, after moving the piece to the given square the king is not under attack by any opponent piece then it is valid
                        var wKingPos; 
                        var bKingPos; 
                        var occ = this.getSquareOccupancy(newState, eye);
                        var allBoardPiecesPos = occ[0].concat(occ[1]);
                        var isValid = false;

                        for(var pindex in newState.pieces){
                            if(newState.pieces[pindex].pid == 4){
                                wKingPos = newState.pieces[pindex].positionCoord;
                            }
                            if(newState.pieces[pindex].pid == 20){
                                bKingPos = newState.pieces[pindex].positionCoord;
                                break;
                            }
                        }
                        if(wKingPos[0]==bKingPos[0]){
                            for(var i=wKingPos[1]+1;i<bKingPos[1];i++){
                                if(isArrayInArray(allBoardPiecesPos, [wKingPos[0], i])){
                                    isValid = true;
                                    break;
                                }
                            }
                            if(isValid){
                                newMove.canMove.push(move);
                            }
                        }else{
                            newMove.canMove.push(move);
                        }
                    }
                }
                for(var mIndex in this.moves[pIndex].canAttack){ //for each capture move
                    isValid = true;
                    move = this.moves[pIndex].canAttack[mIndex];
                    newState = deepCopyState(this.gameStates[this.moveNb]); //create a copy gamestate

                    for(var pIndex2 in newState.pieces){ //if piece attacked change state to dead
                        if(newState.pieces[pIndex2].positionStr == move && newState.pieces[pIndex2].alive){ 
                            piece = newState.pieces[pIndex2];
                            piece.alive = false;
                            break;
                        }
                    }   

                    newState.pieces[pIndex].positionStr = move; //move piece in copy gamestate
                    newState.pieces[pIndex].positionCoord = strToPos(move);

                    if(isKingInCheck(this, newState, eye) == false){ //if, after moving the piece to the given square the king is not under attack by any opponent piece then it is valid
                        newMove.canAttack.push(move);
                    }
                }
                newMoves[pIndex] = newMove;
            }
            this.moves = newMoves;
        }

        isInsideField(pos, field){ //used to verify is a position is inside of the baord
            return ((pos[0]>field[0]&&pos[0]<field[1]&&pos[1]>field[2]&&pos[1]<field[3]) ? true : false);
        }

        generatePositions(pos, offsets, offsetType, myOccupiedSquares, opponentOccupiedSquares, playingField, attacksOnOffset=true, attackOver=false){ //helps generateValidMoves by creating all possible moves against other pieces but without insight into validity with things such as pinned pieces
            var moves = {
                canMove: [],
                canAttack: []
            };
            var newPosition;
            var attackOverVar;
            for(var offsetIndex in offsets){
                var offset = offsets[offsetIndex];
                newPosition = [pos[0],pos[1]];
                newPosition[0] += offset[0];
                newPosition[1] += offset[1];
                attackOverVar = 0;
                while(this.isInsideField(newPosition, playingField)){ //if position inside field
                    if(!isArrayInArray(myOccupiedSquares, newPosition)){ //if square not occupied by friendly piece
                        if(isArrayInArray(opponentOccupiedSquares, newPosition)){ //if square is occupied by enemy piece then
                            if(attackOver==false){
                                if(attacksOnOffset){
                                    moves.canAttack.push(posToStr(newPosition));
                                    break;
                                }else{
                                    break;
                                }
                            }else{
                                if(attackOverVar==0){
                                    if(attacksOnOffset){
                                        moves.canAttack.push(posToStr(newPosition));
                                    }else{
                                        attackOverVar += 1;
                                    }
                                }else{
                                    moves.canAttack.push(posToStr(newPosition));
                                    break;
                                }
                            }
                        }else{
                            if(attackOver==false){
                                moves.canMove.push(posToStr(newPosition));
                            }else{
                                if(attackOverVar==0){
                                    moves.canMove.push(posToStr(newPosition));
                                }
                            }
                        }
                    }else{ //if it is occupied
                        if(attackOver){
                            if(attackOverVar==0){
                                attackOverVar += 1;
                            }else{
                                break;
                            }
                        }else{
                            break;
                        }
                    }

                    if(offsetType == "singular"){
                        break;
                    }
                    newPosition[0] += offset[0];
                    newPosition[1] += offset[1];
                }
            }
            return moves;
        }
    }

    class XiangqiBoard extends Board { //holds information about the xiangqi chess pieces and rules
        constructor() {
            super();
            this.type = "xiangqi";
            this.nbSqPSideX = 9;
            this.nbSqPSideY = 10;
            this.subSizeX = 300;
            this.subSizeY = 300;
            this.imageSrcs = [
                "./images/xiangqi/pieces.png",
                "./images/xiangqi/board.png"
            ];
            this.coordinates = { //holds information about where the piece sprites are from the images file
                0: [0, 0], //general/governor/jiang white (w)
                1: [0, 1], //general/governor/jiang black (b)
                2: [1, 0], //counselor/senior/shi w
                3: [1, 1], //counselor/senior/shi b
                7: [2, 1], //elephant/minister/shiang b
                4: [3, 0], //knight/horse/ma w
                5: [3, 1], //knight/horse/ma b
                6: [2, 0], //elephant/minister/shiang w
                8: [4, 0], //rook/chariot/chuh w
                9: [4, 1], //rook/chariot/chuh b
                10: [5, 0], //catapult/cannon/pao w
                11: [5, 1], //catapult/cannon/pao b
                12: [6, 0], //pawn/soldier w
                13: [6, 1] //pawn/soldier b
            };

            this.initGameState = 
            {
                "variant":"xiangqi",
                "moveNb":0,
                "check":false,
                "lastMove":{"piece":null,"originStr":null,"originCoord":null,"destinationStr":null,"destinationCoord":null},
                "pieces":
                    [
                        {"pid":0,"alive":true,"numberMoves":0,"positionStr":"a1","positionCoord":[0,0],"originalType":"rook","type":"rook","colour":"white","spriteCoord":8},
                        {"pid":1,"alive":true,"numberMoves":0,"positionStr":"b1","positionCoord":[1,0],"originalType":"knight","type":"knight","colour":"white","spriteCoord":6},
                        {"pid":2,"alive":true,"numberMoves":0,"positionStr":"c1","positionCoord":[2,0],"originalType":"elephant","type":"elephant","colour":"white","spriteCoord":4},
                        {"pid":3,"alive":true,"numberMoves":0,"positionStr":"d1","positionCoord":[3,0],"originalType":"counselor","type":"counselor","colour":"white","spriteCoord":2},
                        {"pid":4,"alive":true,"numberMoves":0,"positionStr":"e1","positionCoord":[4,0],"originalType":"king","type":"king","colour":"white","spriteCoord":0},
                        {"pid":5,"alive":true,"numberMoves":0,"positionStr":"f1","positionCoord":[5,0],"originalType":"counselor","type":"counselor","colour":"white","spriteCoord":2},
                        {"pid":6,"alive":true,"numberMoves":0,"positionStr":"g1","positionCoord":[6,0],"originalType":"elephant","type":"elephant","colour":"white","spriteCoord":4},
                        {"pid":7,"alive":true,"numberMoves":0,"positionStr":"h1","positionCoord":[7,0],"originalType":"knight","type":"knight","colour":"white","spriteCoord":6},
                        {"pid":8,"alive":true,"numberMoves":0,"positionStr":"i1","positionCoord":[8,0],"originalType":"rook","type":"rook","colour":"white","spriteCoord":8},
                        {"pid":9,"alive":true,"numberMoves":0,"positionStr":"b3","positionCoord":[1,2],"originalType":"catapult","type":"catapult","colour":"white","spriteCoord":10},
                        {"pid":10,"alive":true,"numberMoves":0,"positionStr":"h3","positionCoord":[7,2],"originalType":"catapult","type":"catapult","colour":"white","spriteCoord":10},
                        {"pid":11,"alive":true,"numberMoves":0,"positionStr":"a4","positionCoord":[0,3],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":12},
                        {"pid":12,"alive":true,"numberMoves":0,"positionStr":"c4","positionCoord":[2,3],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":12},
                        {"pid":13,"alive":true,"numberMoves":0,"positionStr":"e4","positionCoord":[4,3],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":12},
                        {"pid":14,"alive":true,"numberMoves":0,"positionStr":"g4","positionCoord":[6,3],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":12},
                        {"pid":15,"alive":true,"numberMoves":0,"positionStr":"i4","positionCoord":[8,3],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":12},
                        {"pid":16,"alive":true,"numberMoves":0,"positionStr":"a10","positionCoord":[0,9],"originalType":"rook","type":"rook","colour":"black","spriteCoord":9},
                        {"pid":17,"alive":true,"numberMoves":0,"positionStr":"b10","positionCoord":[1,9],"originalType":"knight","type":"knight","colour":"black","spriteCoord":7},
                        {"pid":18,"alive":true,"numberMoves":0,"positionStr":"c10","positionCoord":[2,9],"originalType":"elephant","type":"elephant","colour":"black","spriteCoord":5},
                        {"pid":19,"alive":true,"numberMoves":0,"positionStr":"d10","positionCoord":[3,9],"originalType":"counselor","type":"counselor","colour":"black","spriteCoord":3},
                        {"pid":20,"alive":true,"numberMoves":0,"positionStr":"e10","positionCoord":[4,9],"originalType":"king","type":"king","colour":"black","spriteCoord":1},
                        {"pid":21,"alive":true,"numberMoves":0,"positionStr":"f10","positionCoord":[5,9],"originalType":"counselor","type":"counselor","colour":"black","spriteCoord":3},
                        {"pid":22,"alive":true,"numberMoves":0,"positionStr":"g10","positionCoord":[6,9],"originalType":"elephant","type":"elephant","colour":"black","spriteCoord":5},
                        {"pid":23,"alive":true,"numberMoves":0,"positionStr":"h10","positionCoord":[7,9],"originalType":"knight","type":"knight","colour":"black","spriteCoord":7},
                        {"pid":24,"alive":true,"numberMoves":0,"positionStr":"i10","positionCoord":[8,9],"originalType":"rook","type":"rook","colour":"black","spriteCoord":9},
                        {"pid":25,"alive":true,"numberMoves":0,"positionStr":"b8","positionCoord":[1,7],"originalType":"catapult","type":"catapult","colour":"black","spriteCoord":11},
                        {"pid":26,"alive":true,"numberMoves":0,"positionStr":"h8","positionCoord":[7,7],"originalType":"catapult","type":"catapult","colour":"black","spriteCoord":11},
                        {"pid":27,"alive":true,"numberMoves":0,"positionStr":"a7","positionCoord":[0,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":13},
                        {"pid":28,"alive":true,"numberMoves":0,"positionStr":"c7","positionCoord":[2,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":13},
                        {"pid":29,"alive":true,"numberMoves":0,"positionStr":"e7","positionCoord":[4,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":13},
                        {"pid":30,"alive":true,"numberMoves":0,"positionStr":"g7","positionCoord":[6,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":13},
                        {"pid":31,"alive":true,"numberMoves":0,"positionStr":"i7","positionCoord":[8,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":13}
                    ]
            }
            
            this.gameStates.push(this.initGameState);
        }

        getPromotionConfigs(piece, str){ //holds information about piece promotions
            var promotionConfigs = []
            switch(piece.type){
                case "pawn":
                    if(piece.colour=="white"){
                        if(str[1]==6){
                            promotionConfigs.push({
                                type:"promotedpawn",
                                spriteCoord:12
                            });                                
                        }
                    }else{
                        if(str[1]==5){
                            promotionConfigs.push({
                                type:"promotedpawn",
                                spriteCoord:13
                            });                                
                        }
                    }
                    break;
            }
            return promotionConfigs;
        }

        inBetweenElephantJump(str1, str2){
            var pos1 = strToPos(str1);
            var pos2 = strToPos(str2);
            var pos3 = [];
            if(pos1[0]>pos2[0]){
                pos3.push(pos2[0] + 1);
            }else{
                pos3.push(pos1[0] + 1);
            }
            if(pos1[1]>pos2[1]){
                pos3.push(pos2[1] + 1);
            }else{
                pos3.push(pos1[1] + 1);
            }
            return pos3;               
        }

        inBetweenKnightJump(str1, str2){   
            var pos1 = strToPos(str1); //after
            var pos2 = strToPos(str2); //before
            var diffX = pos1[0]-pos2[0];
            var diffY = pos1[1]-pos2[1];

            if(Math.abs(diffX) > Math.abs(diffY)){
                if(diffX<0){
                    return [pos2[0] - 1, pos2[1]];
                }else{
                    return [pos2[0] + 1, pos2[1]];
                }
            }else{
                if(diffY<0){
                    return [pos2[0], pos2[1] - 1];
                }else{
                    return [pos2[0], pos2[1] + 1];
                }
            }
        }

        getPieceMoves(piece, myOccupiedSquares, opponentOccupiedSquares){ //apply rules of each piece to generate moves
            switch(piece.type) {
                case "king":
                    if(piece.colour=="white"){
                        return this.generatePositions(piece.positionCoord, [[-1,0],[0,1],[0,-1],[1,0]], "singular", myOccupiedSquares, opponentOccupiedSquares, [2,6,-1,3]);

                    }else{
                        return this.generatePositions(piece.positionCoord, [[-1,0],[0,1],[0,-1],[1,0]], "singular", myOccupiedSquares, opponentOccupiedSquares, [2,6,6,10]);
                    }                
                    break;
                case "counselor":
                    if(piece.colour=="white"){
                        return this.generatePositions(piece.positionCoord, [[-1,-1],[-1,1],[1,1],[1,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [2,6,-1,3]);

                    }else{
                        return this.generatePositions(piece.positionCoord, [[-1,-1],[-1,1],[1,1],[1,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [2,6,6,10]);
                    }                
                    break;
                case "catapult":
                    return this.generatePositions(piece.positionCoord, [[-1,0],[0,1],[1,0],[0,-1]], "plural", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10], false, true);
                    break;
                case "elephant":
                    var moves;
                    var newMoves = {
                        canMove: [],
                        canAttack: []
                    };
                    var squareToCheck;
                    if(piece.colour=="white"){
                        moves = this.generatePositions(piece.positionCoord, [[-2,-2],[-2,2],[2,2],[2,-2]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,5]);
                        for(var move in moves.canMove){
                            squareToCheck = this.inBetweenElephantJump(moves.canMove[move], piece.positionStr); //square in between elephant jump
                            if(!isArrayInArray(opponentOccupiedSquares.concat(myOccupiedSquares), squareToCheck)){ //is the square occupied by friendly/opponent piece
                                newMoves.canMove.push(moves.canMove[move]);
                            }
                        }
                        for(var move in moves.canAttack){
                            squareToCheck = this.inBetweenElephantJump(moves.canAttack[move], piece.positionStr); //square in between elephant jump
                            if(!isArrayInArray(opponentOccupiedSquares.concat(myOccupiedSquares), squareToCheck)){ //is the square occupied by friendly/opponent piece
                                newMoves.canAttack.push(moves.canAttack[move]);
                            }
                        }
                        return newMoves;
                    }else{
                        moves = this.generatePositions(piece.positionCoord, [[-2,-2],[-2,2],[2,2],[2,-2]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,4,10]);
                        for(var move in moves.canMove){
                            squareToCheck = this.inBetweenElephantJump(moves.canMove[move], piece.positionStr); //square in between elephant jump
                            if(!isArrayInArray(opponentOccupiedSquares.concat(myOccupiedSquares), squareToCheck)){ //is the square occupied by friendly/opponent piece
                                newMoves.canMove.push(moves.canMove[move]);
                            }
                        }
                        for(var move in moves.canAttack){
                            squareToCheck = this.inBetweenElephantJump(moves.canAttack[move], piece.positionStr); //square in between elephant jump
                            if(!isArrayInArray(opponentOccupiedSquares.concat(myOccupiedSquares), squareToCheck)){ //is the square occupied by friendly/opponent piece
                                newMoves.canAttack.push(moves.canAttack[move]);
                            }
                        }
                        return newMoves;
                    }       
                    break;
                case "knight":
                    var moves;
                    var newMoves = {
                        canMove: [],
                        canAttack: []
                    };
                    var squareToCheck;
                    moves = this.generatePositions(piece.positionCoord, [[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10]);
                    for(var move in moves.canMove){
                        squareToCheck = this.inBetweenKnightJump(moves.canMove[move], piece.positionStr); //square in between knight jump
                        if(!isArrayInArray(opponentOccupiedSquares.concat(myOccupiedSquares), squareToCheck)){ //is the square occupied by friendly/opponent piece
                            newMoves.canMove.push(moves.canMove[move]);
                        }
                    }
                    for(var move in moves.canAttack){
                        squareToCheck = this.inBetweenElephantJump(moves.canAttack[move], piece.positionStr); //square in between knight jump
                        if(!isArrayInArray(opponentOccupiedSquares.concat(myOccupiedSquares), squareToCheck)){ //is the square occupied by friendly/opponent piece
                            newMoves.canAttack.push(moves.canAttack[move]);
                        }
                    }
                    return newMoves;
                    break;
                case "rook":
                    return this.generatePositions(piece.positionCoord, [[-1,0],[0,1],[1,0],[0,-1]], "plural", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10]);
                    break;
                case "pawn":
                    if(piece.colour=="white"){
                        return this.generatePositions(piece.positionCoord, [[0,1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10]);
                    }else{
                        return this.generatePositions(piece.positionCoord, [[0,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10]);
                    }
                    break;
                case "promotedpawn":
                    if(piece.colour=="white"){
                        return this.generatePositions(piece.positionCoord, [[0,1],[-1,0],[1,0]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10]);
                    }else{
                        return this.generatePositions(piece.positionCoord, [[0,-1],[-1,0],[1,0]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,9,-1,10]);
                    }
                    break;
            }
        }
    }

    function loader(board, loadImg, allDone) { //used for executing the code only once images have been received
        var count = board.imageSrcs.length;
        var finishedLoadImg = (board, i)=>{
            count--;
            if (0 == count) {
                allDone(board);
                return;
            }
        };

        for (var i in board.imageSrcs){
            loadImg(board, i, finishedLoadImg);
        }
    }

    function loadImage(board, i, onComplete) { //works in cooperation with loader
        var onLoad = function (event) {
            event.target.removeEventListener("load", onLoad);
            var re = /([\w\d_-]*)\.?[^\\\/]*$/i;
            var type = event.target.src.match(re)[1];
            if(type == "pieces"){
                board.images.pieces = event.target;
            }else if(type == "sideboard"){
                board.images.sideboard = event.target;
            }
            else{
                board.images.board = event.target;
            }
            onComplete(board, i);
        }
        var img = new Image();
        img.addEventListener("load", onLoad, false);
        img.src = board.imageSrcs[i];
    } 

    function getCursorPosition(event, nbSqPSideX){ //gets cursor position when mouse is pressed on canvas
        var rect = canvas.getBoundingClientRect();
        var realSqSize = $("#chesscreator").width() / nbSqPSideX;
        var position = [Math.floor((event.clientX - rect.left)/realSqSize), Math.floor((event.clientY - rect.top)/realSqSize)];
        return position
    }

    function returnOpponentEye(e){ //returns opponent's eye
        return ((e=="white") ? "black" : "white");
    }

    function isItMyTurn(){ //returns true if it a player's turn according to eye and board move
        return (eye == (board.moveNb % 2 == 0 ? "white" : "black"));
    }

    function keyDownUtils(e){ //used to navigate through gamestates and change point of view
        if(board.focus.piece != null){
                board.focus.piece = null;
        }
        switch (e.keyCode) {
            //navigate through game states, up and right arrow keys to move forward, left and bottom to move backwards
            case 37:
                console.log("hey 37");
                if(board.eyeNb>0){
                    board.eyeNb -= 1;
                }
                draw(board, board.eyeNb);
                break;
            case 38:
                console.log("hey 38");
                if(board.eyeNb<board.moveNb){
                    board.eyeNb += 1;
                }
                draw(board, board.eyeNb);
                break;
            case 39:
                console.log("hey 39");
                if(board.eyeNb<board.moveNb){
                    board.eyeNb += 1;
                }
                draw(board, board.eyeNb);
                break;
            case 40:
                console.log("hey 40");
                if(board.eyeNb>0){
                    board.eyeNb -= 1;
                }
                draw(board, board.eyeNb);
                break;
            //change point of view, w to see from white's pov, b to see from black's pov 
            case 66:
                console.log("hey 66");
                eyeView = "black";
                draw(board, board.eyeNb);
                break;
            case 87:
                console.log("hey 87");
                eyeView = "white";
                draw(board, board.eyeNb);
                break;
        }
    }

    function boardEventListener(board, event){ //important function, main board event listener
        if(isItMyTurn() && board.eyeNb == board.moveNb){ //player's turn, eye on correct gamestate, game is live
            var pos = getCursorPosition(event, board.nbSqPSideX);
            var str = drawPosToStr(pos);
            console.log(pos, str);

            var piece;
            var configSquares;

            //grab piece
            if(board.focus.piece == null){
                for(var pIndex in board.gameStates[board.moveNb].pieces){
                    piece = board.gameStates[board.moveNb].pieces[pIndex];
                    if(piece.positionStr == str && piece.colour == eye && piece.alive){ //if piece belongs to user and not dead
                        board.focus.piece = piece;
                        board.focus.validSquares = board.moves[piece.pid];
                        // console.log("holding piece :", piece.type, piece.colour, piece.positionStr)
                        draw(board, board.moveNb);
                        break;
                    }
                }
            }

            //drop piece
            else{
                if(board.promoting){
                    configSquares = getPromotedStrs(board.promotingSquare, board.promotionConfigs.length);

                    if(isStrInArray(configSquares, str)){
                        board.promotingChoice = board.promotionConfigs[configSquares.indexOf(str)];
                    }
                    else{
                        // console.log("promotion selected square is wrong");
                        board.focus.piece = null;
                        board.promoting = false;
                        draw(board, board.moveNb)
                    }
                }


                if(isStrInArray(board.focus.validSquares.canMove, str)||isStrInArray(board.focus.validSquares.canAttack, str)||board.promoting){ 

                    if(board.promoting==false){
                        board.promotingSquare = str;
                        board.promotionConfigs = board.getPromotionConfigs(board.focus.piece, str);
                        if(board.promotionConfigs.length!=0){
                            board.promoting=true;
                            draw(board, board.moveNb);
                            return;
                        }
                    }

                    var newState = deepCopyState(board.gameStates[board.moveNb]); 
                    for(var pIndex in newState.pieces){
                        if(newState.pieces[pIndex].pid == board.focus.piece.pid && newState.pieces[pIndex].alive){
                            
                            piece = newState.pieces[pIndex];

                            for(var pIndex2 in newState.pieces){ //remove piece if on destination square by switching alive to false
                                if(board.promoting==false){ 
                                    if(newState.pieces[pIndex2].positionStr == str && newState.pieces[pIndex2].alive){ 
                                        newState.pieces[pIndex2].alive = false;
                                        break;
                                    }
                                }else{
                                    if(newState.pieces[pIndex2].positionStr == board.promotingSquare && newState.pieces[pIndex2].alive){ 
                                        newState.pieces[pIndex2].alive = false;
                                        break;
                                    }
                                }
                            }
                            
                            if(board.promoting==false){
                                piece.positionStr = str;
                                piece.positionCoord = strToPos(str);
                            }else{
                                piece.positionStr = board.promotingSquare;
                                piece.positionCoord = strToPos(board.promotingSquare);
                                piece.type = board.promotingChoice.type;
                                piece.spriteCoord = board.promotingChoice.spriteCoord;
                            }
                            piece.numberMoves += 1;
                            newState.lastMove.piece = piece;
                            break;

                        }
                        else if(newState.pieces[pIndex].pid == board.focus.piece.pid && newState.pieces[pIndex].alive==false){
                            piece = newState.pieces[pIndex];
                            newState.lastMove.piece = piece;
                            piece.positionStr = str;
                            piece.numberMoves+=1;
                            piece.positionCoord = strToPos(str);
                            piece.alive = true;
                            break
                        }
                    }
                    newState.check = false;
                    var isInCheck = isKingInCheck(board, newState, returnOpponentEye(eye)); //if opponent king is in check add flag to state
                    if(isInCheck!=null){
                        newState.check = isInCheck;
                    }
                    if(board.focus.piece.positionStr!=null){
                        newState.lastMove.originStr = board.focus.piece.positionStr;
                        newState.lastMove.originCoord = strToPos(board.focus.piece.positionStr);
                    }else{
                        newState.lastMove.originStr = null;
                        newState.lastMove.originCoord = null;
                    }
                    newState.lastMove.destinationStr = str;
                    newState.lastMove.destinationCoord = strToPos(str);
                    newState.moveNb += 1;

                    board.gameStates.push(newState);
                    board.moveNb += 1;
                    board.eyeNb += 1;
                    board.focus.piece = null;
                    board.moves = {};
                    board.promoting = false;
                    board.promotionConfigs = [];
                    
                    eyeView = returnOpponentEye(eyeView);
                    eye = returnOpponentEye(eye);

                    startEngine(board);
                }
                else{
                    board.focus.piece = null;
                    draw(board, board.moveNb)
                }
            }
        } 
    }
    
    function startEngine(board){ //
        hasMove = false;
        if(isItMyTurn()){
            board.generateValidMoves();
            for(var mIndex in board.moves){ //check if player has at least one move.
                if(board.moves[mIndex].canMove.length!=0||board.moves[mIndex].canAttack.length!=0){
                    hasMove = true;
                    break;
                }
            }
            if(hasMove==false){ //if no possible moves
                occupied = board.getSquareOccupancy(board.gameStates[board.moveNb], returnOpponentEye(eye));
                mySquares = occupied[0];
                hisSquares = occupied[1];
                for(var pieceIndex in board.gameStates[board.moveNb].pieces){ //get king position
                    peice = board.gameStates[board.moveNb].pieces[pieceIndex];
                    if(peice.colour == eye && peice.type=="king"){
                        kingPosition = peice.positionStr;
                        break;
                    }
                }
                isStale = true;
                for(var opIndex in board.gameStates[board.moveNb].pieces){ //if one of opponent's piece can attack my king then mate, else stalemate
                    if(isStale == false){
                        break;
                    }
                    if(board.gameStates[board.moveNb].pieces[opIndex].colour == returnOpponentEye(eye) && board.gameStates[board.moveNb].pieces[opIndex].alive){ 
                        newPieceMoves = board.getPieceMoves(board.gameStates[board.moveNb].pieces[opIndex], mySquares, hisSquares); 
                        for(var moveIndex in newPieceMoves.canAttack){ //if any move attacks the king position then the original move is deemed invalid
                            if(newPieceMoves.canAttack[moveIndex] == kingPosition){
                                isStale = false;
                                break;
                            }
                        }
                    }
                }
                if(isStale){
                    alert("stalemate");
                }else{
                    alert("mate");
                }

            }
        }

        draw(board, board.moveNb);
    }


    board = new XiangqiBoard(eyeView);


    loader(board, loadImage, function () { //await images to load and populate board object start game logic
        
        //setup canvas with data from your chess variant class
        canvas.width = boardPixelsHorizontal;
        canvas.height = boardPixelsVertical;
        sqSize = boardPixelsHorizontal / board.nbSqPSideX;
        nbSqPSideX = board.nbSqPSideX;
        nbSqPSideY = board.nbSqPSideY;

        startEngine(board);
        
        canvas.addEventListener('mousedown', (event)=>{boardEventListener(board, event)}); //start listening for events on the canvas
    })

    document.addEventListener('keydown', keyDownUtils); 
});
