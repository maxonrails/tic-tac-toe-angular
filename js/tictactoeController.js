angular
    .module('tictactoeApp')
        .controller('TicTacToeController', TicTacToeController);

TicTacToeController.$inject = ['$firebaseObject'];

function TicTacToeController($firebaseObject){

    var self = this;

    self.gameBoard = function(){
    var ref = new Firebase("https://tictactoemaxwdi.firebaseio.com");
        var gameBoard = $firebaseObject(ref);
        return gameBoard;
    }();

    //setting up 3x3 boxes
    self.gameBoard.$loaded(function () {

        self.resetAll();
        self.gameBoard.message = "Let the GAME begin!";
        self.gameBoard.squares = [

        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false}
    ] ;
    self.gameBoard.$save();
    });

    //to place move between X, O by toggling between X and O;
    self.placeMove = function(i){

        if(self.gameBoard.message == "Let the GAME begin!" ||
           self.gameBoard.message == "This castle is occupied!" ||
           self.gameBoard.message == "Let  the  battle  rage!" ||
           self.gameBoard.message == "Fight on!") {

            if(self.gameBoard.squares[i].text !== ""){
                self.gameBoard.message = "This castle is occupied!";
                self.gameBoard.$save(self.gameBoard.message);

            }else if(self.gameBoard.toggle === true) {
                self.gameBoard.squares[i].text = "X";
                self.gameBoard.$save(self.gameBoard.squares[i].text);

                self.gameBoard.squares[i].house = true;
                self.gameBoard.$save(self.gameBoard.squares[i].house);

                self.gameBoard.message = "Let  the  battle  rage!";
                self.gameBoard.$save(self.gameBoard.message);

                self.gameBoard.toggle = false;
                self.gameBoard.$save(self.gameBoard.toogle);

                self.gameBoard.count++;
                self.gameBoard.$save(self.gameBoard.count);

            }else if(self.gameBoard.toggle === false){
                self.gameBoard.squares[i].text = "O";
                self.gameBoard.$save(self.gameBoard.squares[i].text);

                self.gameBoard.squares[i].house2 = true;
               self.gameBoard.$save(self.gameBoard.squares[i].house2);

                self.gameBoard.message = "Let  the  battle  rage!";
                self.gameBoard.$save(self.gameBoard.message);

                self.gameBoard.toggle = true;
                self.gameBoard.$save(self.gameBoard.toogle);

                self.gameBoard.count++;
                self.gameBoard.$save(self.gameBoard.count);
            }
            if (self.gameBoard.count > 4){
                self.initCheckWinner();
            }
        }

    };

    /*running to see if there is a winner, if there is passage
    in message accordingly */
    self.initCheckWinner = function(){

        if(self.checkWinner( "X" )){
            self.gameBoard.message = "Winter is coming!";
            self.gameBoard.$save(self.gameBoard.message);

            self.gameBoard.playerOneScore++;
            self.gameBoard.$save(self.gameBoard.playerOneScore);

        }else if(self.checkWinner("O")){
            self.gameBoard.message = "Hear me roar!";
            self.gameBoard.$save(self.gameBoard.message);

            self.gameBoard.playerTwoScore++;
            self.gameBoard.$save(self.gameBoard.playerTwoScore);

        }else if(self.gameBoard.count === 9){
            self.gameBoard.message = "Draw Game!";
            self.gameBoard.$save(self.gameBoard.message);

            self.gameBoard.drawScore++;
            self.gameBoard.$save(self.gameBoard.drawScore);
        }

    };

    //clear all squares, game start over!
    self.newGame = function(){

        for(var i= 0; i < self.gameBoard.squares.length; i++){

            self.gameBoard.squares[i].text ="";
            self.gameBoard.$save(self.gameBoard.squares[i].text);

            self.gameBoard.squares[i].house = false;
            self.gameBoard.$save(self.gameBoard.squares[i].house);

            self.gameBoard.squares[i].house2 = false;
            self.gameBoard.$save(self.gameBoard.squares[i].house2);

            self.gameBoard.message = "Fight on!";
            self.gameBoard.$save(self.gameBoard.message);

            self.gameBoard.count = 0;
            self.gameBoard.$save(self.gameBoard.count);
        }
    };

    self.resetAll = function(){

        self.gameBoard.playerOneScore = 0;
        self.gameBoard.$save(self.gameBoard.playerOneScore);

        self.gameBoard.playerTwoScore = 0;
        self.gameBoard.$save(self.gameBoard.playerTwoScore);

        self.gameBoard.drawScore = 0;
        self.gameBoard.$save(self.gameBoard.drawScore);

        self.gameBoard.count = 0;
        self.gameBoard.$save(self.gameBoard.count);

        self.newGame();

    };


    /*check for winning combinations. verticle connects (3 possible)
    diagnal (2 possible) and horizontal (3 possible) There are 8 possible
    way to win*/
    self.checkWinner =function(move){

        var result = false;
        if (self.checkRow (0 ,1, 2, move) ||
            self.checkRow (3, 4, 5, move) ||
            self.checkRow (6, 7, 8, move) ||
            self.checkRow (0, 3, 6, move) ||
            self.checkRow (1, 4, 7, move) ||
            self.checkRow (2, 5, 8, move) ||
            self.checkRow (0,  4, 8, move) ||
            self.checkRow (2, 4, 6, move) ){
                result = true;
        }
        return result;

    };
    //compare indext a, b, c, move are equal this is true
    self.checkRow= function(a, b, c, move) {

        var result = false;

        if (self.getBox(a) == move &&
            self.getBox(b) == move &&
            self.getBox(c) == move){
                result = true;
        }

        return result;

    };

    //return the index number from array
    self.getBox = function(i) {
        return self.gameBoard.squares[i].text;
    };

}

