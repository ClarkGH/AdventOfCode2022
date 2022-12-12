// Solution for Day 6: https://adventofcode.com/2022/day/6

import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const CRATE_STACKS = './input.txt';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const charArr = readFileSync(join(__dirname, CRATE_STACKS), 'utf-8').split('');

export const packetProcessor= (): number => {
    for (let i = 3; i < charArr.length; i++) {
        const last4Characters = charArr.slice(i - 4, i),
            asSet = new Set(last4Characters);
      
        if (asSet.size === 4) {
          return i;
        }
      }
}

export const messageProcessor= (): number => {
    for (let i = 13; i < charArr.length; i++) {
        const last4Characters = charArr.slice(i - 14, i),
            asSet = new Set(last4Characters);
      
        if (asSet.size === 14) {
          return i;
        }
      }
}
