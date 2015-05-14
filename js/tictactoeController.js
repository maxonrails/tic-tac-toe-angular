angular
    .module('tictactoeApp')
        .controller('tictactoeController', tictactoeController);

function tictactoeController(){

    var self = this;
    self.playerOneScore = 0;
    self.playerTwoScore = 0;
    self.message = "Let's the GAME of TTT begin!";
    self.messageTaken = "Hey I am taken!";
    self.messageOWin = "O Win!";
    self.messageXWin = "X Win!";
    self.toggle = true; //true will set text to X, false to O
    self.count = 0; //count number of click

    //getting array of object
    self.square = [

    {text: "" , throne: true} , {text: "", throne: true} , {text: "", throne: true},
    {text: "" , throne: true} , {text: "", throne: true} , {text: "", throne: true},
    {text: "" , throne: true} , {text: "", throne: true} , {text: "", throne: true},

    ];

    self.placeMove = function(i){
        if(self.square[i].text !== " "){
            sef.message = self.messageTaken;
        }else if(self.toggle === true) {
            self.square[i].text = "X";
            self.toggle = false;
        }else if(self.toggle === false){
            self.square[i].text = "O";
            self.toggle = true;
        }
        self.initCheckWinner();

    };

    self.initCheckWinner = function(){

        if(self.checkWinner( "X" )){
            self.message = self.messageXWin;
        }else if(self.checkWinner("O")){
            self.message = self.messageOWin;
        }
    };


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

    self.checkRow= function(a, b, c, move) {

        var result = false;

        if (self.getBox(a) == move &&
            self.getBox(b) == move &&
            self.getBox(c) == move){
                result = true;
        }

        return result;

    };

    self.getBox = function(i) {
        return self.square[i].text;
    };

}
