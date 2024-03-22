import * as fs from 'fs';
import * as path from 'path';

enum RpsValues {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
}

enum RspResult {
    LOSE = 0,
    DRAW = 3,
    WIN = 6
}

interface Game {
    opponentValue: RpsValues;
    playerValue: RpsValues;
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
    let playerValue: RpsValues;
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
    return { opponentValue, playerValue };
}

function getGameResult(game: Game): RspResult {
    const { opponentValue, playerValue } = game;
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
