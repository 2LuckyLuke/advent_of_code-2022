import * as fs from 'fs';
import * as path from 'path';

interface Rucksack {
    first: string;
    second: string;
}

function getPriority(letter: string): number {
    if (letter > 'Z') {
        return letter.charCodeAt(0) - 96;
    }
    return letter.charCodeAt(0) - 38;
}

function getRucksack(combinedRucksack: string): Rucksack {
    const firstCompartment = combinedRucksack.slice(0, combinedRucksack.length / 2);
    const secondCompartment = combinedRucksack.slice(combinedRucksack.length / 2, combinedRucksack.length);

    return { first: firstCompartment, second: secondCompartment };
}

function findError(rucksack: Rucksack): string {
    for (let i = 0; i < rucksack.first.length; i++) {
        if (rucksack.second.includes(rucksack.first.charAt(i))) {
            return rucksack.first.charAt(i);
        }
    }
    return 'no error found :|';
}

function findGroupBadge(rucksacksOfGroup: string[]): string {
    for (let i = 0; i < rucksacksOfGroup[0].length; i++) {
        if (
            rucksacksOfGroup[1].includes(rucksacksOfGroup[0].charAt(i)) &&
            rucksacksOfGroup[2].includes(rucksacksOfGroup[0].charAt(i))
        ) {
            return rucksacksOfGroup[0].charAt(i);
        }
    }
    return 'no error found :|';
}

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });

const combinedRucksacks: string[] = input.split('\r\n');
const groups: string[][] = [];
for (let i = 0; i < combinedRucksacks.length; i++) {
    groups.push([combinedRucksacks[i], combinedRucksacks[i + 1], combinedRucksacks[i + 2]]);
    i += 2;
}

let totalPriority = 0;
groups.forEach((group) => (totalPriority += getPriority(findGroupBadge(group))));
console.log(totalPriority);
