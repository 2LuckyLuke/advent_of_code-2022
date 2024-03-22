import * as fs from 'fs';
import * as path from 'path'

interface Elf {
    inventory: number[]
}

/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), {
    encoding: 'utf-8'
})

const elfList: Elf[] = [];


