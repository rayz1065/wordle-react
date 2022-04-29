import React from 'react';
import Game from './game/Game';

function App() {
  return (
    <div className="flex justify-center">
      <div className="container p-3">
        <h1 className="text-3xl font-bold underline flex justify-center pb-3">
          Wordle!
        </h1>
        <div className="flex justify-center">
          <Game></Game>
        </div>
      </div>
    </div>
  );
}

export default App;
