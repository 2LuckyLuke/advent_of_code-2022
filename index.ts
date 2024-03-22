import * as fs from 'fs';
import * as path from 'path';

enum RpsValues {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
}

enum RspResults {
    LOSE = 0,
    DRAW = 3,
    WIN = 6
}

interface Game {
    opponentValue: RpsValues;
    playerValue: RpsValues;
}

function getPlayerMove(opponentValue: RpsValues, gameResult: RspResults): RpsValues {
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

function getGameFromString(stringGame: string): Game {
    const stringValues: string[] = stringGame.split(' ');
    let opponentValue: RpsValues;
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
    let gameResult: RspResults;
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
    return { opponentValue, playerValue: getPlayerMove(opponentValue, gameResult) };
}

function getGameResult(game: Game): RspResults {
    const { opponentValue, playerValue } = game;
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

function getGameScore(game: Game): number {
    let score: number = 0;
    score += Number(getGameResult(game));
    return score + Number(game.playerValue);
}

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });

const individualGames = input.split('\r\n');
const games: Game[] = [];
individualGames.forEach((stringGame) => games.push(getGameFromString(stringGame)));
let totalScore: number = 0;
games.forEach((game) => (totalScore += getGameScore(game)));
console.log(totalScore);
