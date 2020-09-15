var Frame = require("Frame");

function FrameTen() {
    this.thirdShot = null;
    this.isFrame10 = true;
}

FrameTen.prototype = new Frame();

FrameTen.prototype.receiveShot = function (hitPins) {
    if (this.isSpare() || this.isStrike() && this.shotCount === 3){
        throw new Error("You cannot receive another shot")
    }
    if (!this.isSpare() && !this.isStrike() && this.shotCount === 2){
        throw new Error("You cannot receive another shot")
    }
    this.updateFrameVariables(hitPins);
    this.shotCount++;
    
};

FrameTen.prototype.updateFrameVariables = function (hitPins) {
    this.resetPins(hitPins);
    this.score += hitPins;
    this.assignShot(hitPins);

};

FrameTen.prototype.resetPins = function (hitPins) {
  if (hitPins === 10 || (this.firstShot + this.secondShot) === 10){
      this.pinCount= 10;
  }
  else {
      this.pinCount -= hitPins;
  }
};

FrameTen.prototype.assignShot = function (hitPins) {
    (this.firstShot == null) ? this.firstShot = hitPins : (this.secondShot == null) ? this.secondShot = hitPins
        : this.thirdShot = hitPins;

}
