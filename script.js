"use strict";
let tableOne, tableTwo, sum;
let die = [1, 1, 1, 1, 1];
let diceImage = document.querySelectorAll(".dice");
let tdBox = document.querySelector(".td-box");


document.querySelector("#roll-dice").addEventListener("click", function() {
  tableOne = [0, 0, 0, 0, 0, 0, 0];
  tableTwo = [0, 0, 0, 0, 0, 0, 0, 0];
  generateRandNum(die);
  for (let i = 0; i < die.length; i++) {
    document.getElementById("dice-" + i).src = "images/dice-" + die[i] + ".png";
  }
  dieLoop(die);
  updateTableOneVariables(tableOne);
  updateTableData();
});

function generateRandNum(arry) {
  for (let i = 0; i < 5; i++) {
    if (hasClass(i, "unselected") === true) {
      die[i] = Math.floor(Math.random() * 6) + 1;
    }
  }
}

function hasClass(i, cls) {
  let element = document.getElementById("dice-" + i);
  return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
}

/*
  Compare and iterate through the dice by some number. Whether that be
  for a three of a kind, or a four of a kind. This function will compare and return
  if a three of a kind or a four of a kind exists.
*/
function dieLoop(die) {
  let fullHouseArry = [];
  for (let i = 0; i < die.length; i++) {
    let j = i + 1;// Insures that it will not compare 'i' with itself.
    let count = 1; // Set to 1 to include currently select die.
    for (j; j < die.length; j++){
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
    for(let i = 0; i < temp.length; i++){
      if(uniqueArray.indexOf(temp[i]) == -1){
          uniqueArray.push(temp[i]);
      }
    }
    removeAtIndex(uniqueArray);
    return uniqueArray;
}

function removeAtIndex(uniqueArray) {
  let testCaseOne = [ 1, 2, 3, 4, 6 ];
  let testCaseTwo = [ 1, 3, 4, 5, 6 ];
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
  let lrgStraightTwo = [2, 3 ,4, 5, 6];
  let lrgStrtScore = 40
  if (arraysEqual(die, lrgStraightOne) === true ||
  arraysEqual(die, lrgStraightTwo) === true) {
    tableTwo[4] = lrgStrtScore;
  }
}

function arraysEqual (arrOne, arrTwo) {
  if (arrOne.length !== arrTwo.length) {
    return false;
  }
  for(let i = 0; i < arrOne.length; i++) {
    if (arrOne[i] !== arrTwo[i]) {
      return false;
    }
  }
  return true;
}

function checkForChance() {
  tableTwo[5] = die.reduce(add);
}

function updateTableOneVariables(tableOne) {
  for (let i = 0; i < die.length; i++) {
    if (die[i] === 1) {
      tableOne[0] += 1;
    }else if (die[i] === 2) {
      tableOne[1] += 2;
    }else if (die[i] === 3) {
      tableOne[2] += 3;
    }else if (die[i] === 4) {
      tableOne[3] += 4;
    }else if (die[i] === 5) {
      tableOne[4] += 5;
    }else if (die[i] === 6) {
      tableOne[5] += 6;
    }
  }
}

function updateTableData() {
  document.getElementById("td-ones").innerHTML = tableOne[0];
  document.getElementById("td-twos").innerHTML = tableOne[1];
  document.getElementById("td-threes").innerHTML = tableOne[2];
  document.getElementById("td-fours").innerHTML = tableOne[3];
  document.getElementById("td-fives").innerHTML = tableOne[4];
  document.getElementById("td-sixes").innerHTML = tableOne[5];

  document.getElementById("td-three-of-a-kind").innerHTML = tableTwo[0];
  document.getElementById("td-four-of-a-kind").innerHTML = tableTwo[1];
  document.getElementById("td-full-house").innerHTML = tableTwo[2];
  document.getElementById("td-sml-straight").innerHTML = tableTwo[3];
  document.getElementById("td-lrg-straight").innerHTML = tableTwo[4];
  document.getElementById("td-chance").innerHTML = tableTwo[5];
  document.getElementById("td-yahtzee").innerHTML = tableTwo[6];

  // TODO: Needs to add rows 1-6 when every row has a value.
  // This value will get displayed once this happens
  document.getElementById("td-sum").innerHTML = tableOne.reduce(add);
}

function selectDie() {
  for (let i = 0; i < diceImage.length; i++) {
    diceImage[i].addEventListener("click", function() {
      if (hasClass(i, "unselected") === true) {
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
function tableBoxClicked(clickedCell) {
  let cellNumber = clickedCell;
}

selectDie();
