// TODO: Need to add Bonus value

let die, tableOne, tableTwo, sum;

function generateRandNum(arry) {
  die = [];
  for (let i = 0; i < 5; i++) {
    die.push(Math.floor(Math.random() * 6) + 1);
  }
  return die;
}

document.querySelector("#roll-dice").addEventListener("click", function() {
  tableOne = [0, 0, 0, 0, 0, 0, 0];
  tableTwo = [0, 0, 0, 0, 0, 0, 0, 0];
  generateRandNum(die);
  for (let i = 0; i < die.length; i++) {
    document.getElementById("dice-" + i).src = "images/dice-" + die[i] + ".png";
  }
  updateTableOneVariables(tableOne);
  dieLoop(die);
  updateTableData();
});

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

  document.getElementById("three-of-a-kind").innerHTML = tableTwo[0];
  document.getElementById("four-of-a-kind").innerHTML = tableTwo[1];
  document.getElementById("full-house").innerHTML = tableTwo[2];
  document.getElementById("sml-straight").innerHTML = tableTwo[3];

  // TODO: Needs to add rows 1-6 when every row has a value.
  // This value will get displayed once this happens
  document.getElementById("td-sum").innerHTML = tableOne.reduce(add);
}

function add(total, num) {
  return total + num;
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
      }
    }
    checkForFullHouse(fullHouseArry, i);
    checkForSmlStrt(die);
  }
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

function checkForFullHouse(fullHouseArry, i) {
  if (fullHouseArry.length > 0) { // Prevents reducing an empty array
    if (fullHouseArry.reduce(add) === 4) {
      tableTwo[2] = die.reduce(add);
    }
  }
}

function checkForSmlStrt(die) {
  let straightScore = 30;
  let indexAt = 3;
  let straightOne = [1, 2, 3, 4];
  let straightTwo = [2, 3, 4, 5];
  let straightThree = [3, 4, 5, 6];
  let sortedDie = die.sort();
  let temp = sortedDie.slice();
  let newArray = removeDuplicate(temp);
  //let spliceDie = temp.splice(4, 1);
  console.log(newArray);
  if (newArray === straightOne) {
    tableTwo.splice(indexAt, 0, straightScore);
  } else if (newArray === straightTwo) {
    tableTwo.splice(indexAt, 0, straightScore);
  } else if (newArray === straightThree) {
    tableTwo.splice(indexAt, 0, straightScore);
  }
}

function removeDuplicate(temp) {
  let uniqueArray = [];
    for(let i = 0; i < temp.length; i++){
        if(uniqueArray.indexOf(temp[i]) == -1){
            uniqueArray.push(temp[i]);
        }
    }
    return uniqueArray;
}
