import * as fs from 'fs';
import * as path from 'path';

interface Range {
    start: number;
    end: number;
}
interface Pair {
    firstRange: Range;
    secondRange: Range;
}

function getPairFromString(pairString: string): Pair {
    const stringRanges: string[] = pairString.split(',');
    const firstRangeString = stringRanges[0].split('-');
    const firstRange: Range = {
        start: Number(firstRangeString[0]),
        end: Number(firstRangeString[1])
    };
    const secondRangeString = stringRanges[1].split('-');
    const secondRange: Range = {
        start: Number(secondRangeString[0]),
        end: Number(secondRangeString[1])
    };
    const pair: Pair = { firstRange, secondRange };
    return pair;
}

function isPairOverlapping(pair: Pair): boolean {
    if (
        (pair.firstRange.end >= pair.secondRange.start && pair.firstRange.start <= pair.secondRange.end) ||
        (pair.secondRange.end >= pair.firstRange.start && pair.secondRange.start <= pair.firstRange.end)
    ) {
        return true;
    }
    return false;
}

function isRangeContained(pair: Pair): boolean {
    if (
        (pair.firstRange.start <= pair.secondRange.start && pair.firstRange.end >= pair.secondRange.end) ||
        (pair.secondRange.start <= pair.firstRange.start && pair.secondRange.end >= pair.firstRange.end)
    ) {
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
