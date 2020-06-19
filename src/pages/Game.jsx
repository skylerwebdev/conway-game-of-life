import React from "react";
import GameBoard from "./GameBoard";

const Game = () => {
  return (
    <div className='mnPg'>
    <div className="mnHdr">
    <h1 className='mnHdrH1'>Conway's Game of Life</h1>
    </div>
    <div className="mnBdy">
      <div className="game">
        <div className="gameLt">
      <div className="gameBoard">
      <GameBoard />
      </div>
      <div className="gameBtns"><h2>Buttons Will Go Here</h2></div>
      <div className="gameRt">
        <div className="gamePresets">
          <h2>Presets Will Go Here</h2>
        </div>
      </div>
      </div>
    </div>
    
</div>
</div>
  );
};

export default Game;
