var Frame = require("./Frame");
var FrameTen = require("./FrameTen");

function Scorecard() {
    this.frames = [];    
}

Scorecard.prototype.Initframes= function (input_arr) {
    for (var i=0;i<9;i++){
        var cur_Frame = new Frame();
        for (var j = 0;j<2;j++) {
            if (input_arr[i][j] !== "/") {
                if (input_arr[i][j] === "-"){
                    cur_Frame.ReceiveShot(0);
                    continue;
                }
                (input_arr[i][j] !== "x") ? cur_Frame.ReceiveShot(Number(input_arr[i][j])) :
                    cur_Frame.ReceiveShot(10);
            }
            else {
                cur_Frame.ReceiveShot((10-cur_Frame.firstShot));
            }

        }

        this.frames.push(cur_Frame);
    }
    var FinalFrame = new FrameTen();
    for (var k=0;k<3;k++){
        if (input_arr[9][k] === 'x'){
            FinalFrame.receiveShot(10);
        }
        else if (input_arr[9][k] === '/'){
            FinalFrame.receiveShot(10-FinalFrame.firstShot);
        }
        else if (input_arr[9][k] === '-'){
            FinalFrame.receiveShot(0);
        }
    }
    this.frames.push(FinalFrame);
    console.log("frames"+JSON.stringify(this.frames));

};

Scorecard.prototype.sumAndEvaluateScores = function(){
    this.evaluateScores();
    var total = 0;
    for (var i=0;i<=9;i++){
     total += this.frames[i].score;
  }
    return total;
};

Scorecard.prototype.evaluateScores= function () {
  for (var i=0;i<9;i++){
      this.evaluateSpares(i);
      this.evaluateStrikes(i);
  }
  this.evaluateStrikesAndSparesFrameTen(9);
};

Scorecard.prototype.evaluateSpares = function (i) {
    if (this.frames[i].isSpare()){
        this.frames[i].score += this.frames[i+1].firstShot;
    }
};

Scorecard.prototype.evaluateStrikes = function (i) {
    if (this.frames[i].isStrike()){
        this.frames[i].score += (this.frames[i+1].firstShot + this.evaluateSecondRoll(i));
    }
};

Scorecard.prototype.evaluateSecondRoll = function (i) {
    return (this.frames[i+1].secondShot || this.frames[i+2].firstShot);
};

Scorecard.prototype.evaluateStrikesAndSparesFrameTen = function (i) {
  if (this.frames[i].isStrike()){
      this.frames[i].score += this.frames[i].secondShot + this.frames[i].thirdShot;
  }
  if (this.frames[i].secondShot === 10){
      this.frames[i].score += this.frames[i].thirdShot;
  }
  if (this.frames[i].isSpare()){
      this.frames[i].score += this.frames[i].thirdShot;
  }


};

module.exports = Scorecard;