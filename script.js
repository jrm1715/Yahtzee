let die, ones, twos, threes, fours, fives, sixes;


function generateRandNum(arry) {
  die = [];
  for (let i = 0; i < 5; i++) {
    die.push(Math.floor(Math.random() * 6) + 1);
  }
  return die;
}

document.querySelector("#roll-dice").addEventListener("click", function() {
  ones = 0;
  twos = 0;
  threes = 0;
  fours = 0;
  fives = 0;
  sixes = 0;
  generateRandNum(die);
  for (let i = 0; i < die.length; i++) {
    document.getElementById("dice-" + i).src = "images/dice-" + die[i] + ".png";
  }
  // TODO: Make this cleaner Maybe use a switch statement?
  // numbers do not reset to 0 when number should be 0.
  for (let i = 0; i < die.length; i++) {
    if (die[i] === 1) {
      ones += 1;
      document.getElementById("td-ones").innerHTML = ones;
    }else if (die[i] === 2) {
      twos += 2;
      document.getElementById("td-twos").innerHTML = twos;
    }else if (die[i] === 3) {
      threes += 3;
      document.getElementById("td-threes").innerHTML = threes;
    }else if (die[i] === 4) {
      fours += 4;
      document.getElementById("td-fours").innerHTML = fours;
    }else if (die[i] === 5) {
      fives += 5;
      document.getElementById("td-fives").innerHTML = fives;
    }else if (die[i] === 6) {
      sixes += 6;
      document.getElementById("td-sixes").innerHTML = sixes;
    }
  }
});

//document.getElementById("td-ones").innerHTML = "1";

// Look through the die array and:
// 1. If there are 1's. Add them up and store them in the One's variable.
// 2. Do this for each number.
