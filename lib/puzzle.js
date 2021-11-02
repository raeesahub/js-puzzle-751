// -----
// RECAP
// -----

// 1. Select an element
// 2. Add event listener
// 3. Callback

const button = document.querySelector('#show-hint');

const hintBox = document.querySelector('.hint');

button.addEventListener('click', (event) => {
  hintBox.classList.add('active');
});

// ------
// PUZZLE
// ------

// Select all the tiles
// For each tile
// Add an event listener for a click
// Check if clicked tile is next to an empty tile (above, below, left or right)
// If tiles are adjacent, swap the tiles (add class empty to clicked tile, swap number)

const nextTileEmpty = (tile) => {
  // Define the position of the clicked tile
  const tileColumn = tile.cellIndex;
  const tileRow = tile.parentElement.rowIndex;
  // Define the position of the empty tile
  const empty = document.querySelector('.empty');
  const emptyColumn = empty.cellIndex;
  const emptyRow = empty.parentElement.rowIndex;
  // Check if they are next to each other
  const above = tileRow - 1 === emptyRow && tileColumn === emptyColumn;
  const below = tileRow + 1 === emptyRow && tileColumn === emptyColumn;
  const left = tileRow === emptyRow && tileColumn - 1 === emptyColumn;
  const right = tileRow === emptyRow && tileColumn + 1 === emptyColumn;
  // If they are, return true
  return above || below || left || right;
};

const tiles = document.querySelectorAll('td');

const didWeWin = (tiles) => {
  const winningNumbers = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,";
  let ourNumbers = [];
  tiles.forEach((tile) => {
    // Add each tile's innerText to our array
    ourNumbers.push(tile.innerText);
  })
  // Compare our numbers (as a string) to the winning numbers
  return winningNumbers === ourNumbers.join(',');
};

tiles.forEach((tile) => {
  tile.addEventListener('click', (event) => {
    // Check if tile is next to empty tile
    if (nextTileEmpty(tile)) {
      // Remove empty class from empty tile
      const empty = document.querySelector('.empty');
      empty.classList.remove('empty');
      // Add empty class to clicked tile
      tile.classList.add('empty');
      // Get number from clicked tile
      empty.innerText = tile.innerText;
      // Add number to empty tile
      tile.innerText = "";

      if (didWeWin) {
        alert('Yay, we won!')
      }
    }
  });
});
