import * as fs from 'fs';
import * as path from 'path'

const input = fs.readFileSync(path.join(__dirname, './in.txt'), {
    encoding: 'utf-8'
})
console.log(input)

interface Elf {
    inventory: number[]
} 

const elfList: Elf[] = [];


