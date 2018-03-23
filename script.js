let die;

function generateRandNum() {
  die = [];
  for (let i = 0; i < 5; i++) {
    die.push(Math.floor(Math.random() * 6));
  }
}

document.querySelector("#roll-dice").addEventListener("click", function() {
  generateRandNum();
  for (let i = 0; i < die.length; i++) {
    document.getElementById("dice-" + i).src = "images/dice-" + die[i] + ".png";
  }
});
