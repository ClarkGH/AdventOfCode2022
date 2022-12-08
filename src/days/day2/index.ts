// Solution for problem 2, part 2: https://adventofcode.com/2022/day/2
// I didn't feel like posting both parts.

import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const STRATEGY_GUIDE = './input.txt'

export const rockPaperScissorsScore = (): number => {
    // Need to set up file/dir to read the files like node in es modules.
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    enum PointsMap {
        X = 1,
        Y = 2,
        Z = 3,
        WIN = 6,
        DRAW = 3,
        LOSE = 0,
    }

    // Example output: ['C Z', ...].
    const guideList = readFileSync(join(__dirname, STRATEGY_GUIDE), 'utf-8')
        .split(/\r?\n/);

    let estimatedScore = 0;

    guideList.forEach((roundPlays) => {
        const opponentPlay = roundPlays[0];
        const clientPlay = roundPlays[2];

        switch (opponentPlay) {
            case 'A':
                switch (clientPlay) {
                    case 'X':
                        estimatedScore += (PointsMap.LOSE + PointsMap.Z);
                        break;
                    case 'Y':
                        estimatedScore += (PointsMap.DRAW + PointsMap.X);
                        break;
                    case 'Z':
                        estimatedScore += (PointsMap.WIN + PointsMap.Y);
                        break;
                }
                break;
            case 'B':
                switch (clientPlay) {
                    case 'X':
                        estimatedScore += (PointsMap.LOSE + PointsMap.X);
                        break;
                    case 'Y':
                        estimatedScore += (PointsMap.DRAW + PointsMap.Y);
                        break;
                    case 'Z':
                        estimatedScore += (PointsMap.WIN + PointsMap.Z);
                        break;
                }
                break;
            case 'C':
                switch (clientPlay) {
                    case 'X':
                        estimatedScore += (PointsMap.LOSE + PointsMap.Y);
                        break;
                    case 'Y':
                        estimatedScore += (PointsMap.DRAW + PointsMap.Z);
                        break;
                    case 'Z':
                        estimatedScore += (PointsMap.WIN + PointsMap.X);
                        break;
                }
                break;
        }
    });

    return estimatedScore;
}
