import * as fs from 'fs';
import * as path from 'path'

interface Elf {
    inventory: number[]
} 

function getMaxCaloriesOnElf(elfs: Elf[]): number{
    let maxCaloriesOnElf: number = 0;
    elfs.forEach((elf) => {
        const currentTotal = getTotalCaloriesOnElf(elf)
        maxCaloriesOnElf = currentTotal > maxCaloriesOnElf ? currentTotal : maxCaloriesOnElf;
    })
    
    return maxCaloriesOnElf
}

function getTotalCaloriesOnElf(elf: Elf): number {
    let totalCaloriesOnElf: number = 0;
    elf.inventory.forEach((calorie) => totalCaloriesOnElf += calorie)
        
    return totalCaloriesOnElf;
}
/*---------Run code Below----------*/

const input = fs.readFileSync(path.join(__dirname, './in.txt'), {
    encoding: 'utf-8'
})

const inventoryStrings = input.split("\n\n");

const elfList: Elf[] = inventoryStrings.map((elfString) =>{
    return {
        inventory: elfString.split("\n").map((singleString) => Number(singleString))
    }
})

const maxCaloriesOnElf = getMaxCaloriesOnElf(elfList);
fs.writeFileSync('out.txt', String(maxCaloriesOnElf))