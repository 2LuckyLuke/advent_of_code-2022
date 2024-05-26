import * as fs from 'fs';
import * as path from 'path';

function isSequenceDiffrent(a: string, b: string, c: string, d: string): boolean {
    if (a === b || a === c || a === d || b === c || b === d || c === d) {
        return false;
    }
    return true;
}

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });

for (let i = 0; i < input.length - 3; i++) {
    if (isSequenceDiffrent(input.charAt(i), input.charAt(i + 1), input.charAt(i + 2), input.charAt(i + 3))) {
        console.log(i + 4);
        i = input.length;
    }
}
