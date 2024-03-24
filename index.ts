import * as fs from 'fs';
import * as path from 'path';

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });

const individualGames = input.split('\r\n');
