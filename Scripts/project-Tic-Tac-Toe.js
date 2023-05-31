
const myArray = [
  ['', '', ''],
  ['', '', ''], 
  ['', '', '']
];

let cpCoordx = Math.floor((Math.random()*3));
let cpCoordy = Math.floor((Math.random()*3));
let counter = 0;
let elementOut = '';
let disableFunction = false;




containerBox()


function containerBox() {

  const gridContainer = document.querySelector('.js-grids');


  gridContainer.innerHTML = ``;
  

  myArray.forEach((element, rowIndex) => {
    let html = `<div class="row-element">`;
    let elementIn = '';


    element.forEach((element2, columnIndex) => {
      const buttonIndex = rowIndex * myArray.length + columnIndex;
      html += `<button><div class=" js-add${buttonIndex} add-button cell-element">${element2}</div></button>`;
      elementIn += buttonIndex;


    });
    
    html += `</div>`;
    
    gridContainer.innerHTML += html;
    elementOut += elementIn;

    
  });

  // console.log(`length: ${gridContainer.innerHTML}`);
   // console.log(`elementOut: ${myArray[0][2]}`);
   //console.log(`elementOut: ${elementOut}`);

}



document.querySelector('.js-grids').addEventListener('click', (event) => {

  const buttonClasses = ['.js-add0', '.js-add1', '.js-add2', '.js-add3', '.js-add4', '.js-add5', '.js-add6', '.js-add7', '.js-add8'];


  buttonClasses.forEach((buttonClass, index) => {

    if (event.target.matches(buttonClass) && myArray[Math.floor(index/3)][index%3] == '' && !disableFunction) {

      myArray[Math.floor(index/3)][index%3] = 'O';
      performAction();
    }
  });
});

function performAction () {
  computerMove();
  endGame();
  containerBox();
}



function computerMove() {

  counter ++;

  if (counter <= 1) {

    while (myArray[cpCoordx][cpCoordy] !== '') {

      cpCoordx = Math.floor((Math.random()*3));
      cpCoordy = Math.floor((Math.random()*3));
      // console.log(`random nums: ${cpCoordx}, ${cpCoordy}`)
      
      if (myArray[cpCoordx][cpCoordy] === '') {
        myArray[cpCoordx][cpCoordy] = 'X';
        console.log('second');
        break;
      }
    }

    if (myArray[cpCoordx][cpCoordy] === '') {
      myArray[cpCoordx][cpCoordy] = 'X';
      // console.log('first')
    } 
  }

  if (counter > 1) {

    const possibleMoves = [
      [cpCoordx, cpCoordy],
      [cpCoordx + 1, cpCoordy],
      [cpCoordx, cpCoordy + 1],
      [cpCoordx + 1, cpCoordy + 1],
      [cpCoordx - 1, cpCoordy],
      [cpCoordx, cpCoordy - 1],
      [cpCoordx - 1, cpCoordy - 1],
      [cpCoordx - 1, cpCoordy + 1],
      [cpCoordx + 1, cpCoordy - 1],

      [cpCoordx + 2, cpCoordy],
      [cpCoordx, cpCoordy + 2],
      [cpCoordx + 2, cpCoordy + 1],
      [cpCoordx - 2, cpCoordy],
      [cpCoordx, cpCoordy - 2],
      [cpCoordx - 2, cpCoordy - 1],
      [cpCoordx - 2, cpCoordy + 1],
      [cpCoordx + 2, cpCoordy - 1],

      [cpCoordx + 1, cpCoordy + 2],
      [cpCoordx - 1, cpCoordy - 2],
      [cpCoordx - 1, cpCoordy + 2],
      [cpCoordx + 1, cpCoordy - 2]
    ]


    for (let i=0; i < possibleMoves.length; i++) {
      const [x, y] = possibleMoves[i]
      // console.log(`i prevent overlapping: ${i}`)
      if (myArray[x] !== undefined && myArray[x][y] !== undefined && myArray[x][y] === '') {
        myArray[x][y] = 'X';
        break;
      } 
    }
  }
}

function endGame() {

  const winConditions = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ]

  for (const condition of winConditions) {
    const [x1, y1] = condition[0];
    const [x2, y2] = condition[1];
    const [x3, y3] = condition[2];
    if (
      myArray[x1][y1] === 'X' &&
      myArray[x2][y2] === 'X' &&
      myArray[x3][y3] === 'X') {
      
      document.querySelector('.js-results').innerHTML = 'Computer wins!!!'
      disableFunction = true;
      
    } else if (
      myArray[x1][y1] === 'O' &&
      myArray[x2][y2] === 'O' &&
      myArray[x3][y3] === 'O') {

      document.querySelector('.js-results').innerHTML = 'You win!!!';
      disableFunction = true;
      break
      }
  }
}