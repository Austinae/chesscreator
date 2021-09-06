<img style="width:250px;" src="https://i.ibb.co/c2rsWsS/chesscreator.png" alt="chesscreator logo" border="0">

# chesscreator

**Version 1.0.0**

<br />

A javascript library to easily integrate a chess board with custom chess piece rules into your website. Working examples for international chess and xiangqi is included and can be used for that sole purpose if you wish as well.

---

## Table of Contents  
[Features](#features)  
[Tutorial](#tutorial)  
[Contributors](#contributors)  
[License](#license)  

---
<a name="features"/>

## Features

* **Ease of use**, simply link the script, write down one canvas tag on you're ready to go.

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Chesscreator</title>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script type="text/javascript" src="chesscreator_international.js"></script>
		<!-- <script type="text/javascript" src="chesscreator_xiangqi.js"></script> -->
		<!-- <script type="text/javascript" src="chesscreator.js"></script> -->
	</head>
	<body>
		<canvas id="chesscreator">Canvas is not supported.</canvas>
	</body>
</html>
```
	
* **Piece drawing & highlighting**, the GUI is delt with and is very user-friendly. Squares are highlighted to help the user know when a piece has been selected and where it can move.

### Movement

<img style="width: 300px;" src="https://i.ibb.co/mGbBs2W/Capture.jpg" alt="Capture" border="0">

### Attack

<img style="width: 300px;" src="https://i.ibb.co/B3CG263/Capture.jpg" alt="Capture" border="0">

### King in check

<img style="width: 300px;" src="https://i.ibb.co/y8jw9W1/Capture.jpg" alt="Capture" border="0">

### Promoting

<img style="width: 300px;" src="https://i.ibb.co/JzRYNxb/Capture.jpg" alt="Capture" border="0">

<br />

*If someone could help me with the drag and drop feature that would be awesome, for now it is a click to select and click to drop, thank you! 🙏*

* **Awesome scalable code**, when creating your own game the _Board_ class which your class will inherit has a lot of useful functions. the most notable one is generatePositions which takes the following arguments:

```js
generatePositions(pos, offsets, offsetType, myOccupiedSquares, opponentOccupiedSquares, playingField, attacksOnOffset=true, attackOver=false)
```

* pos: don't touch, keep piece.positionCoord.
* offsets: an array of coordinates that describe the piece's movement. Format is [x, y]. For example a white pawn moves forwards so add [1, 0] to it as it moves up. However black pawn moves down as the engine logic is always from white's perspective so it would be [-1, 0]. To make the distinction you can add logic in this section such that you verify if a piece has the colour *white* or *black*.
* offsetType: can be *singular* or *plural*. *singular* keeps the offsets intact and the ones you entered will be the only valid moves for that piece. *plural* extends the offsets such if you enter [1, 0] it will follow that direction until the engine reaches an out of bounds square i.e. it will add [2, 0], [3, 0], [4, 0]... This is great for pieces like the rook and bishop.
* myOccupiedSquares: don't touch, keep myOccupiedSquares.
* opponentOccupiedSquares: don't touch, keep opponentOccupiedSquares.
* playingField: format is [x Min, x Max, y Min, y Max]. If a piece can move around the whole board then it should be [-1, this.nbSqPSideX, -1, this.nbSqPSideY] otherwise change it as you wish.
* attacksOnOffset: a boolean. If true the piece can capture in the direction of movement but can't move beyong that. If false the piece can't capture in the direction of movement and can't move beyong that.
* attackOver: a boolean. If true it will be able to 

*If someone could help me to add a **walkOver** argument so that the piece can jump over X pieces and possibly the ability to capture but only after having jumped over two pieces or Y pieces that would be awesome it could add a lot more possibilities, thank you! 🙏*

---
<a name="tutorial"/>

## Tutorial - Creating your own variant
### Files & folders
* _chesscreator.js_, the template file which should be used to create your chess variant.
* _chesscreator_international_, a working example for international chess.
* _chesscreator_international_, a working example for xiangqi.
* _index.html_, the simplicity of this HTML file highlights the potential that this can have since only two lines must be added: the link to the script and the canvas tag with *chesscreator* as the id. This is different to other libraries which include myriads of div tags and complexe logic routines.
* _images_
	* _international_
		* _board.png_
		* _pieces.svg_
	* _xiangqi_
		* _board.png_
		* _pieces.png_
	* _yourchessvariant_

### Step 1 - Preparation
It is important to note that before you start developing your own variant you have a clear understanding of what your board will look like, how each piece will move/capture. Take out Photoshop CC and draw your board and pieces and visualize the pieces moving on the board. ***Important*** Your variant remains a <ins>chess</ins> variant and therefore must include a piece named *king* and the rules for checking/checkmating/stalemating apply. 

The fun part: name your variant and replace every *yourchessvariant* with your chosen name.

### Step 2 - Images
You need to populate the _images/yourchessvariant/_ folder with a _board_ image and a _pieces_ image.
For simplicity group all your piece images in one file like so:

<br />

![Image of pieces][pieces]

<br />

### Step 3 - The script
Open _chesscreator.js_, most functions are utility functions so pay attention to those with stars as you may need to modify them to get more functionality from the library:

* **Drawing elements on canvas**
	* function isStrInArray(), a utility function
	* function isArrayInArray(), a utility function
	* function arraysEqual(), a utility function
	* function getPromotedStrs(), a utility function
	* function strToDrawPos(), a utility function
	* function strToPos(), a utility function
	* function drawPosToStr(), a utility function
	* function posToStr(), a utility function
	* function drawPiece(), a utility function
	* function drawSquare(), a utility function
	* function drawSbPieceAndDecoration(), a utility function
	* function draw(), the main function which draws on canvas the background board, highlight squares to help the user (previous move, legal moves, king in check), pieces, promotion options
* **Piece movement logic**
	* returnOpponentEye(), a utility function
	* isItMyTurn(), a utility function
	* isKingInCheck(), a utility function
	* deepCopyState(), a utility function
	* ⭐Board, a class with the chess engine logic
	* ⭐YourChessVariant, a class inherited from Board where you implement your own chess variant 
* **Canvas cursor logic**
	* getCursorPosition(), a utility function
	* keyDownUtils(), a utility function
	* ⭐boardEventListener(), the main function which deals with all canvas events
* **Main**
	* startEngine(), the main function which generates valid moves for each piece
* **Loading images**
	* loader(), a utility function
	* loadImage(), a utility function

### Step 4 - Filling in the gaps
If you are creating a simple chess variant all you should really be touching is the YourChessVariant class by filling in the gaps:

<br />

```js
    class YourChessVariant extends Board { //holds information about your variant chess pieces and rules
        constructor() {
            super();
            this.type = "YourChessVariant"; //name of your variant
            this.nbSqPSideX = #; //number of squares on horizontal axes
            this.nbSqPSideY = #; //number of squares on vertical axes
            this.subSizeX = #; //the width of each piece from the pieces image, see github for more info
            this.subSizeY = #; //the height of each piece from the pieces image, see github for more info
            this.imageSrcs = [ //make sure to name each as such, the extension doesn't matter but keep order as follows
                "./images/yourchessvariant/pieces.#", 
                "./images/yourchessvariant/board.#" 
            ];
            this.coordinates = { //holds information about where the piece sprites are from the images file
                #: [#, #], //name of piece (the colour of the piece)
                #: [#, #], //name of piece (the colour of the piece)
                //repeat until each piece has been categorized 
            };
            this.initGameState = //the position of each piece needs to be clarified, view examples for clarity    
            {
                "variant":"yourchessvariant",
                "moveNb":0,
                "check":false,
                "lastMove":{"piece":null,"originStr":null,"originCoord":null,"destinationStr":null,"destinationCoord":null},
                "pieces":
                    [
                        {"pid":0,"alive":true,"numberMoves":0,"positionStr":"#","positionCoord":[#, #],"originalType":"#","type":"#","colour":"#","spriteCoord":#},
                        {"pid":1,"alive":true,"numberMoves":0,"positionStr":"#","positionCoord":[#, #],"originalType":"#","type":"#","colour":"#","spriteCoord":#},
                        //repeat until each piece has a starting position
                    ]
            }
            this.gameStates.push(this.initGameState);
        }

        getPromotionConfigs(piece, str){ //holds information about piece promotions, feel free to add as much logic as you wish here
            var promotionConfigs = []
            switch(piece.type){
                case "#":
                    promotionConfigs.push({
                        type:"#",
                        spriteCoord:#
                    });
                    break;
                case "#":
                    promotionConfigs.push({
                        type:"#",
                        spriteCoord:#
                    });
                    break;
                //repeat until your promotion rules have been applied
            }
            return promotionConfigs;
        }

        getPieceMoves(piece, myOccupiedSquares, opponentOccupiedSquares){ //probably the most important function, this is where you apply rules of each piece to generate moves
            var moves;
            switch(piece.type) {
                //example piece moves for international chess
                // case "knight":
                //     return this.generatePositions(piece.positionCoord, [[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1]], "singular", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
                // case "rook":
                //     return this.generatePositions(piece.positionCoord, [[-1,0],[0,1],[1,0],[0,-1]], "plural", myOccupiedSquares, opponentOccupiedSquares, [-1,8,-1,8]);
                case "#":
                    return this.generatePositions(piece.positionCoord, [[#, #],[#, #]], "#", myOccupiedSquares, opponentOccupiedSquares, [#,#,#,#]);
                case "#":
                    return this.generatePositions(piece.positionCoord, [[#, #],[#, #]], "#", myOccupiedSquares, opponentOccupiedSquares, [#,#,#,#]);
                //repeat until each piece has moving rules associated with it
            }
        }
    }
```

<br />

Notes:

<br />

Note that subSizeX and subSizeY is the size of each piece inside the pieces concatenated image you have created, international chess example:  

<br />

![What subSizeX means][subsizeX]

<br />

For the piece coordinates, it should follow this format:

<br />

![The piece coordinates format][coordinates]

<br />

To add more complex logic you can modify the main Board class and the boardEventListener to control more advanced piece moves

This being said, I wish you the best in your creative adventure!

---
<a name="contributors"/>

## Contributors
_I am looking for contributors so please dm [me][email]!_

* [William Guerrand][website]
---
<a name="license"/>

## License & copyright

© [William Guerrand][website]	
Licensed under the [MIT LICENSE](LICENSE) 

I would like to mention that jquery is being used, read more about their license [here][license_jquery].



[license_jquery]: http://jquery.org/license
[website]: https://williamguerrand.com
[email]: mailto:guerrandw@gmail.com
[pieces]: https://i.ibb.co/WnGQBsx/Capture.jpg
[subsizeX]: https://i.ibb.co/0tmbZRP/Capture.jpg
[coordinates]: https://i.ibb.co/W61xmk6/Capture.jpg