import { WordleHint } from './WordleHint';
import words from '../data/words.json';

export type KeyboardHints = { [key: string]: WordleHint };

export function getKeyboardHints(guesses: string[], solution: string): KeyboardHints {
  const keyboardHints: KeyboardHints = {};
  const hintValue = {
    [WordleHint.WRONG]: 0,
    [WordleHint.MISPLACED]: 1,
    [WordleHint.CORRECT]: 2,
  };
  guesses.forEach(guess => {
    const hints = generateHints(guess, solution);
    for(let i = 0; i < 5; i+= 1) {
      // keeps the most valuable hint
      const letter = guess[i];
      const currHint = keyboardHints[letter];
      const newHint = hints[i];
      if(currHint === undefined || hintValue[currHint] < hintValue[newHint]) {
        keyboardHints[letter] = newHint;
      }
    }
  });
  return keyboardHints;
}

export function generateHints(guess: string, solution: string): WordleHint[] {
  const usedG = Array(5).fill(false);
  const usedS = Array(5).fill(false);
  const letterHints = Array(5).fill(WordleHint.WRONG);

  // correct letters
  for(let i = 0; i < 5; i+= 1) {
    if(guess[i] === solution[i]) {
      usedG[i] = usedS[i] = true;
      letterHints[i] = WordleHint.CORRECT;
    }
  }

  // misplaced letters
  for(let i = 0; i < 5; i+= 1) {
    for(let j = 0; j < 5; j+= 1) {
      if(guess[i] === solution[j] && !usedG[i] && !usedS[j]) {
        usedG[i] = usedS[j] = true;
        letterHints[i] = WordleHint.MISPLACED;
      }
    }
  }

  return letterHints;
}

export const MAX_GUESSES = 6;

export function getSolutions() {
  return words.filter(x => x.is_solution);
}

export function isSolution(word: string) {
  return words.find(x => x.word.toUpperCase() === word.toUpperCase());
}

export function getRandomSolution(): string {
  const solutions = getSolutions();
  return solutions[Math.floor(Math.random() * solutions.length)].word.toUpperCase();
}
