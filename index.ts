import * as fs from 'fs';
import * as path from 'path';

interface Stack {
    crates: string[];
}

interface Instruction {
    start: number;
    goal: number;
    amount: number;
}

function parseStacks(stackListString: string): Stack[] {
    const stacks: Stack[] = [];
    const collumns = stackListString.split('\n');
    while (collumns[0].length >= 2) {
        const singleStack: Stack = { crates: [] };
        collumns.forEach((collumn, index) => {
            const firstLetter = collumn.charAt(1);
            if (firstLetter === ' ' || Number.isInteger(Number(firstLetter))) {
                collumns[index] = collumn.slice(4);
                return;
            }
            singleStack.crates.unshift(firstLetter);
            collumns[index] = collumn.slice(4);
        });
        stacks.push(singleStack);
    }
    return stacks;
}

function parseInstructions(instructionList: string): Instruction[] {
    return instructionList.split('\n').map((stringInstruction) => {
        const instructionWords = stringInstruction.split(' ');

        return {
            amount: Number(instructionWords[1]),
            start: Number(instructionWords[3]) - 1,
            goal: Number(instructionWords[5]) - 1
        };
    });
}

function executeInstruction(stacks: Stack[], instruction: Instruction): Stack[] {
    for (let i = 0; i < instruction.amount; i++) {
        stacks[instruction.goal].crates.push(stacks[instruction.start].crates.pop() ?? 'no element');
    }
    return stacks;
}

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });

const inputs = input.split('\n\n');
let stacks = parseStacks(inputs[0]);
const instructions = parseInstructions(inputs[1]);
instructions.forEach((instruction) => (stacks = executeInstruction(stacks, instruction)));
console.log(stacks);
