console.log("Frame init")

function Frame() {
    this.pinCount = 10;
    this.shotCount = 0;
    this.firstShot = null;
    this.secondShot = null;
    this.score = 0;
}

Frame.prototype.isSpare = function () {
    if (this.secondShot != null && this.firstShot !== 10 && ((this.firstShot+this.secondShot) === 10)){
        return true;
    }
};

Frame.prototype.isStrike = function () {
    if (this.firstShot === 10) {
        return true;
    }
};

Frame.prototype.ReceiveShot = function (hitPins) {
    if (this.shotCount > 2)
        throw new Error("Can't have more than 2 shots");
    if (this.pinCount-hitPins<0)
        throw new Error("Can't hit more than 10 pins");
    this.pinCount -= hitPins;
    this.score += hitPins;
    (this.firstShot == null) ? this.firstShot = hitPins : this.secondShot = hitPins;
    this.shotCount++;
};

module.exports = Frame;