// Solution for problem 3: https://adventofcode.com/2022/day/3
import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

type PriorityMap = Map<string, number>;
const RUCKSACKS = './input.txt'

export const ruckSackinator = (): number => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rucksackList = readFileSync(join(__dirname, RUCKSACKS), 'utf-8')
    .split(/\r?\n/);

    if (!rucksackList) return 0;

    const priorityMap: PriorityMap = new Map<string, number>;
    const recurringCharacterList: string[] = [];

    // [<character> : <priority>] Map, O(n * m^2).
    for(let i = 1; i <= 26; i++) {
        let char = String.fromCharCode(96 + i);

        priorityMap.set(char, i);
    }

    for(let i = 1; i <= 26; i++) {
        let char = String.fromCharCode(64 + i);

        priorityMap.set(char, i + 26);
    }

    // Iterate through each ruckSack.
    rucksackList.forEach((rucksack: string) => {
        if (!rucksack) return '';

        const rightCompartment = Math.floor(rucksack.length / 2);
        const recurringCharSet = new Set<string>;

        // Iterate through right half and check against the left.
        for (let i = rightCompartment; i < rucksack.length; i++) {
            // If the first half of the string has the character, add it to the set.
            if(rucksack.substring(0, rightCompartment).includes(rucksack[i])) {
                recurringCharSet.add(rucksack[i]);
            }
        }

        // Empty the set into the list of recurring characters.
        for (let char of recurringCharSet) {
            recurringCharacterList.push(char);
        }
    });

    // Sum up the priorities.
    const sum = recurringCharacterList.reduce((acc, character) => {
        return acc + priorityMap.get(character);
    }, 0);

    return sum;
}
