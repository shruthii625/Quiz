var timer;
document.addEventListener("DOMContentLoaded", () => {
  const timeleftdisplay = document.querySelector("#timer");
  timer = parseInt(window.localStorage.getItem("timer"));
  function countdown() {
    makeQuestion();
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timeleftdisplay.innerHTML = minutes + ":" + seconds;
      console.log(timer);
      timer = timer - 1;
    }, 1000);
  }

  function fetchQuestions() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/takeround2", true);
    xhr.onload = function () {
      console.log(xhr.responseText + "response text");
      arr = JSON.parse(xhr.responseText);
      countdown();
    };
    xhr.send();
  }
  window.onload = fetchQuestions;
});

var j = parseInt(window.localStorage.getItem("j"));
var ans = "";
var correctans = "";
var comments = "";
var response = JSON.parse(window.localStorage.getItem("response"));
console.log(response);
var score = parseInt(window.localStorage.getItem("score"));
function makeQuestion() {
  if (j >= 2) {
    window.location = "image_quiz.html";
  }
  console.log(j);
  console.log(arr.length);
  console.log(arr[j].Question);
  console.log(arr[j+1].Question);
  document.getElementById("question").innerHTML = arr[j].Question;
  document.getElementById("question_kan").innerHTML = arr[j + 1].Question;
  cans = arr[j].TrueorFalse + "";
  correctans = arr[j].TrueorFalse + "/" + arr[j + 1].TrueorFalse;
  comments = arr[j].Comments + "/" + arr[j + 1].Comments;
}

function displayRightAns() {
  document.getElementById("nextbutton").disabled = true;
  document.getElementById("answer").innerHTML = correctans;
  document.getElementById("comments").innerHTML = comments;
  console.log(cans);
  console.log(ans);
  if (cans == ans) {
    score++;
  }
  response["choice" + j / 2] = ans;
  ans = "";
  console.log(response);
  console.log("SCORE", score);
  j += 2;
  window.localStorage.setItem("j", j);
  window.localStorage.setItem("response", JSON.stringify(response));
  window.localStorage.setItem("score", score);
  setTimeout(() => {
    document.getElementById("nextbutton").disabled = false;
    makeQuestion();
  }, 3000);
}

function recordAns(option) {
  if (option == 0) {
    ans = "true";
  }
  if (option == 1) {
    ans = "false";
  }
}

window.onunload = function () {
  window.localStorage.setItem("timer", timer);
};
