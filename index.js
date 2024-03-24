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
function findGroupBadge(rucksacksOfGroup) {
    for (var i = 0; i < rucksacksOfGroup[0].length; i++) {
        if (rucksacksOfGroup[1].includes(rucksacksOfGroup[0].charAt(i)) &&
            rucksacksOfGroup[2].includes(rucksacksOfGroup[0].charAt(i))) {
            return rucksacksOfGroup[0].charAt(i);
        }
    }
    return 'no error found :|';
}
/*---------Run code Below----------*/
var input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });
var combinedRucksacks = input.split('\r\n');
var groups = [];
for (var i = 0; i < combinedRucksacks.length; i++) {
    groups.push([combinedRucksacks[i], combinedRucksacks[i + 1], combinedRucksacks[i + 2]]);
    i += 2;
}
var totalPriority = 0;
groups.forEach(function (group) { return (totalPriority += getPriority(findGroupBadge(group))); });
console.log(totalPriority);
