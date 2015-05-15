angular
    .module('tictactoeApp')
        .controller('tictactoeController', tictactoeController);

function tictactoeController(){

    var self = this;
    self.playerOneScore = 0;
    self.playerTwoScore = 0;
    self.drawScore = 0;
    self.message = "Let the GAME begin!";
    //true will set text to X, false to O
    self.toggle = true;
    //count number of click
    self.count = 0;

    //setting up 3x3 boxes
    self.square = [

        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false},
        {text: "" , house: false, house2: false}
    ]; //alternate move between X and O

    self.placeMove = function(i){

        if(self.message == "Let the GAME begin!" ||
           self.message == "This castle is occupied!" ||
           self.message == "Winter is coming!"){
            if(self.square[i].text !== ""){
                self.message = "This castle is occupied!";
            }else if(self.toggle === true) {
                self.square[i].text = "X";
                self.square[i].house = true;
                self.square[i].stark = true;
                self.toggle = false;
                self.count++;
            }else if(self.toggle === false){
                self.square[i].text = "O";
                self.square[i].house2 = true;
                self.toggle = true;
                self.count++;
            }
            if (self.count > 4){
                self.initCheckWinner();
            }
        }

    };

    /*running to see if there is a winner, if there is passage
    in message accordingly */
    self.initCheckWinner = function(){

        if(self.checkWinner( "X" )){
            self.message = "House of Stark win!";

            self.playerOneScore++;
        }else if(self.checkWinner("O")){
            self.message = "House of Lannister win!";
            self.playerTwoScore++;
        }else if(self.count === 9){
            self.message = "Draw Game!";
            self.drawScore++;
        }

    };

    //clear all squares, game start     over!
    self.newGame = function(){

        for(var j= 0; j < self.square.length; j++){
            self.square[j].text ="";
            self.square[j].house = false;
            self.square[j].house2 = false;
            self.message = "Winter is coming!";
            self.count = 0;
        }
    };

    self.resetAll = function(){

        self.playerOneScore = 0;
        self.playerTwoScore = 0;
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
        return self.square[i].text;
    };

}
