

function cpuTurn() {
  if (cpuRolls < MAX_ROLLS) {
    rollDice();
    cpuRolls++;
  }
}
