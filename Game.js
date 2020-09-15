var fs = require('fs');
var lines = fs.readFileSync('input.txt', 'utf8').split("\n");

var result = [];
for(var i = 0; i < lines.length; i++) {
    //push each line as an array of numbers
    result.push(lines[i].trim().split(" "));
    // ^ convert items to integer
}

console.log(JSON.stringify(result));