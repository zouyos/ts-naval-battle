const rl = require('readline-sync');

// const answer = rl.keyInYN('test?')
// const answer2 = rl.keyInSelect(['1', '2', '3'], 'test?')

const number = 3

const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function fillChoices(arr: string[]) {
  const newArr: string[] = [];
  arr.forEach((item) => {
    for (let i = 0; i < arr.length; i += 1) {
      newArr.push(`${item}${i + 1}`);
    }
  });
  return newArr;
}

const choices = fillChoices(letters);

const matrix1 = Array(8).fill('.').map(() => Array(8).fill('.'));
const matrix2 = Array(8).fill('.').map(() => Array(8).fill('.'));
let player1Play = true

function displayBoard(mat: string[][]) {
  console.log(`   ${letters.join(' ')}`);
  mat.forEach((arr, i) => {
    console.log(`${i + 1} [${arr.join(' ')}]`);
  });
}

function displayFakeBoard(mat: string[][]) {
  const newMat = mat.map(row => [...row]);
  newMat.forEach((arr) => {
    arr.forEach((square, i) => {
      if (square === 'O') {
        arr[i] = '.'
      }
    })
  });
  displayBoard(newMat)
}

function placeShip(square: string, mat: string[][]) {
  const row: number = Number(square.charAt(1));
  const col: number = letters.indexOf(square.charAt(0));
  mat[row - 1][col] = 'O'
}

function togglePlayer1() {
  player1Play = !player1Play
}

function targetSquare(square: string, mat: string[][]) {
  const row: number = Number(square.charAt(1));
  const col: number = letters.indexOf(square.charAt(0));
  if (mat[row - 1][col] === 'O') {
    console.log('HIT!');
    mat[row - 1][col] = 'X'
  } else if (mat[row - 1][col] === 'X') {
    console.log('You\'ve already targeted this square');
  } else {
    console.log('Missed...');
  }
}

function winCheck(mat: string[][]) {
  return !mat.some((arr) => arr.some((square: string) => square === 'O'))
}

function play() {
  console.log('Welcome to this naval battle game');
  displayBoard(matrix1);

  let player1Ships: string[] = []
  let player2Ships: string[] = []

  while (player1Ships.length < 3) {
    let firstShipP1 = rl.question('Player 1 place a ship: ').toLocaleUpperCase()
    while (!choices.includes(firstShipP1)) {
      console.log('Please provide an available square.');
      displayBoard(matrix1);
      firstShipP1 = rl.question('Player 1 place a ship: ').toLocaleUpperCase()
    }
    let rowFirstShipP1: number = Number(firstShipP1.charAt(1));
    let colFirstShipP1: number = letters.indexOf(firstShipP1.charAt(0));
    while (matrix1[rowFirstShipP1 - 1][colFirstShipP1] === 'O') {
      console.log('There is already a ship on this square.');
      firstShipP1 = rl.question('Player 1 place a ship: ').toLocaleUpperCase()
      rowFirstShipP1 = Number(firstShipP1.charAt(1));
      colFirstShipP1 = letters.indexOf(firstShipP1.charAt(0));
    }
    placeShip(firstShipP1, matrix1)
    player1Ships.push(firstShipP1)
    console.log('Ship placed.');
    displayBoard(matrix1);
  }

  console.log('All ships placed for player 1');

  while (player2Ships.length < 3) {
    let firstShipP2 = rl.question('Player 2 place a ship: ').toLocaleUpperCase()
    while (!choices.includes(firstShipP2)) {
      console.log('Please provide an available square.');
      displayBoard(matrix2);
      firstShipP2 = rl.question('Player 2 place a ship: ').toLocaleUpperCase()
    }
    let rowFirstShipP2: number = Number(firstShipP2.charAt(1));
    let colFirstShipP2: number = letters.indexOf(firstShipP2.charAt(0));
    while (matrix2[rowFirstShipP2 - 1][colFirstShipP2] === 'O') {
      console.log('There is already a ship on this square.');
      firstShipP2 = rl.question('Player 2 place a ship: ').toLocaleUpperCase()
      rowFirstShipP2 = Number(firstShipP2.charAt(1));
      colFirstShipP2 = letters.indexOf(firstShipP2.charAt(0));
    }
    placeShip(firstShipP2, matrix2)
    player2Ships.push(firstShipP2)
    console.log('Ship placed.');
    displayBoard(matrix2);
  }

  console.log('All ships placed for player 2');

  console.log('Now let\'s play!');
  while (!(winCheck(matrix1) || winCheck(matrix2))) {
    let playerMove = rl.question(`${player1Play ? 'Player 1' : 'Player 2'} target a square: `).toLocaleUpperCase()
    if (!choices.includes(playerMove)) {
      console.log('Please provide a valid value.');
    } else {
      if (player1Play) {
        targetSquare(playerMove, matrix2)
        console.log('Opponent\'s board:');
        displayFakeBoard(matrix2)
        console.log('Your board:');
        displayBoard(matrix1)
        togglePlayer1()
      } else {
        targetSquare(playerMove, matrix1)
        console.log('Opponent\'s board:');
        displayFakeBoard(matrix1)
        console.log('Your board:');
        displayBoard(matrix2)
        togglePlayer1()
      }
    }
  }
  const winner = winCheck(matrix1) ? 'player 2' : 'player 1'
  console.log(`Congratulations ${winner}, You won!`);
}

play()
