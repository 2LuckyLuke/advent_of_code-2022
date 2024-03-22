"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var RpsValues;
(function (RpsValues) {
    RpsValues[RpsValues["ROCK"] = 1] = "ROCK";
    RpsValues[RpsValues["PAPER"] = 2] = "PAPER";
    RpsValues[RpsValues["SCISSORS"] = 3] = "SCISSORS";
})(RpsValues || (RpsValues = {}));
var RspResult;
(function (RspResult) {
    RspResult[RspResult["LOSE"] = 0] = "LOSE";
    RspResult[RspResult["DRAW"] = 3] = "DRAW";
    RspResult[RspResult["WIN"] = 6] = "WIN";
})(RspResult || (RspResult = {}));
function getGameFromString(stringGame) {
    var stringValues = stringGame.split(' ');
    var opponentValue;
    switch (stringValues[0]) {
        case 'A':
            opponentValue = RpsValues.ROCK;
            break;
        case 'B':
            opponentValue = RpsValues.PAPER;
            break;
        case 'C':
            opponentValue = RpsValues.SCISSORS;
            break;
        default:
            console.log('invalid String on 1');
            opponentValue = RpsValues.ROCK;
    }
    var playerValue;
    switch (stringValues[1]) {
        case 'X':
            playerValue = RpsValues.ROCK;
            break;
        case 'Y':
            playerValue = RpsValues.PAPER;
            break;
        case 'Z':
            playerValue = RpsValues.SCISSORS;
            break;
        default:
            console.log('invalid String on 2');
            playerValue = RpsValues.ROCK;
    }
    return { opponentValue: opponentValue, playerValue: playerValue };
}
function getGameResult(game) {
    var opponentValue = game.opponentValue, playerValue = game.playerValue;
    switch (true) {
        case opponentValue === playerValue:
            return RspResult.DRAW;
        case opponentValue === RpsValues.ROCK && playerValue === RpsValues.PAPER:
            return RspResult.WIN;
        case opponentValue === RpsValues.ROCK && playerValue === RpsValues.SCISSORS:
            return RspResult.LOSE;
        case opponentValue === RpsValues.PAPER && playerValue === RpsValues.ROCK:
            return RspResult.LOSE;
        case opponentValue === RpsValues.PAPER && playerValue === RpsValues.SCISSORS:
            return RspResult.WIN;
        case opponentValue === RpsValues.SCISSORS && playerValue === RpsValues.ROCK:
            return RspResult.WIN;
        case opponentValue === RpsValues.SCISSORS && playerValue === RpsValues.PAPER:
            return RspResult.LOSE;
        default:
            console.log('unexpected game values');
            return RspResult.LOSE;
    }
}
function getGameScore(game) {
    var score = 0;
    score += Number(getGameResult(game));
    return score + Number(game.playerValue);
}
/*---------Run code Below----------*/
var input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });
var individualGames = input.split('\r\n');
var games = [];
individualGames.forEach(function (stringGame) { return games.push(getGameFromString(stringGame)); });
var totalScore = 0;
games.forEach(function (game) { return (totalScore += getGameScore(game)); });
console.log(totalScore);
