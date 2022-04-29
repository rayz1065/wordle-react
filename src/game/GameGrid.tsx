import React, { ReactElement } from 'react';
import { generateHints, MAX_GUESSES } from './utils';
import { WordleHint } from './WordleHint';

function Cell(props: { hint: WordleHint, letter: string }) {
  const { hint, letter } = props;
  const hintStr = hint ?? 'none';
  return (
    <div className={`text-2xl border-2 rounded border-black w-10 flex items-center justify-center h-10 hint-${hintStr}`}>
      {letter}
    </div>
  );
}

export class GameGrid extends React.Component {
  props: {
    guesses: string[],
    currentGuess: string,
    solution: string
  };

  getRowCells(word: string, rowIdx: number, isGuess: boolean): ReactElement[] {
    const hints = isGuess
      ? generateHints(word, this.props.solution)
      : Array(5).fill(null);
    const rowCells = word.padEnd(5).split('').map((letter, idx) => (
      <Cell hint={hints[idx]} letter={letter}
        key={rowIdx + ',' + idx}
      ></Cell>
    ));

    return rowCells;
  }

  render() {
    const rows = this.props.guesses.map((guess, rowIdx) =>
      this.getRowCells(guess, rowIdx, true));
    if(rows.length < MAX_GUESSES) {
      rows.push(this.getRowCells(this.props.currentGuess, rows.length, false));
    }
    while (rows.length < MAX_GUESSES) {
      rows.push(this.getRowCells('', rows.length, false));
    }
    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-2 py-1 min-w-fit">
          {rows.flat()}
        </div>
      </div>
    );
  }
}
