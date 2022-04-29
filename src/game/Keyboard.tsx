import React from 'react';
import { KeyboardHints } from './utils';

export class Keyboard extends React.Component {
  props: {
    hints: KeyboardHints,
    onKeyPress: (key: string) => void,
    onEnterPress: () => void,
    onBackPress: () => void,
  };

  renderKey(letter: string) {
    const hintClass = this.props.hints[letter] ?? 'none';
    return (
      <button key={letter}
        className={`h-10 w-8 border border-black rounded flex justify-center items-center hint-${hintClass}`}
        onClick={() => { this.props.onKeyPress(letter); }}>
        {letter}
      </button>
    );
  }

  renderEnterKey() {
    return (
      <button key="enter"
        className="h-10 w-12 border border-black rounded flex justify-center items-center text-sm bg-green-300"
        onClick={() => { this.props.onEnterPress(); }}>
        ENTER
      </button>
    );
  }

  renderBackspaceKey() {
    return (
      <button key="back"
        className="h-10 w-12 border border-black rounded flex justify-center items-center text-sm bg-red-400"
        onClick={() => { this.props.onBackPress(); }}>
        BACK
      </button>
    );
  }

  renderRow(letters: string[], rowIdx: number) {
    let rowCells = letters.map(letter => this.renderKey(letter));

    if(rowIdx === 2) {
      // add the extra buttons
      rowCells = [this.renderEnterKey(), ...rowCells, this.renderBackspaceKey()];
    }

    return (
      <div className="flex justify-center gap-1 pb-1" key={rowIdx}>
        {rowCells}
      </div>
    );
  }

  render() {
    const letterRows = [
      'QWERTYUIOP',
      'ASDFGHJKL',
      'ZXCVBNM'
    ];

    const rows = letterRows.map((lettersStr, rowIdx) => this.renderRow(lettersStr.split(''), rowIdx));

    return (
      <div>
        {rows}
      </div>
    );
  }
}
