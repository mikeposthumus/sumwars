//
// Constants
//
const LEADERBOARD_KEY = "leaderboard";
const PLAYERNAME_KEY = "butts";

//
// Global
var leaderBoard = [];
if (hasSetting(LEADERBOARD_KEY)) {
    leaderBoard = readSetting(LEADERBOARD_KEY);
    updateLB();
}

var diceCount = 4;
var difficulty = 0;
var faceValue = 0;
var timerStart = 0;
var timerCheck = 0;
var clock = setInterval (stopClock, 100);
var timerArea$ = $("#timerArea");
var time$ = $("<div class='time'>");
var runPlayer2 = false;
var currentPlayerName = "";

function clockVal() {
  var t = Math.floor(performance.now() - timerStart) / 1000;
  $("#timerArea").replaceWith(time$.text(t.toFixed(2) + ' seconds'));
};

function stopClock(){
}

//
// Form initialization
//

if (hasSetting(PLAYERNAME_KEY)) {
    $('#playerName').val(readSetting(PLAYERNAME_KEY));
}

function play(playerName) {
    currentPlayerName = playerName;
    diceCount = $("#diceNumber").val();
    difficulty = $('#difficulty').val();

    faceValue = 0;

    timerStart = performance.now();

      $("#submissionForm, .time, #submit").show();
      $(".correct,.fail").remove();

      var input = $("#val").val('').focus();
      var clock = setInterval (clockVal, 100);

      function getDifficulty() {
        if (difficulty == 1) {
          return 6
        } else if (difficulty == 2) {
          return 10
        } else if (difficulty == 3) {
          return 12
        } else {
          return 20
        };
      };

      var diceArea$ = $("#diceArea");
      diceArea$.find(".dice").remove();
      for (var i=1; i <= diceCount; i++) {

        //set diceCount
        //check what dice options are slected
        //create object/array of dice mix: d6=2 d10=4 d20=3 etc.
        //gnerate dice based on array

        var dice$ = $("<div class='dice'>");
        var val = Math.floor(Math.random() * getDifficulty() + 1);
        faceValue += val;
        dice$.text (val);
        diceArea$.append(dice$);
      }
}

$("#roll").click(function() {
    var p1 = $('#playerName').val();
    var p2 = $('#playerName2').val();

    if(p2 == "") {
        //
        // 1-player mode
        //
        play(p2);
        return;
    }

    runPlayer2 = true;

    alert(p1 + " ready?");

    play(p1);
});

$('#val').keydown(function(event) {
    if (event.keyCode == 13) {
    $('#submit').focus();
       }
  });

$("#submit").click(function() {
  var timerCheck = Math.floor((performance.now() - timerStart)) / 1000;
  var input = $("#val").val();
  var statusArea$ = $("#statusArea");
  input = parseInt(input)
  var points = Math.floor(((difficulty*10) + ((diceCount*1000) ^ 2)) / timerCheck);

  if (input === faceValue) {
      $(".correct,.fail").remove();
      $("#submit, .time").hide();
      var timerEnd = timerCheck
      $("#statusArea").append($("<div class='correct'>").text("You got it right in " + (timerEnd.toFixed(2)) + " seconds. That sum was worth " + points + " points. Hit Enter to Sum again!"));
      $("#roll").focus();
      saveScore(currentPlayerName, points);

  } else {
    $(".correct,.fail").remove();
    $("#statusArea").append($("<div class='fail'>").text("It took you " + (timerCheck) + " seconds to come up with a wrong answer... try again."));
    input = $("#val").val('').focus();
  }

  if (runPlayer2) {
      var p2 = $('#playerName2').val();
      alert(p2 + " ready?");

      play(p2);
      runPlayer2 = false;
  }
});

function saveScore (playerName, points) {
  leaderBoard.push({name: playerName, points: points});
  leaderBoard = _.orderBy(leaderBoard, ['points'], ['desc']);
  updateLB();

  //save leaderBoard to local storage
  saveSetting(LEADERBOARD_KEY, leaderBoard);
  saveSetting(PLAYERNAME_KEY, playerName);
};

function updateLB () {
  $('.leader li').remove();

  for (var i = 0; i<Math.min(10, leaderBoard.length); i++) {
  $('.leader').append("<li>" + leaderBoard[i].name +" "+ Math.floor(leaderBoard[i].points)+"</li>")
};
};

function readSetting(name) {
    return JSON.parse(localStorage.getItem(name));
    // return JSON.parse(Cookies.get(name));
}

function hasSetting(name) {
    var val = localStorage.getItem(name);
    return val !== null && val !== "undefined";
    // return Cookies.get(name) !== undefined;
}

function saveSetting(name, value) {
    var json = JSON.stringify(value);
    localStorage.setItem(name, json);
    // return Cookies.get(name, json);
}
