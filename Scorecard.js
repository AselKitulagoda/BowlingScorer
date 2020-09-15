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
                    // cur_Frame.ReceiveShot(0);
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
    console.log(JSON.stringify(input_arr[9]));
    for (var k=0;k<input_arr[9].length;k++){
        if (input_arr[9][k] === 'x'){
            FinalFrame.receiveShots(10);
        }
        else if (input_arr[9][k] === '/'){
            FinalFrame.receiveShots(10-FinalFrame.firstShot);
        }
        else if (input_arr[9][k] === '-'){
            FinalFrame.receiveShots(0);
        }
        else {
            FinalFrame.receiveShots(Number(input_arr[9][k]));
        }
    }
    this.frames.push(FinalFrame);

};

Scorecard.prototype.sumAndEvaluateScores = function(){
    this.evaluateScores();
    console.log("after eval frames"+JSON.stringify(this.frames));
    var total = 0;
    for (var i=0;i<=9;i++){
        console.log(total);
     total += this.frames[i].score;
  }
    return total;
};

Scorecard.prototype.evaluateScores= function () {
    console.log("before frames"+JSON.stringify(this.frames));
    for (var i=0;i<9;i++){
      this.evaluateSpares(i);
      this.evaluateStrikes(i);
  }
};

Scorecard.prototype.evaluateSpares = function (i) {
    if (this.frames[i].isSpare()){
        this.frames[i].score += this.frames[i+1].firstShot;
    }
};

Scorecard.prototype.evaluateStrikes = function (i) {
    if (this.frames[i].isStrike()){
        console.log("Frame score" + this.frames[i].score + " First " + this.frames[i+1].firstShot+ " ," + this.evaluateSecondRoll(i))
        this.frames[i].score += (this.frames[i+1].firstShot + this.evaluateSecondRoll(i));
    }
};

Scorecard.prototype.evaluateSecondRoll = function (i) {
    return (this.frames[i+1].secondShot || this.frames[i+2].firstShot);
};
module.exports = Scorecard;