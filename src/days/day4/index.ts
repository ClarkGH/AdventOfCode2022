// Solution for Day 4, part 2: https://adventofcode.com/2022/day/4

import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

type Range = [string, string];

const CAMP_ASSIGNMENTS = './input.txt'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assignmentPairsList = readFileSync(join(__dirname, CAMP_ASSIGNMENTS), 'utf-8')
    .split(/\r?\n/); // List of assignments. Length N.

export const countEnclosingCampAssignments = (): number => {
    if (!assignmentPairsList) return 0;

    /**
     * Example assignment: '17-20,18-19'.
     * 
     * In example case:
     * 17 is the start of the first assignment.
     * 20 is the end of the first assignment.
     * 18 is the start of the second assignment.
     * 19 is the end of the second assignment.
     * 
     * In every case:
     * IF an assignments start is GREATER than or EQUAL to the other assignment's start.
     * AND if the SAME assignments end is LESS than or EQUAL to the other assignment's end.
     * It is fully contained.
     */

    return assignmentPairsList.reduce((acc, assignmentPairs): number => {
        const [assignment1, assignment2]: Range = assignmentPairs.split(',') as Range;
        const [assignment1Left, assignment1Right]: Range = assignment1.split('-') as Range;
        const [assignment2Left, assignment2Right]: Range = assignment2.split('-') as Range;
        const assignment1Contains2 = parseInt(assignment1Left) <= parseInt(assignment2Left) && parseInt(assignment1Right) >= parseInt(assignment2Right);
        const assignment2Contains1 = parseInt(assignment1Left) >= parseInt(assignment2Left) && parseInt(assignment1Right) <= parseInt(assignment2Right);

        if (assignment1Contains2 || assignment2Contains1) {
            return acc + 1;
        }

        return acc + 0;
    }, 0);
}

export const countOverlappingCampAssignments = (): number => {
    if (!assignmentPairsList) return 0;

    /**
     * Example assignment: '17-20,18-19'.
     * 
     * In example case:
     * 17 is the start of the first assignment.
     * 20 is the end of the first assignment.
     * 18 is the start of the second assignment.
     * 19 is the end of the second assignment.
     * 
     * In every case:
     * IF an assignment's start is LESS THAN OR EQUAL to the other assignment's end
     * AND if the assignment's end is GREATER THAN OR EQUAL to the other assignments start
     * 
     * It is overlapping.
     */

    return assignmentPairsList.reduce((acc, assignmentPairs): number => {
        const [assignment1, assignment2]: Range = assignmentPairs.split(',') as Range;
        const [assignment1Left, assignment1Right]: Range = assignment1.split('-') as Range;
        const [assignment2Left, assignment2Right]: Range = assignment2.split('-') as Range;
        const assignmentsOverlap = parseInt(assignment1Left) <= parseInt(assignment2Right) && parseInt(assignment1Right) >= parseInt(assignment2Left) || parseInt(assignment2Left) <= parseInt(assignment1Right) && parseInt(assignment2Right) >= parseInt(assignment1Left);

        if (assignmentsOverlap) {
            return acc + 1;
        }

        return acc + 0;
    }, 0);
}
