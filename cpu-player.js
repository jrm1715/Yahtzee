

function cpuTurn() {
  console.log("CPUs turn")
  if (cpuRolls < MAX_ROLLS) {
    setTimeout(rollDice, 1500); //Delay each CPU roll by x seconds
    cpuRolls++;
  }
}
