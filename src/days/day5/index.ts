// Solution for Day 4, part 2: https://adventofcode.com/2022/day/4

import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const CRATE_STACKS = './input.txt'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = readFileSync(join(__dirname, CRATE_STACKS), 'utf-8');

export const getListOfTopCrates = () => {
    return file.indexOf('');
}
