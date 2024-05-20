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
function parseStacks(stackListString) {
    const stacks = [];
    const collumns = stackListString.split('\n');
    while (collumns[0].length >= 2) {
        const singleStack = { crates: [] };
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
function parseInstructions(instructionList) {
    return instructionList.split('\n').map((stringInstruction) => {
        const instructionWords = stringInstruction.split(' ');
        return {
            amount: Number(instructionWords[1]),
            start: Number(instructionWords[3]) - 1,
            goal: Number(instructionWords[5]) - 1
        };
    });
}
function executeInstruction(stacks, instruction) {
    var _a, _b;
    const tempStack = { crates: [] };
    for (let i = 0; i < instruction.amount; i++) {
        tempStack.crates.push((_a = stacks[instruction.start].crates.pop()) !== null && _a !== void 0 ? _a : 'no element');
    }
    for (let i = 0; i < instruction.amount; i++) {
        stacks[instruction.goal].crates.push((_b = tempStack.crates.pop()) !== null && _b !== void 0 ? _b : 'no element');
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
