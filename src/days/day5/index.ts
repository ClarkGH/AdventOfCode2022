// Solution for Day 5: https://adventofcode.com/2022/day/5

import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

type CrateStack = string[];
type InstructionsList = [number, number, number][];

const CRATE_STACKS = './input.txt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = readFileSync(join(__dirname, CRATE_STACKS), 'utf-8')
    .split(/\r?\n/);

const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
};
    
// Create the stacks data structure to iterate through. O(n * m^2).
const getCrateStacksFromFile = (): CrateStack[] => {
    const stacks: CrateStack[] = [];

    for (let j = 1; j < file[0].length; j += 4) {
        let charList = [];
        let i = 0;
        
        if(isNumeric(file[i][j])) break;
        while(i < file.length) {
            if(isNumeric(file[i][j])) break;
            if(file[i][j] !== ' ') charList = [file[i][j], ...charList];
            i++;
        }

        stacks.push(charList);
    }

    return stacks;
};

/**
 * Create a list of instruction tuples. O(n).
 * Tuple format: [Number to move, move from column, move to column].
 * Ex. [1, 2, 3] will move 1 crate from position 2 to position 3.
 */
const getInstructionsFromFile = (): InstructionsList => {
    let instructions: InstructionsList = [];

    for (let i = 0; i < file.length; i++) {
        const instructionStringArray = file[i].split(' ');

        if (!instructionStringArray) return;

        const instruction1 = instructionStringArray[1];
        const instruction2 = instructionStringArray[3];
        const instruction3 = instructionStringArray[5];

        if (isNumeric(instruction1) && isNumeric(instruction2) && isNumeric(instruction3)) {
            instructions.push([Number(instruction1), Number(instruction2), Number(instruction3)]);
        }
    }

    return instructions;
};

// Part 1.
export const getTopCrates = (): Capitalize<string> => {
    const instructions = getInstructionsFromFile();
    const stacks = getCrateStacksFromFile();

    // Run through the list of instructions.
    instructions.forEach((instruction) => {
        let movesLeft = instruction[0];
        const moveFromIdx = instruction[1] - 1;
        const moveToIdx = instruction[2] - 1;

        while(movesLeft) {
            stacks[moveToIdx].push(stacks[moveFromIdx].pop());
            movesLeft--;
        }
    });

    // Get the top crate from each stack and return the string
    return stacks.map((stack) => {
        return stack[stack.length - 1];
    }).join('') as Capitalize<string>;
};

// Part 2.
export const haveCrateMover9001GetTopCrates = (): Capitalize<string> => {
    const instructions = getInstructionsFromFile();
    const stacks = getCrateStacksFromFile();

    // Same as Part 1, but this time I'm using a temp array.
    instructions.forEach((instruction) => {
        let movesLeft = instruction[0];
        const moveFromIdx = instruction[1] - 1;
        const moveToIdx = instruction[2] - 1;
        const crane9001Crates = [];

        while(movesLeft) {
            crane9001Crates.unshift(stacks[moveFromIdx].pop());
            movesLeft--;
        }

        crane9001Crates.forEach((crate) => {
            stacks[moveToIdx].push(crate);
        });
    });

    // Get the top crate from each stack and return the string
    return stacks.map((stack) => {
        return stack[stack.length - 1];
    }).join('') as Capitalize<string>;
};
