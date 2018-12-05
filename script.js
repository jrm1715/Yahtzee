"use strict";
let tableOne, tableTwo, cellValue;
let sum = 0;
let die = [1, 1, 1, 1, 1];
let playRolls = 0;
let cpuRolls = 0;
let diceImage = document.querySelectorAll(".dice");
let button = document.getElementById("roll-dice");
const MAX_ROLLS = 3;

function startGame() {

  button.addEventListener("click",playersTurn);
}

function playersTurn() {
  console.log("Clicked!");
  if (isPlayersTurn() === true) {
    console.log("Players turn");
    document.getElementById("roll-dice").disabled = false;
    rollDice();
    changeButtonText("End Turn");
    console.log("PlayRolls: " + playRolls);
  } else {
    button.removeEventListener("click", rollDice);
    document.getElementById("roll-dice").disabled = true;
    cpuTurn();
  }
}

function changeButtonText(string, cellSelected) {
  console.log("cellSelected: " + cellSelected)
  if (playRolls >= 3 || cellSelected === true || cellSelected === false) {
    document.getElementById("roll-dice").innerHTML = string
  }
}

function isPlayersTurn() {
  if (playRolls < MAX_ROLLS) {
    playRolls++;
    return true;
  } else {
    return false;
  }
}

function rollDice() {
  tableOne = [0, 0, 0, 0, 0, 0, 0];
  tableTwo = [0, 0, 0, 0, 0, 0, 0, 0];
  generateRandNum(die);
  for (let i = 0; i < die.length; i++) {
    document.getElementById("dice-" + i).src = "images/dice-" + die[i] + ".png";
  }
  dieLoop(die);
  updateTableOneVariables(tableOne);
  updateScore();
}

function generateRandNum(arry) {
  for (let i = 0; i < 5; i++) {
    let element = document.getElementById("dice-" + i);
    if (hasClass(element, "unselected") === true) {
      die[i] = Math.floor(Math.random() * 6) + 1;
    }
  }
}

function hasClass(element, status) {
  return (" " + element.className + " ").indexOf(" " + status + " ") > -1;
}

/*
  Compare and iterate through the dice by some number. Whether that be
  for a three of a kind, or a four of a kind. This function will compare and return
  if a three of a kind or a four of a kind exists.
*/
function dieLoop(die) {
  let fullHouseArry = [];
  for (let i = 0; i < die.length; i++) {
    let j = i + 1; // Insures that it will not compare 'i' with itself.
    let count = 1; // Set to 1 to include currently select die.
    for (j; j < die.length; j++) {
      if (i === die.length) {
        break; // stop loop once at the end of the array.
      }
      if (die[i] === die[j]) {
        count += 1;
        fullHouseArry.push(1);
        checkForThreeOfAKind(count, i);
        checkforFourOfAKind(count, i);
        checkForYahtzee(count, i);
      }
    }
  }
  checkForFullHouse(fullHouseArry);
  checkForSmlStrt(die);
  checkforLrgStrt(die);
  checkForChance();
}

function checkForThreeOfAKind(count, i) {
  if (count === 3) {
    tableTwo[0] = die[i] * count;
  }
}

function checkforFourOfAKind(count, i) {
  if (count === 4) {
    tableTwo[1] = die[i] * count;
  }
}

function checkForYahtzee(count, i) {
  if (count === 5) {
    tableTwo[6] = die[i] * count;
  }
}

function checkForFullHouse(fullHouseArry) {
  if (fullHouseArry.length > 0) { // Prevent reducing an empty array
    if (fullHouseArry.reduce(add) === 4) {
      tableTwo[2] = die.reduce(add);
    }
  }
}

function add(total, num) {
  return total + num;
}

function checkForSmlStrt(die) {
  let strtScore = 30;
  let strtOne = [1, 2, 3, 4];
  let strtTwo = [2, 3, 4, 5];
  let strtThree = [3, 4, 5, 6];
  let temp = die.slice(); // Create a copy of the array
  temp.sort();
  let newArray = removeDuplicate(temp);
  if (arraysEqual(newArray, strtOne) === true ||
    arraysEqual(newArray, strtTwo) === true ||
    arraysEqual(newArray, strtThree) === true) {
    tableTwo[3] = strtScore;
  }
}

function removeDuplicate(temp) {
  let uniqueArray = [];
  for (let i = 0; i < temp.length; i++) {
    if (uniqueArray.indexOf(temp[i]) == -1) {
      uniqueArray.push(temp[i]);
    }
  }
  removeAtIndex(uniqueArray);
  return uniqueArray;
}

function removeAtIndex(uniqueArray) {
  let testCaseOne = [1, 2, 3, 4, 6];
  let testCaseTwo = [1, 3, 4, 5, 6];
  let testCaseThree = [2, 3, 4, 5, 6];
  if (arraysEqual(uniqueArray, testCaseOne) === true) {
    uniqueArray.splice(4, 1);
  } else if (arraysEqual(uniqueArray, testCaseTwo) === true) {
    uniqueArray.splice(0, 1);
  } else if (arraysEqual(uniqueArray, testCaseThree) === true) {
    uniqueArray.splice(0, 1);
  }
  return uniqueArray;
}

function checkforLrgStrt(die) {
  let lrgStraightOne = [1, 2, 3, 4, 5];
  let lrgStraightTwo = [2, 3, 4, 5, 6];
  let lrgStrtScore = 40
  let temp = die.slice();
  temp.sort();
  if (arraysEqual(temp, lrgStraightOne) === true ||
    arraysEqual(temp, lrgStraightTwo) === true) {
    tableTwo[4] = lrgStrtScore;
  }
}

