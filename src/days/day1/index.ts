import { readFileSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const ELVEN_CALORIES = './input.txt'

export const organizedElvenCalories = (): void => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const calorieTotalList: number[] = [];

    const calorieList = readFileSync(join(__dirname, ELVEN_CALORIES), 'utf-8')
        .split(/\r?\n/);

    for(let i = 0, j = 0; i < calorieList.length; i++) {
        if(calorieList[i] === '') {
            j++;
        } else {
            typeof calorieTotalList[j] === 'number'
                ? calorieTotalList[j] += Number(calorieList[i])
                : calorieTotalList[j] = Number(calorieList[i]);   
        }
    }

    calorieTotalList.sort((a, b) => {
        return b - a;
    });

    const mostCalories = calorieTotalList[0];
    const top3TotalCalories = calorieTotalList[0] + calorieTotalList[1] + calorieTotalList[2];
    
    console.log(`The elf with the most food has ${mostCalories} calories`);
    console.log(`The elves with the most food have a total of ${top3TotalCalories} calories`);
}
