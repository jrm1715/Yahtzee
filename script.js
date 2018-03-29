let die, tableOne, sum;

function generateRandNum(arry) {
  die = [];
  for (let i = 0; i < 5; i++) {
    die.push(Math.floor(Math.random() * 6) + 1);
  }
  return die;
}

document.querySelector("#roll-dice").addEventListener("click", function() {
  tableOne = [0, 0, 0, 0, 0, 0, 0];
  generateRandNum(die);
  for (let i = 0; i < die.length; i++) {
    document.getElementById("dice-" + i).src = "images/dice-" + die[i] + ".png";
  }
  updateTableOneVariables(tableOne);
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
  updateTableData(tableOne);
}

function updateTableData(tableOne) {
  document.getElementById("td-ones").innerHTML = tableOne[0];
  document.getElementById("td-twos").innerHTML = tableOne[1];
  document.getElementById("td-threes").innerHTML = tableOne[2];
  document.getElementById("td-fours").innerHTML = tableOne[3];
  document.getElementById("td-fives").innerHTML = tableOne[4];
  document.getElementById("td-sixes").innerHTML = tableOne[5];
  document.getElementById("td-sum").innerHTML = tableOne.reduce(add);
}

function add(total, num) {
  return total + num;
}

//document.getElementById("td-ones").innerHTML = "1";

// Look through the die array and:
// 1. If there are 1's. Add them up and store them in the One's variable.
// 2. Do this for each number.
