var fs = require('fs');
var lines = fs.readFileSync('./inputs/input.txt', 'utf8').split("\n");

var Scorecard = require('./Scorecard.js');

var result = [];
for(var i = 0; i < lines.length; i++) {
    //push each line as an array of numbers
    result.push(lines[i].trim().split(" "));
    // ^ convert items to integer
}
// console.log(JSON.stringify(result));

var newScore = new Scorecard();
newScore.Initframes(result);
console.log(newScore.sumAndEvaluateScores());

// console.log(JSON.stringify(result));

