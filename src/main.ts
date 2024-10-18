const rl = require('readline-sync');

// const answer = rl.keyInYN('test?')
// const answer2 = rl.keyInSelect(['1', '2', '3'], 'test?')

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

function placeBoat(square: string, mat: string[][]) {
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
  if (mat[row - 1][col] !== '.') {
    console.log('HIT!');
    mat[row - 1][col] = 'X'
  } else {
    console.log('Missed...');
  }
}

function winCheck(mat: string[][]) {
  return mat.some((arr) => arr.some((square: string) => square === 'X'))
}

function play() {

  console.log('Welcome to this naval battle game');
  displayBoard(matrix1);

  let firstBoatP1 = rl.question('Player 1 place a boat: ')
  firstBoatP1 = firstBoatP1.toLocaleUpperCase()
  while (!choices.includes(firstBoatP1)) {
    console.log('Please provide a valid value.');
    firstBoatP1 = rl.question('Player 1 place a boat: ')
  }
  placeBoat(firstBoatP1, matrix1)
  displayBoard(matrix1);

  let firstBoatP2 = rl.question('Player 2 place a boat: ')
  firstBoatP2 = firstBoatP2.toLocaleUpperCase()
  while (!choices.includes(firstBoatP2)) {
    console.log('Please provide a valid value.');
    firstBoatP2 = rl.question('Player 1 place a boat: ')
  }
  placeBoat(firstBoatP2, matrix2)
  displayBoard(matrix2);

  console.log('Now let\'s play!');
  while (!(winCheck(matrix1) || winCheck(matrix2))) {
    let playerMove = rl.question(`${player1Play ? 'Player 1' : 'Player 2'} target a square: `)
    playerMove = playerMove.toLocaleUpperCase()
    if (!choices.includes(playerMove)) {
      console.log('Please provide a valid value.');
    } else {
      if (player1Play) {
        targetSquare(playerMove, matrix2)
        console.log('Opponent\'s board:');
        displayBoard(matrix2)
        console.log('Your board:');
        displayBoard(matrix1)
        togglePlayer1()
      } else {
        targetSquare(playerMove, matrix1)
        console.log('Opponent\'s board:');
        displayBoard(matrix1)
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
