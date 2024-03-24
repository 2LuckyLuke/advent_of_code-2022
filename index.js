"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function getPriority(letter) {
    if (letter > 'Z') {
        return letter.charCodeAt(0) - 96;
    }
    return letter.charCodeAt(0) - 38;
}
function getRucksack(combinedRucksack) {
    var firstCompartment = combinedRucksack.slice(0, combinedRucksack.length / 2);
    var secondCompartment = combinedRucksack.slice(combinedRucksack.length / 2, combinedRucksack.length);
    return { first: firstCompartment, second: secondCompartment };
}
function findError(rucksack) {
    for (var i = 0; i < rucksack.first.length; i++) {
        if (rucksack.second.includes(rucksack.first.charAt(i))) {
            return rucksack.first.charAt(i);
        }
    }
    return 'no error found :|';
}
/*---------Run code Below----------*/
var input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });
var combinedRucksacks = input.split('\r\n');
var rucksacks = [];
combinedRucksacks.forEach(function (combinedRucksack) { return rucksacks.push(getRucksack(combinedRucksack)); });
var totalPriority = 0;
rucksacks.forEach(function (rucksack) { return (totalPriority += getPriority(findError(rucksack))); });
console.log(totalPriority);
