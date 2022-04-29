import { withSnackbar } from 'notistack';
import React, { ReactPropTypes } from 'react';
import { GameGrid } from './GameGrid';
import { Keyboard } from './Keyboard';
import { getKeyboardHints, getRandomSolution, isSolution, MAX_GUESSES } from './utils';

class Game extends React.Component {
  props: any;
  state: {
    guesses: string[];
    solution: string;
    currentGuess: string;
    isOver: boolean;
    isWon: boolean;
  };

  constructor(props: ReactPropTypes) {
    super(props);

    this.state = {
      guesses: [],
      solution: getRandomSolution(),
      currentGuess: '',
      isOver: false,
      isWon: false,
    };
  }

  resetGame(): void {
    this.setState({
      guesses: [],
      solution: getRandomSolution(),
      currentGuess: '',
      isOver: false,
      isWon: false,
    });
  }

  handleBackPress(): void {
    if(this.state.isOver) {
      return;
    }
    if(this.state.currentGuess.length < 1) {
      // nothing to delete
      this.props.enqueueSnackbar('Nothing to delete');
      return;
    }

    const currentGuess = this.state.currentGuess;
    this.setState({
      currentGuess: currentGuess.substring(0, currentGuess.length - 1)
    });
  }

  handleEnterPress(): void {
    if(this.state.isOver) {
      return;
    }
    if(this.state.currentGuess.length < 5) {
      this.props.enqueueSnackbar('Write all characters before pressing enter');
      return;
    }

    // if the guess is correct or the max guesses have been reached
    const { guesses, currentGuess } = this.state;
    if(!isSolution(currentGuess)) {
      // not a valid solution
      this.props.enqueueSnackbar('Cannot recognize word');
      return;
    }
    const isWon = currentGuess === this.state.solution;
    const isOver = isWon || guesses.length + 1 === MAX_GUESSES;

    this.setState({
      currentGuess: '',
      guesses: guesses.concat(currentGuess),
      isOver,
      isWon
    });
  }

  handleKeyPress(key: string): void {
    if(this.state.isOver) {
      return;
    }
    if(this.state.currentGuess.length >= 5) {
      this.props.enqueueSnackbar('Reached max guess length');
      return;
    }

    this.setState({
      currentGuess: this.state.currentGuess + key
    });
  }

  render() {
    const hints = getKeyboardHints(this.state.guesses, this.state.solution);
    let status = 'Write an italian 5 letter word and then press enter';
    let statusClass = '';
    if(this.state.isOver && this.state.isWon) {
      status = 'You won! The solution was ' + this.state.solution;
      statusClass = 'text-green-600';
    } else if(this.state.isOver) {
      status = 'Game over, the solution was ' + this.state.solution;
      statusClass = 'text-red-600';
    }

    return (
      <div>
        <GameGrid guesses={this.state.guesses}
          solution={this.state.solution}
          currentGuess={this.state.currentGuess}
        ></GameGrid>
        <div className={ `mb-3 h-10 flex flex-col items-center text-sm ${statusClass}` }>
          { status }
          <button className={ (this.state.isOver ? '' : 'hidden') + ' ml-1 text-blue-600' }
            onClick={ () => this.resetGame() }>
            Play again
          </button>
        </div>
        <Keyboard hints={hints}
          onBackPress={this.handleBackPress.bind(this)}
          onEnterPress={this.handleEnterPress.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        ></Keyboard>
      </div>
    );
  }
}

export default withSnackbar<any>(Game);
