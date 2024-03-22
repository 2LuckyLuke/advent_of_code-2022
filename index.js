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
var RspResults;
(function (RspResults) {
    RspResults[RspResults["LOSE"] = 0] = "LOSE";
    RspResults[RspResults["DRAW"] = 3] = "DRAW";
    RspResults[RspResults["WIN"] = 6] = "WIN";
})(RspResults || (RspResults = {}));
function getPlayerMove(opponentValue, gameResult) {
    switch (true) {
        case gameResult === RspResults.DRAW:
            return opponentValue;
        case opponentValue === RpsValues.ROCK && gameResult === RspResults.WIN:
            return RpsValues.PAPER;
        case opponentValue === RpsValues.PAPER && gameResult === RspResults.WIN:
            return RpsValues.SCISSORS;
        case opponentValue === RpsValues.SCISSORS && gameResult === RspResults.WIN:
            return RpsValues.ROCK;
        case opponentValue === RpsValues.ROCK && gameResult === RspResults.LOSE:
            return RpsValues.SCISSORS;
        case opponentValue === RpsValues.PAPER && gameResult === RspResults.LOSE:
            return RpsValues.ROCK;
        case opponentValue === RpsValues.SCISSORS && gameResult === RspResults.LOSE:
            return RpsValues.PAPER;
        default:
            console.log('unexpected player move');
            return RpsValues.ROCK;
    }
}
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
    var gameResult;
    switch (stringValues[1]) {
        case 'X':
            gameResult = RspResults.LOSE;
            break;
        case 'Y':
            gameResult = RspResults.DRAW;
            break;
        case 'Z':
            gameResult = RspResults.WIN;
            break;
        default:
            console.log('invalid String on 2');
            gameResult = RspResults.LOSE;
    }
    return { opponentValue: opponentValue, playerValue: getPlayerMove(opponentValue, gameResult) };
}
function getGameResult(game) {
    var opponentValue = game.opponentValue, playerValue = game.playerValue;
    switch (true) {
        case opponentValue === playerValue:
            return RspResults.DRAW;
        case opponentValue === RpsValues.ROCK && playerValue === RpsValues.PAPER:
            return RspResults.WIN;
        case opponentValue === RpsValues.ROCK && playerValue === RpsValues.SCISSORS:
            return RspResults.LOSE;
        case opponentValue === RpsValues.PAPER && playerValue === RpsValues.ROCK:
            return RspResults.LOSE;
        case opponentValue === RpsValues.PAPER && playerValue === RpsValues.SCISSORS:
            return RspResults.WIN;
        case opponentValue === RpsValues.SCISSORS && playerValue === RpsValues.ROCK:
            return RspResults.WIN;
        case opponentValue === RpsValues.SCISSORS && playerValue === RpsValues.PAPER:
            return RspResults.LOSE;
        default:
            console.log('unexpected game values');
            return RspResults.LOSE;
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
