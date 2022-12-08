// Solution for problem 3: https://adventofcode.com/2022/day/3
// Clean-up: consider using a class/enclosed scope and make re-usable methods
import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

type PriorityMap = Map<string, number>;

// Both solutions: O(n * m^2).
export const ruckSackinator = (): number => {
    const RUCKSACKS = './input1.txt'
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rucksackList = readFileSync(join(__dirname, RUCKSACKS), 'utf-8')
    .split(/\r?\n/);

    if (!rucksackList) return 0;

    const priorityMap: PriorityMap = new Map<string, number>;
    const recurringCharList: string[] = [];

    // [<character> : <priority>] Map.
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
        if (!rucksack) return;

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
            recurringCharList.push(char);
        }
    });

    // Sum priorities and return.
    return recurringCharList.reduce((acc, character) => {
        return acc + priorityMap.get(character);
    }, 0);
}

export const badginator = (): number => {
    const RUCKSACKS = './input2.txt'
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rucksackList = readFileSync(join(__dirname, RUCKSACKS), 'utf-8')
    .split(/\r?\n/);

    if (!rucksackList) return 0;

    const priorityMap: PriorityMap = new Map<string, number>;
    const recurringCharList: string[] = [];

    for(let i = 1; i <= 26; i++) {
        let char = String.fromCharCode(96 + i);

        priorityMap.set(char, i);
    }

    for(let i = 1; i <= 26; i++) {
        let char = String.fromCharCode(64 + i);

        priorityMap.set(char, i + 26);
    }

    // Compare every 3 strings
    for(let i = 0; i < rucksackList.length; i += 3) {
        const string1 = rucksackList[i];
        const string2 = rucksackList[i + 1];
        const string3 = rucksackList[i + 2];

        if (!string1 || !string2 || !string3) return;

        const recurringCharSet = new Set<string>;

        // If the three strings share a character, add to the set.
        for(let j = 0; j < string1.length; j++) {
            const char = string1[j];

            if(string2.includes(char) && string3.includes(char)) {
                recurringCharSet.add(string1[j]);
            }
        }

        // Empty the set into the list of recurring characters.
        for (let char of recurringCharSet) {
            recurringCharList.push(char);
        }
    }

    // Sum priorities and return.
    return recurringCharList.reduce((acc, character) => {
        return acc + priorityMap.get(character);
    }, 0);
}
