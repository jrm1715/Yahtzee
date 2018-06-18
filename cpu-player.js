let cpuTurn = false;
let turns = 0;

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
  turns += 1;
}


while (cpuTurn === true && turns !== 3) {
  rollDice();
}
