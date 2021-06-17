while (!player1){
  var player1 = prompt('Player One: Enter your name. You will be Axolotl.');
};
var player1Color = 'axolotl';

while (!player2){
  var player2 = prompt('Player Two: Enter your name. You will be Octopus.');
};
var player2Color = 'octopus';

// Selectors

//step one, identify rows, tr elements
var tableRow = document.getElementsByTagName('tr');
//step two, identify td elements (circles on the board)
var tableData = document.getElementsByTagName('td');
//step three,   identify the class slots
const slots = document.querySelectorAll('.slot');
var playerTurn = document.querySelector('.player-turn');
const resetBtn = document.querySelector('.reset');

var currentPlayer = 1;
let winner;
playerTurn.textContent = `${player1}'s turn!`

// Log cell coordinates when clicked

  // need to identify the table coordinates by getting the row (rowIndex) and 
  // column (cellIndex)of the clicked cell

for (i = 0; i < tableData.length; i ++){
  tableData[i].addEventListener('click', (e) =>{
      console.log(`${e.target.parentElement.rowIndex},${e.target.cellIndex}`)
  });
};


// Funtions

function changeColor(e){
  // Get clicked column index
  let column = e.target.cellIndex;
  let row = [];

  // start with 5 to check the bottom row first  
  // i -1 decreases up the column by one

  for (i = 5; i > -1; i--){
      var itemClassList = tableRow[i].children[column].classList
      if (!itemClassList.contains('playerOneImg') && !itemClassList.contains('playerTwoImg')) { //.style.backgroundColor == 'transparent'){
          row.push(tableRow[i].children[column]); 
          if (currentPlayer === 1){ 
              //it current player is one, we take the first index of the player's array equal to player one color
            
              row[0].classList.add('playerOneImg')//.style.backgroundColor = 'orange';
              console.log(row[0].classList);

              if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                  playerTurn.textContent = `${player1} WINS!!`;
                  playerTurn.itemClassList = player1Color; //.style.color
                  return alert(`${player1} WINS!!`);
              }else if (drawCheck()){
                  playerTurn.textContent = 'DRAW!';
                  return alert('DRAW!');
              }else{
                  playerTurn.textContent = `${player2}'s turn`
                  return currentPlayer = 2;
              }
          }else {
            
              row[0].classList.add('playerTwoImg')//.style.backgroundColor = 'purple';
              console.log(row[0].classList);

              if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                  playerTurn.textContent = `${player2} WINS!!`;
                  playerTurn.style.color = player2Color;
                  return alert(`${player2} WINS!!`);
              }else if (drawCheck()){
                  playerTurn.textContent = 'wh!';
                  return alert('DRAW!');
              }else{
                  playerTurn.textContent = `${player1}'s turn`;
                  return currentPlayer = 1;
                  //
              }
              
          }
      }
  }
 
}

//iterate through each of the cells w. array.prototype.forEach
Array.prototype.forEach.call(tableData, (cell) => {
  cell.addEventListener('click', changeColor);
  // Set all slots to transparent for new game
  cell.style.backgroundColor = 'transparent';
});

//
function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'transparent' && one !== undefined);
}

//can win four ways, vertical, horizontal, diag l-r, diag r-l

function horizontalCheck(){
  for (let row = 0; row < tableRow.length; row++){ //row counting from bottom up
      for (let col =0; col < 4; col++){
         if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor, 
                              tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
             return true;
         }
      }
  }
}

function verticalCheck(){
  for (let col = 0; col < 7; col++){
      for (let row = 0; row < 3; row++){ //can only win three times vertically
          if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                              tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
              return true;
          };
      }   
  }
}

function diagonalCheck(){
  for(let col = 0; col < 4; col++){
      for (let row = 0; row < 3; row++){ 
          if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
              tableRow[row+2].children[col+2].style.backgroundColor,tableRow[row+3].children[col+3].style.backgroundColor)){
                  return true;
              }
          }
      }

}

function diagonalCheck2(){
  for(let col = 0; col < 4; col++){
      for (let row = 5; row > 2; row--){
          if (colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
              tableRow[row-2].children[col+2].style.backgroundColor,tableRow[row-3].children[col+3].style.backgroundColor)){
                  return true;
          }
      }
  }
}

function drawCheck(){
  let fullSlot = []
  for (i=0; i < tableData.length; i++){
      if (tableData[i].style.backgroundColor !== 'transparent'){
          fullSlot.push(tableData[i]);
      }
  }
  if (fullSlot.length === tableData.length){
      return true;
  }
}

resetBtn.addEventListener('click', () => {
  slots.forEach(slot => {
      slot.style.backgroundColor = 'transparent';
  });
  playerTurn.style.color = 'black';
  return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` : playerTurn.textContent = `${player2}'s turn`);
});