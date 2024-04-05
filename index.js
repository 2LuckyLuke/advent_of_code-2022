"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getPairFromString(pairString) {
    const stringRanges = pairString.split(',');
    const firstRangeString = stringRanges[0].split('-');
    const firstRange = {
        start: Number(firstRangeString[0]),
        end: Number(firstRangeString[1])
    };
    const secondRangeString = stringRanges[1].split('-');
    const secondRange = {
        start: Number(secondRangeString[0]),
        end: Number(secondRangeString[1])
    };
    const pair = { firstRange, secondRange };
    return pair;
}
function isPairOverlapping(pair) {
    if ((pair.firstRange.end >= pair.secondRange.start && pair.firstRange.start <= pair.secondRange.end) ||
        (pair.secondRange.end >= pair.firstRange.start && pair.secondRange.start <= pair.firstRange.end)) {
        return true;
    }
    return false;
}
function isRangeContained(pair) {
    if ((pair.firstRange.start <= pair.secondRange.start && pair.firstRange.end >= pair.secondRange.end) ||
        (pair.secondRange.start <= pair.firstRange.start && pair.secondRange.end >= pair.firstRange.end)) {
        return true;
    }
    return false;
}
/*---------Run code Below----------*/
const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });
const pairStrings = input.split('\n');
const pairs = pairStrings.map((pairString) => getPairFromString(pairString));
let totalContainedPairs = 0;
for (let i = 0; i < pairs.length; i++) {
    if (isPairOverlapping(pairs[i])) {
        totalContainedPairs += 1;
    }
}
console.log(totalContainedPairs);
