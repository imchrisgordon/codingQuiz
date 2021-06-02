var isIncorrect = false;
var timesRun = 0;
var inter;
var currentScore;
var scores = [];

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  inter = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    currentScore = duration - (minutes * 60 + seconds);
    timesRun++;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (isIncorrect) {
      timer = timer - 15;
      isIncorrect = false;
    }
    if (timesRun == 10) {
      timesRun = 0;

      if (--timer <= 0) {
        document.getElementById("noMoreTime").classList.add("showing");
        continueTest("panel-9", true);
        display.textContent = "00:00";
        clearInterval(inter);
      } else {
        display.textContent = minutes + ":" + seconds;
      }
    }
  }, 100);
}

function startTest() {
  document.getElementById("initials").value = "";
  document.getElementById("noMoreTime").classList.remove("showing");
  let twoMinutes = 60 * 1,
    display = document.getElementById("time");
  display.classList.add("showing");
  startTimer(twoMinutes, display);
  let elem = document.getElementsByClassName("show");
  while (elem[0]) {
    elem[0].classList.remove("show");
  }
  document.getElementById("panel-2").classList.add("show");
}

function continueTest(panel, correct) {
  isIncorrect = !correct;
  let elem = document.getElementsByClassName("show");
  if (correct) {
    while (elem[0]) {
      elem[0].classList.remove("show");
    }
    var nextPanel = document.getElementById(panel);
    if (nextPanel.id == "panel-7") {
      clearInterval(inter);
    }
    nextPanel.classList.add("show");
  }
}

function enterScore() {
  scores.push({
    initials: document.getElementById("initials").value,
    score: currentScore,
  });
  document.getElementById("time").classList.remove("showing");
  var tableHtml = "";
  var sorted = scores.sort((a, b) => (a.score > b.score ? 1 : -1));
  for (var i = 0; i < sorted.length; i++) {
    tableHtml +=
      "<tr><td>" +
      (i + 1) +
      ".</td><td>" +
      sorted[i].initials +
      "</td><td>" +
      sorted[i].score +
      "</td></tr>";
  }
  document.getElementById("topScore").innerHTML = tableHtml;
  continueTest("panel-9", true);
}

function clearScores() {
  scores = [];
  continueTest("panel-1", true);
}
