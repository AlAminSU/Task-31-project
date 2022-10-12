const winnerPlyerElm = document.querySelector(".winner");
const winLuckyNumberElm = document.querySelector(".lucky-number span");
const formElm = document.querySelector("form");
const p1ScoreElm = document.querySelector(".p1");
const p2ScoreElm = document.querySelector(".p2");
const luckInputElm = document.querySelector(".luck-input");
const resetBtnElm = document.querySelector(".resetbtn");
const p1BtnElm = document.querySelector(".p1Btn");
const p2BtnElm = document.querySelector(".p2Btn");

let p1Turn;
let p2Turn;
let p1Score;
let p2Score;
let winScore;
let isGameOver;

// function for initialize the value
function initializeVal() {
  p1Turn = true;
  p2Turn = false;
  p1Score = 0;
  p2Score = 0;
  winScore = 10;
  isGameOver = false;
}

initializeVal();

winScore = Math.floor(Math.random() * (20 - 5) + 5);

//function for assign in DOM
function initialDom() {
  winLuckyNumberElm.textContent = winScore;
  p1ScoreElm.textContent = p1Score;
  p2ScoreElm.textContent = p2Score;

  if (!p1Turn) {
    p1BtnElm.setAttribute("disabled", "disabled");
  }
  if (!p2Turn) {
    p2BtnElm.setAttribute("disabled", "disabled");
  }
}
initialDom();

// function take valide input for form file
function validateInput(inputVal) {
  isInValid = false;
  //validation check
  // NaN !== NaN results true if value is not real number
  if (!inputVal || inputVal !== inputVal) {
    alert("please fill the input or provide valid number");
    isInValid = true;
  }

  return isInValid;
}

function resetInput() {
  //reset the input
  luckInputElm.value = "";
}
// function for disable both button after result
function setdisableBtnOnWin() {
  p1BtnElm.setAttribute("disabled", "disabled");
  p2BtnElm.setAttribute("disabled", "disabled");
}

formElm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  //getting the value from input
  const inputVal = Number(luckInputElm.value);
  const isInvalid = validateInput(inputVal);

  if (isInvalid) {
    console.log("Some problem");
    return;
  }

  //reset the input
  resetInput();
  // set data
  winScore = inputVal;
  winLuckyNumberElm.textContent = inputVal;
});

p1BtnElm.addEventListener("click", (evt) => {
  if (p1Turn) {
    p1Score += Math.floor(Math.random() * (winScore / 2));
    p1ScoreElm.textContent = p1Score;
  }
  p1Turn = false;
  p1BtnElm.setAttribute("disabled", "disabled");

  p2Turn = true;
  p2BtnElm.removeAttribute("disabled");

  if (p1Score === winScore) {
    isGameOver = true;
    setdisableBtnOnWin();
    winnerPlyerElm.textContent = "Player 1 is winner";
  }
});

p2BtnElm.addEventListener("click", (evt) => {
  if (p2Turn) {
    p2Score += Math.floor(Math.random() * (winScore / 2));
    p2ScoreElm.textContent = p2Score;
  }
  p2Turn = false;
  p2BtnElm.setAttribute("disabled", "disabled");

  p1Turn = true;
  p1BtnElm.removeAttribute("disabled");

  if (p2Score === winScore) {
    isGameOver = true;
    setdisableBtnOnWin();

    winnerPlyerElm.textContent = "Player 2 is winner";
  }
});

resetBtnElm.addEventListener("click", () => {
  initializeVal();
  initialDom();
  winScore = Math.floor(Math.random() * (20 - 5) + 5);
});