function arraysEqual(arrOne, arrTwo) {
  if (arrOne.length !== arrTwo.length) {
    return false;
  }
  for (let i = 0; i < arrOne.length; i++) {
    if (arrOne[i] !== arrTwo[i]) {
      return false;
    }
  }
  return true;
}

function checkForChance() {
  tableTwo[5] = die.reduce(add);
}

// TODO Check whether Cell has been selected or not.
// This way the tableOne array isn't always being
// changed
function updateTableOneVariables(tableOne) {
  for (let i = 0; i < die.length; i++) {
    if (die[i] === 1) {
      tableOne[0] += 1;
    } else if (die[i] === 2) {
      tableOne[1] += 2;
    } else if (die[i] === 3) {
      tableOne[2] += 3;
    } else if (die[i] === 4) {
      tableOne[3] += 4;
    } else if (die[i] === 5) {
      tableOne[4] += 5;
    } else if (die[i] === 6) {
      tableOne[5] += 6;
    }
  }
}

function updateScore() {
  let cellOne = document.getElementById("td-ones");
  let cellTwo = document.getElementById("td-twos");
  let cellThree = document.getElementById("td-threes");
  let cellFour = document.getElementById("td-fours");
  let cellFive = document.getElementById("td-fives");
  let cellSix = document.getElementById("td-sixes");
  if (hasClass(cellOne, "unselected") === true) {
    document.getElementById("td-ones").innerHTML = tableOne[0];
  } else {
    tableOne[0] = cellValue;
  }
  if (hasClass(cellTwo, "unselected") === true) {
    document.getElementById("td-twos").innerHTML = tableOne[1];
  } else {
    tableOne[1] = cellValue;
  }
  if (hasClass(cellThree, "unselected") === true) {
    document.getElementById("td-threes").innerHTML = tableOne[2];
  } else {
    tableOne[2] = cellValue;
  }
  if (hasClass(cellFour, "unselected") === true) {
    document.getElementById("td-fours").innerHTML = tableOne[3];
  } else {
    tableOne[3] = cellValue;
  }
  if (hasClass(cellFive, "unselected") === true) {
    document.getElementById("td-fives").innerHTML = tableOne[4];
  } else {
    tableOne[4] = cellValue;
  }
  if (hasClass(cellSix, "unselected") === true) {
    document.getElementById("td-sixes").innerHTML = tableOne[5];
  } else {
    tableOne[5] = cellValue;
  }
    updateTableTwoData();
  }

function updateTableTwoData() {
  let cellToK = document.getElementById("td-three-of-a-kind");
  let cellFoK = document.getElementById("td-four-of-a-kind");
  let cellFlHs = document.getElementById("td-full-house");
  let cellSmlStrt = document.getElementById("td-sml-straight");
  let cellLrgStrt = document.getElementById("td-lrg-straight");
  let cellChance = document.getElementById("td-chance");
  let cellYaht = document.getElementById("td-yahtzee");
  if (hasClass(cellToK, "unselected") === true) {
    document.getElementById("td-three-of-a-kind").innerHTML = tableTwo[0];
  } else {
    tableTwo[0] = cellValue;
  }
  if (hasClass(cellFoK, "unselected") === true) {
    document.getElementById("td-four-of-a-kind").innerHTML = tableTwo[1];
  } else {
    tableTwo[1] = cellValue;
  }
  if (hasClass(cellFlHs, "unselected") === true) {
    document.getElementById("td-full-house").innerHTML = tableTwo[2];
  } else {
    tableTwo[2] = cellValue;
  }
  if (hasClass(cellSmlStrt, "unselected") === true) {
    document.getElementById("td-sml-straight").innerHTML = tableTwo[3];
  } else {
    tableTwo[3] = cellValue;
  }
  if (hasClass(cellLrgStrt, "unselected") === true) {
    document.getElementById("td-lrg-straight").innerHTML = tableTwo[4];
  } else {
    tableTwo[4] = cellValue;
  }
  if (hasClass(cellChance, "unselected") === true) {
    document.getElementById("td-chance").innerHTML = tableTwo[5];
  } else {
    tableTwo[5] = cellValue;
  }
  if (hasClass(cellYaht, "unselected") === true) {
    document.getElementById("td-yahtzee").innerHTML = tableTwo[6];
  } else {
    tableTwo[6] = cellValue;
  }
}

function selectDie() {
  for (let i = 0; i < diceImage.length; i++) {
    let element = document.getElementById("dice-" + i);
    diceImage[i].addEventListener("click", function() {
      if (hasClass(element, "unselected") === true) {
        this.setAttribute("style", "border: 3px solid red");
        this.classList.remove("unselected");
        this.classList.add("selected");
      } else {
        this.setAttribute("style", "border: none");
        this.classList.remove("selected");
        this.classList.add("unselected");
      }
    });
  }
}

/* Called inside HTML element */
function getCellValue(clickedCell, element) {
  let cellSelected;
  if (hasClass(element, "unselected")) {
    cellValue = clickedCell;
    sum += parseInt(clickedCell);
    document.getElementById("td-sum").innerHTML = sum;
    element.classList.remove("unselected");
    element.classList.add("selected");
    element.setAttribute("style", "background-color: #ff8080");
    cellSelected = true;
    changeButtonText("End Turn", cellSelected);
  } else if (hasClass(element, "selected")) {
    sum -= parseInt(clickedCell);
    document.getElementById("td-sum").innerHTML = sum;
    element.setAttribute("style", "background-color: #ff9999");
    element.classList.remove("selected");
    element.classList.add("unselected");
    cellSelected = false;
    changeButtonText("Roll", cellSelected);
  }
}

startGame();
selectDie();
