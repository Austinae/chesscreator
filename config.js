export default class InternationalBoard extends Board { //holds information about the western chess pieces and rules
    constructor() {
        super();
        this.variant = 1;
        this.type = "international";
        this.cwidth = 400;
        this.cheight = 400;
        this.nbSqPSideX = 8;
        this.nbSqPSideY = 8;
        this.subSizeX = 45;
        this.subSizeY = 45;
        this.initGameState =         
        {
            "variant":"international",
            "moveNb":0,
            "check":false,
            "lastMove":{"piece":null,"originStr":null,"originCoord":null,"destinationStr":null,"destinationCoord":null},
            "pieces":
                [
                    {"pid":0,"alive":true,"numberMoves":0,"positionStr":"a1","positionCoord":[0,0],"originalType":"rook","type":"rook","colour":"white","spriteCoord":8},
                    {"pid":1,"alive":true,"numberMoves":0,"positionStr":"b1","positionCoord":[1,0],"originalType":"knight","type":"knight","colour":"white","spriteCoord":6},
                    {"pid":2,"alive":true,"numberMoves":0,"positionStr":"c1","positionCoord":[2,0],"originalType":"bishop","type":"bishop","colour":"white","spriteCoord":4},
                    {"pid":3,"alive":true,"numberMoves":0,"positionStr":"d1","positionCoord":[3,0],"originalType":"queen","type":"queen","colour":"white","spriteCoord":2},
                    {"pid":4,"alive":true,"numberMoves":0,"positionStr":"e1","positionCoord":[4,0],"originalType":"king","type":"king","colour":"white","spriteCoord":0},
                    {"pid":5,"alive":true,"numberMoves":0,"positionStr":"f1","positionCoord":[5,0],"originalType":"bishop","type":"bishop","colour":"white","spriteCoord":4},
                    {"pid":6,"alive":true,"numberMoves":0,"positionStr":"g1","positionCoord":[6,0],"originalType":"knight","type":"knight","colour":"white","spriteCoord":6},
                    {"pid":7,"alive":true,"numberMoves":0,"positionStr":"h1","positionCoord":[7,0],"originalType":"rook","type":"rook","colour":"white","spriteCoord":8},
                    {"pid":8,"alive":true,"numberMoves":0,"positionStr":"a2","positionCoord":[0,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":9,"alive":true,"numberMoves":0,"positionStr":"b2","positionCoord":[1,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":10,"alive":true,"numberMoves":0,"positionStr":"c2","positionCoord":[2,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":11,"alive":true,"numberMoves":0,"positionStr":"d2","positionCoord":[3,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":12,"alive":true,"numberMoves":0,"positionStr":"e2","positionCoord":[4,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":13,"alive":true,"numberMoves":0,"positionStr":"f2","positionCoord":[5,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":14,"alive":true,"numberMoves":0,"positionStr":"g2","positionCoord":[6,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":15,"alive":true,"numberMoves":0,"positionStr":"h2","positionCoord":[7,1],"originalType":"pawn","type":"pawn","colour":"white","spriteCoord":10},
                    {"pid":16,"alive":true,"numberMoves":0,"positionStr":"a8","positionCoord":[0,7],"originalType":"rook","type":"rook","colour":"black","spriteCoord":9},
                    {"pid":17,"alive":true,"numberMoves":0,"positionStr":"b8","positionCoord":[1,7],"originalType":"knight","type":"knight","colour":"black","spriteCoord":7},
                    {"pid":18,"alive":true,"numberMoves":0,"positionStr":"c8","positionCoord":[2,7],"originalType":"bishop","type":"bishop","colour":"black","spriteCoord":5},
                    {"pid":19,"alive":true,"numberMoves":0,"positionStr":"d8","positionCoord":[3,7],"originalType":"queen","type":"queen","colour":"black","spriteCoord":3},
                    {"pid":20,"alive":true,"numberMoves":0,"positionStr":"e8","positionCoord":[4,7],"originalType":"king","type":"king","colour":"black","spriteCoord":1},
                    {"pid":21,"alive":true,"numberMoves":0,"positionStr":"f8","positionCoord":[5,7],"originalType":"bishop","type":"bishop","colour":"black","spriteCoord":5},
                    {"pid":22,"alive":true,"numberMoves":0,"positionStr":"g8","positionCoord":[6,7],"originalType":"knight","type":"knight","colour":"black","spriteCoord":7},
                    {"pid":23,"alive":true,"numberMoves":0,"positionStr":"h8","positionCoord":[7,7],"originalType":"rook","type":"rook","colour":"black","spriteCoord":9},
                    {"pid":24,"alive":true,"numberMoves":0,"positionStr":"a7","positionCoord":[0,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":25,"alive":true,"numberMoves":0,"positionStr":"b7","positionCoord":[1,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":26,"alive":true,"numberMoves":0,"positionStr":"c7","positionCoord":[2,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":27,"alive":true,"numberMoves":0,"positionStr":"d7","positionCoord":[3,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":28,"alive":true,"numberMoves":0,"positionStr":"e7","positionCoord":[4,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":29,"alive":true,"numberMoves":0,"positionStr":"f7","positionCoord":[5,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":30,"alive":true,"numberMoves":0,"positionStr":"g7","positionCoord":[6,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11},
                    {"pid":31,"alive":true,"numberMoves":0,"positionStr":"h7","positionCoord":[7,6],"originalType":"pawn","type":"pawn","colour":"black","spriteCoord":11}
                ]
        }
        this.imageSrcs = [
            "images/international/pieces.svg",
            "images/international/board.png"
        ];
        this.coordinates = { //holds information about where the piece sprites are from the images file
            0: [0, 0], //king white (w)
            1: [0, 1], //king black (b)
            2: [1, 0], //queen w
            3: [1, 1], //queen b
            4: [2, 0], //bishop w
            5: [2, 1], //bishop b
            6: [3, 0], //knight w
            7: [3, 1], //knight b
            8: [4, 0], //rook w
            9: [4, 1], //rook b
            10: [5, 0], //pawn w
            11: [5, 1] //pawn b
        };

    }

    getPromotionConfigs(piece, str){ //holds information about piece promotions
        var promotionConfigs = []
        switch(piece.type){
            case "pawn":
                if(str[1]==8||str[1]==1){
                    if(piece.colour =="white"){
                        promotionConfigs.push({
                            type:"queen",
                            spriteCoord:2
                        });
                        promotionConfigs.push({
                            type:"rook",
                            spriteCoord:8
                        });
                        promotionConfigs.push({
                            type:"bishop",
                            spriteCoord:4
                        });
                        promotionConfigs.push({
                            type:"knight",
                            spriteCoord:6
                        });
                    }else{
                        promotionConfigs.push({
                            type:"queen",
                            spriteCoord:3
                        });
                        promotionConfigs.push({
                            type:"rook",
                            spriteCoord:9
                        });
                        promotionConfigs.push({
                            type:"bishop",
                            spriteCoord:5
                        });
                        promotionConfigs.push({
                            type:"knight",
                            spriteCoord:7
                        });
                        
                    }
                }
                break;
        }
        return promotionConfigs;
    }

    areCastlingSquaresCheckFree(state, kingId, type){ //helps getPieceMoves by checking if certain squares are being attacked by opponent pieces for the purpose of castling
        var isValid;
        var squaresToCheck;
        var opponentKingId = ((kingId==20) ? 4 : 20);
        if(eye == "white"){
            if(type=="qs"){
                squaresToCheck = ["c1", "d1"]

            }else{
                squaresToCheck = ["f1", "g1"]
            }
        }else{
            if(type=="qs"){
                squaresToCheck = ["c8", "d8"]

            }else{
                squaresToCheck = ["f8", "g8"]
            }
        }
        var newState = deepCopyState(state); 
        for(var pIndex in newState.pieces){ //this avoids infinte loop
            if(newState.pieces[pIndex].pid==opponentKingId){
                newState.pieces[pIndex].numberMoves = 1;
                break;
            }
        }
        for(var pIndex in newState.pieces){ //see if by moving king to d1 king is in check
            if(newState.pieces[pIndex].pid==kingId){
                newState.pieces[pIndex].positionStr = squaresToCheck[0]; 
                newState.pieces[pIndex].positionCoord = strToPos(squaresToCheck[0]);
                newState.pieces[pIndex].numberMoves = 1;

                isValid = isKingInCheck(this, newState, eye); //if player's king is in check then 
                if(isValid!=false){
                    isValid=false;
                    break;
                }
                newState.pieces[pIndex].positionStr = squaresToCheck[1]; 
                newState.pieces[pIndex].positionCoord = strToPos(squaresToCheck[1]);
                newState.pieces[pIndex].numberMoves = 1;
                isValid = isKingInCheck(this, newState, eye); //if player's king is in check then 
                if(isValid!=false){
                    isValid=false;
                    break;
                }
                isValid=true;
                break;
            }                                          
        }
        if(isValid==true){
            return true;
        }else{
            return false;
        }
    }

    getPieceMoves(piece, myOccupiedSquares, opponentOccupiedSquares){ //apply rules of each piece to generate moves
        var moves;
        switch(piece.type) {
            case "king":
                moves = this.generatePositions(piece.positionCoord, [[-1,1],[-1,0],[-1,-1],[0,1],[0,-1],[1,1],[1,0],[1,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
                
                // Castling
                var p;
                var kingPiece;
                var newState;
                var isValidQs;
                var isValidKs;
                var allBoardPiecesPos = opponentOccupiedSquares.concat(myOccupiedSquares);

                if(this.gameStates[this.moveNb].check==false){ //if king not in check
                    if(piece.numberMoves == 0){ //if king hasn't moved
                        for(var pIndex in this.gameStates[this.moveNb].pieces){ 
                            p = this.gameStates[this.moveNb].pieces[pIndex];
                            if(piece.colour=="white"){
                                if(p.pid==0){ //queen-side (qs)
                                    if(p.numberMoves==0 && p.alive){ //if qs rook is alive and hasn't moved
                                        if((!isArrayInArray(allBoardPiecesPos, strToPos("d1")))&&(!isArrayInArray(allBoardPiecesPos, strToPos("c1")))){ 
                                            if(this.areCastlingSquaresCheckFree(this.gameStates[this.moveNb], 4, "qs")==true){
                                                moves.canMove.push("c1");
                                            }    
                                        }
                                    }
                                }
                                if(p.pid==7){ //king-side (ks)
                                    if(p.numberMoves==0 && p.alive){ //if ks rook is alive hasn't moved
                                        if((!isArrayInArray(allBoardPiecesPos, strToPos("f1")))&&(!isArrayInArray(allBoardPiecesPos, strToPos("g1")))){ 
                                            if(this.areCastlingSquaresCheckFree(this.gameStates[this.moveNb], 4, "ks")==true){
                                                moves.canMove.push("g1");
                                            }
                                        }
                                    }
                                    break; //we can break here since qs rook will always come first
                                }
                            }else{ //black
                                if(p.pid==16){ //queen-side (qs)
                                    if(p.numberMoves==0 && p.alive){ //if qs rook is alive and hasn't moved
                                        if((!isArrayInArray(allBoardPiecesPos, strToPos("d8")))&&(!isArrayInArray(allBoardPiecesPos, strToPos("c8")))){ 
                                            if(this.areCastlingSquaresCheckFree(this.gameStates[this.moveNb], 20, "qs")==true){
                                                moves.canMove.push("c8");
                                            }  
                                        }

                                    }
                                }
                                if(p.pid==23){ //king-side (ks)
                                    if(p.numberMoves==0 && p.alive){ //if ks rook is alive and hasn't moved
                                        if((!isArrayInArray(allBoardPiecesPos, strToPos("f8")))&&(!isArrayInArray(allBoardPiecesPos, strToPos("g8")))){ 
                                            if(this.areCastlingSquaresCheckFree(this.gameStates[this.moveNb], 20, "ks")==true){
                                                moves.canMove.push("g8");
                                            }   
                                        }
                                    }
                                    break; //we can break here since qs rook will always come first
                                }
                            }
                        }
                    }
                }
                return moves;
            case "queen":
                return this.generatePositions(piece.positionCoord, [[-1,1],[-1,0],[-1,-1],[0,1],[0,-1],[1,1],[1,0],[1,-1]], "plural", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
            case "bishop":
                return this.generatePositions(piece.positionCoord, [[-1,1],[1,1],[1,-1],[-1,-1]], "plural", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
            case "knight":
                return this.generatePositions(piece.positionCoord, [[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
            case "rook":
                return this.generatePositions(piece.positionCoord, [[-1,0],[0,1],[1,0],[0,-1]], "plural", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
            case "pawn":
                var squareToCheck;
                var twoMoveSquare;
                var allBoardPiecesPos = opponentOccupiedSquares.concat(myOccupiedSquares);
                var enPassantSquareCoord;
                if(piece.colour=="white"){
                    if(piece.numberMoves==0){
                        moves = this.generatePositions(piece.positionCoord, [[0,1],[0,2]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8],false);
                        // Removes [0,2] if a piece stands on [0,1]
                        squareToCheck = strToPos(piece.positionStr[0] + (parseInt(piece.positionStr.substring(1))+1));
                        twoMoveSquare = piece.positionStr[0] + (parseInt(piece.positionStr.substring(1))+2);
                        if(isStrInArray(moves.canMove, twoMoveSquare)){
                            if(isArrayInArray(allBoardPiecesPos, squareToCheck)){ 
                                moves.canMove.splice(moves.canMove.indexOf(twoMoveSquare), 1);
                            }
                        }
                    }else{
                        moves = this.generatePositions(piece.positionCoord, [[0,1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8],false);
                    }

                    // Add en-passant square
                    if(this.moveNb!=0){
                        if(this.gameStates[this.moveNb].lastMove.piece.type=="pawn"){
                            if((Math.abs(this.gameStates[this.moveNb].lastMove.originCoord[1] - this.gameStates[this.moveNb].lastMove.destinationCoord[1]))>1){
                                if(this.gameStates[this.moveNb].lastMove.piece.colour=="white"){
                                    enPassantSquareCoord = [this.gameStates[this.moveNb].lastMove.originCoord[0],this.gameStates[this.moveNb].lastMove.originCoord[1]+1];
                                }else{
                                    enPassantSquareCoord = [this.gameStates[this.moveNb].lastMove.originCoord[0],this.gameStates[this.moveNb].lastMove.originCoord[1]-1];
                                }
                            }
                        }
                    }

                    // Attacking 
                    var newPosition;
                    var attackOffsets = [[1,1],[-1,1]]
                    for(var attackOffsetIndex in attackOffsets){
                        var attackOffset = attackOffsets[attackOffsetIndex];
                        newPosition = [piece.positionCoord[0],piece.positionCoord[1]];
                        newPosition[0] += attackOffset[0];
                        newPosition[1] += attackOffset[1];
                        if(this.isInsideField(newPosition, [-1,8,-1,8])){ //if position inside field
                            if(isArrayInArray(opponentOccupiedSquares, newPosition)){ //if square is occupied by enemy piece then
                                    moves.canAttack.push(posToStr(newPosition));
                            }
                            if(typeof enPassantSquareCoord !== "undefined")
                            {
                                if(arraysEqual(newPosition,enPassantSquareCoord)){
                                    moves.canAttack.push(posToStr(newPosition));
                                }
                            } 
                        }
                    }
                    return moves;

                }else{
                    if(piece.numberMoves==0){
                        moves = this.generatePositions(piece.positionCoord, [[0,-1],[0,-2]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8],false);
                        // Removes [0,-2] if a piece stands on [0,-1]
                        squareToCheck = strToPos(piece.positionStr[0] + (parseInt(piece.positionStr.substring(1))-1));
                        twoMoveSquare = piece.positionStr[0] + (parseInt(piece.positionStr.substring(1))-2);
                        if(isStrInArray(moves.canMove, twoMoveSquare)){
                            if(isArrayInArray(allBoardPiecesPos, squareToCheck)){ 
                                moves.canMove.splice(moves.canMove.indexOf(twoMoveSquare), 1);
                            }
                        }
                    }else{
                        moves = this.generatePositions(piece.positionCoord, [[0,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8],false);
                    }

                    // Add en-passant square
                    if(this.moveNb!=0){
                        if(this.gameStates[this.moveNb].lastMove.piece.type=="pawn"){
                            if((Math.abs(this.gameStates[this.moveNb].lastMove.originCoord[1] - this.gameStates[this.moveNb].lastMove.destinationCoord[1]))>1){
                                if(this.gameStates[this.moveNb].lastMove.piece.colour=="white"){
                                    enPassantSquareCoord = [this.gameStates[this.moveNb].lastMove.originCoord[0],this.gameStates[this.moveNb].lastMove.originCoord[1]+1];
                                }else{
                                    enPassantSquareCoord = [this.gameStates[this.moveNb].lastMove.originCoord[0],this.gameStates[this.moveNb].lastMove.originCoord[1]-1];
                                }
                            }
                        }
                    }

                    // Attacking
                    var newPosition;
                    var attackOffsets = [[-1,-1],[1,-1]]
                    for(var attackOffsetIndex in attackOffsets){
                        var attackOffset = attackOffsets[attackOffsetIndex];
                        newPosition = [piece.positionCoord[0],piece.positionCoord[1]];
                        newPosition[0] += attackOffset[0];
                        newPosition[1] += attackOffset[1];
                        if(this.isInsideField(newPosition, [-1,8,-1,8])){ //if position inside field
                            if(isArrayInArray(opponentOccupiedSquares, newPosition)){ //if square is occupied by enemy piece then
                                    moves.canAttack.push(posToStr(newPosition));
                            }
                            if(typeof enPassantSquareCoord !== "undefined")
                            {
                                if(arraysEqual(newPosition,enPassantSquareCoord)){
                                    moves.canAttack.push(posToStr(newPosition));
                                }
                            } 
                        }
                    }
                    return moves;
                }
        }
    }
}