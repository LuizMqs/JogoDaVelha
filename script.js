const spaces = Array.from(document.querySelectorAll(".casa"));
let turn = "x";
let array = [];
function insert() {
  if (document.getElementById("resultado").innerHTML != "") return;
  if (!this.dataset.click) this.dataset.click = turn;
  if (turn == "x") turn = "o";
  else turn = "x";

  drawSpaces();
  updateArray();
  const victory = verifyWinner();
  if (victory) document.getElementById("resultado").innerHTML = victory;
  else if (array.every((line) => line.every((column) => column != ""))) {
    document.getElementById("resultado").innerHTML = "Veia";
    console.log(array);
  }
}

function drawSpaces() {
  document.querySelectorAll(".casa").forEach((space) => {
    if (space.dataset.click) {
      space.innerHTML = `<img src="./images/${space.dataset.click}.png" />`;
    }
  });
}

function updateArray() {
  let line = [];
  array = [];
  spaces.forEach((space, index) => {
    if (space.dataset.click) line.push(space.dataset.click);
    else line.push("");
    if ((index + 1) % 3 == 0) {
      array.push(line);
      line = [];
    }
  });
}

function verifyWinner() {
  let line = [];
  let diag = ["", "", ""];
  let inv_diag = ["", "", ""];
  let column = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      line.push(array[i][j]);
      column.push(array[j][i]);
      if (i == j) diag[i] = array[i][j];
      if (i + j == 2) inv_diag[i] = array[i][j];
    }
    if (
      line.every((item) => item == "x") ||
      column.every((item) => item == "x") ||
      diag.every((item) => item == "x") ||
      inv_diag.every((item) => item == "x")
    ) {
      return "O vencedor é o X";
    }
    if (
      line.every((item) => item == "o") ||
      column.every((item) => item == "o") ||
      diag.every((item) => item == "o") ||
      inv_diag.every((item) => item == "o")
    ) {
      return "O vencedor é o O";
    }
    line = [];
    column = [];
  }
}

function restart() {
  turn = "x";
  array = [];
  spaces.forEach(space => {
    space.dataset.click = ""
    space.innerHTML = ""
  })
  document.getElementById("resultado").innerHTML = ""
}

spaces.forEach((space) => {
  space.addEventListener("click", insert);
});

document.getElementById("restart_button").addEventListener("click", restart)
