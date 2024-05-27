import * as fs from 'fs';
import * as path from 'path';

function isSequenceDiffrent(sequence: string): boolean {
    for (let i = 0; i < sequence.length; i++) {
        const cutSequence = sequence.replace(new RegExp(`${sequence.charAt(i)}`, 'g'), '');
        if (cutSequence.length < sequence.length - 1) {
            return false;
        }
    }
    console.log(sequence);
    return true;
}

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });

const messageLength = 14;

for (let i = 0; i < input.length - (messageLength - 1); i++) {
    if (isSequenceDiffrent(input.substring(i, i + messageLength))) {
        console.log(i + messageLength);
        i = input.length;
    }
}
