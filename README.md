# chesscreator
**Version 1.0.0**
A javascript library to easily integrate a chess board with custom chess piece rules into your website. Working examples for international chess and xiangqi is included and can be used for that sole purpose if you wish as well.

---

## Tutorial - Creating your own variant
### Files & folders
* _chesscreator.js_, the template file which should be used to create your chess variant.
* _chesscreator_international_, a working example for international chess 
* _chesscreator_international_, a working example for xiangqi
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
![Image of pieces][pieces]

### Step 3 - The script
Open _chesscreator.js_, most functions can be ignored except those with stars, but out of curiosity this is file structure:

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
Inside the YourChessVariant, enter all the necessary information about your variant:
![Screenshot of YourChessVariant class][class]
Notes:
<br />
Note that subSizeX and subSizeY is the size of each piece inside the pieces concatenated image you have created, international chess example:  
![What subSizeX means][subsizeX]
For the piece coordinates, it should follow this format:
![The piece coordinates format][coordinates]
To add more complex logic you can modify the main Board class and the boardEventListener to control more advanced piece moves


---

## Contributors
_I am looking for contributors so please dm [me][email]!_

* [William Guerrand][website]
---

## License & copyright

© [William Guerrand][website]	
Licensed under the [MIT LICENSE](LICENSE) 

I would like to mention that jquery is being used, read more about their license [here][license_jquery].



[license_jquery]: http://jquery.org/license
[website]: https://williamguerrand.com
[email]: mailto:guerrandw@gmail.com
[pieces]: https://i.ibb.co/WnGQBsx/Capture.jpg
[class]: https://i.ibb.co/1GgPTTX/Capture.jpg
[subsizeX]: https://i.ibb.co/0tmbZRP/Capture.jpg
[coordinates]: https://i.ibb.co/W61xmk6/Capture.jpg