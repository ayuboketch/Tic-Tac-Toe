![Screenshot 2024-07-16 at 16 35 58](https://github.com/user-attachments/assets/6be7f28b-a9df-4ec2-ad48-41f2b7fefa52)



# Tic-Tac-Toe
Making a Tic Tac Toe game you can play in your browser!

This is a simple implementation of the classic Tic Tac Toe game using HTML, CSS, and JavaScript.

## Game Overview

The game allows two players to play Tic Tac Toe in turns. Player one uses "X" and player two uses "O". The game board consists of a 3x3 grid, and the players take turns to place their marks in the cells. The game ends when one player gets three of their marks in a row (horizontally, vertically, or diagonally) or when all cells are filled without any player winning (resulting in a draw).

## Features

- Two-player game (Player X and Player O)
- Displays a winning message when a player wins
- Displays a draw message when the game ends in a draw
- Restart button to reset the game

## How to Play

1. Clone the repository to your local machine.
2. Open `index.html` in your preferred web browser.
3. Click on a cell in the 3x3 grid to make a move.
4. The game will indicate whose turn it is by highlighting the board.
5. The game ends when a player wins or when there is a draw.
6. Click the "Restart" button to start a new game.

## Code Explanation

### Constants

- `X_CLASS` and `CIRCLE_CLASS` are used to add classes to the cells to distinguish between player X and player O.
- `WINNING_COMBINATIONS` is an array of arrays, each containing indices of cells that form winning combinations.

### Variables

- `cellElements` selects all the cells in the grid.
- `board` selects the game board.
- `winningMessageElement` selects the element that displays the winning or draw message.
- `restartButton` selects the restart button.
- `winningMessageTextElement` selects the element that contains the winning or draw text.
- `circleTurn` is a boolean that keeps track of whether it is player O's turn.

### Functions

- `startGame()`: Initializes the game state, clears the board, and sets up event listeners.
- `handleClick(e)`: Handles the logic for each cell click, including placing the mark, checking for a win or draw, and swapping turns.
- `endGame(draw)`: Displays the appropriate message when the game ends (either a win or a draw).
- `isDraw()`: Checks if all cells are filled, indicating a draw.
- `placeMark(cell, currentClass)`: Adds the appropriate class (X or O) to the clicked cell.
- `swapTurns()`: Switches the turn between player X and player O.
- `setBoardHoverClass()`: Adds the appropriate class to the board to indicate whose turn it is.
- `checkWin(currentClass)`: Checks if the current player has a winning combination.

  Example of Draw and Win
![Screenshot 2024-07-16 at 16 36 14](https://github.com/user-attachments/assets/0992b9a8-4d76-4c04-ab5e-c398f1ab082e)
![Screenshot 2024-07-16 at 16 36 28](https://github.com/user-attachments/assets/f4142da0-390d-4a21-ab8c-a7ea1de14bec)
![Uploading Screenshot 2024-07-16 at 16.37.00.png…]()
## Example Code

```javascript
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
