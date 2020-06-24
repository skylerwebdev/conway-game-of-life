import React, { useState } from "react";
import GameBoard from "./GameBoard";
import "../styles/Game.css";

const cellSize = 20;
const width = 800;
const height = 600;
class Cell extends React.Component {
  render() {
    const { x, y } = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${cellSize * x + 1}px`,
          top: `${cellSize * y + 1}px`,
          width: `${cellSize - 1}px`,
          height: `${cellSize - 1}px`,
        }}
      />
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.rows = height / cellSize;
    this.cols = width / cellSize;
    this.board = this.makeNewBoard();
  }
  state = {
    cells: [],
    isRunning: false,
    interval: 100,
  };
  makeNewBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }
  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }
  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }
  handleClick = (event) => {
    const eleOffset = this.getElementOffset();
    const offsetX = event.clientX - eleOffset.x;
    const offsetY = event.clientY - eleOffset.y;

    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);
    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }

    this.setState({ cells: this.makeCells() });
  };
  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };
  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value });
  };
  runIteration() {
    console.log("running iteration");
    let newBoard = this.makeNewBoard();
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }
    this.board = newBoard;
    this.setState({ cells: this.makeCells() });
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }
  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        let y1 = y + dir[0];
        let x1 = x + dir[1];

        if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
            neighbors++;
        }
    }

    return neighbors;
}
handleClear = () => {
  this.board = this.makeNewBoard();
  this.setState({ cells: this.makeCells() });
}

handleRandom = () => {
  for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
          this.board[y][x] = (Math.random() >= 0.5);
      }
  }

  this.setState({ cells: this.makeCells() });
}
  render() {
    const { cells, interval, isRunning } = this.state;
    return (
      <>
        <div
          className="board"
          style={{
            width: width,
            height: height,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
          onClick={this.handleClick}
          ref={(n) => {
            this.boardRef = n;
          }}
        >
          {cells.map((cell) => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
          ))}
        </div>
        <div className="controls">
          {" "}
          Update every{" "}
          <input
            value={this.state.interval}
            onChange={this.handleIntervalChange}
          />{" "}
          msec{" "}
          {isRunning ? (
            <button className="button" onClick={this.stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={this.runGame}>
              Run
            </button>
          )}{" "}
                              <button className="button" onClick={this.handleRandom}>Random</button>
                    <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
      </>
    );
  }
}

export default Game;
