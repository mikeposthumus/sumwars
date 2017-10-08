//
// Constants
//


//
// Global
var diceCount = 4;
var faceValue = 0;
var timerStart = 0;
var timerCheck = 0;
var clock = setInterval (stopClock, 100);
var timerArea$ = $("#timerArea");
var time$ = $("<div class='time'>")

function clockVal() {
  var t = Math.floor(performance.now() - timerStart) / 1000;
  $("#timerArea").replaceWith(time$.text(t + ' seconds'));
};

function stopClock(){
}

//
// Form initialization
//
$("#roll").click(function() {
  diceCount = $("#diceNumber").val();
  faceValue = 0;
  timerStart = performance.now();
    $("#submissionForm, .time, #submit").show();
    $(".correct,.fail").remove();
    var input = $("#val").val('').focus();
    var clock = setInterval (clockVal, 100);

var diceArea$ = $("#diceArea");
diceArea$.find(".dice").remove();
    for (var i=1; i <= diceCount; i++) {

      //set diceCount
      //check what dice options are slected
      //create object/array of dice mix: d6=2 d10=4 d20=3 etc.
      //gnerate dice based on array

      var dice$ = $("<div class='dice'>");
      var val = Math.floor(Math.random() * 6) +1;
      faceValue += val;
      dice$.text (val);
      diceArea$.append(dice$);
    }

});

$('#val').keydown(function(event) {
    if (event.keyCode == 13) {
    $('#submit').focus();
       }
  });

//$('#val').keyup(function(event) {
  //  if (event.keyCode == 13) {
  //      this.form.submit();
    //    return false;
  //     }
  //});

$("#submit").click(function() {
var timerCheck = Math.floor((performance.now() - timerStart)) / 1000;
var input = $("#val").val();
var statusArea$ = $("#statusArea");
input = parseInt(input)

if (input === faceValue) {
    $(".correct,.fail").remove();
    $("#submit, .time").hide();
    var timerEnd = timerCheck
    $("#statusArea").append($("<div class='correct'>").text("Nice work. You got it right in " + (timerEnd) + " seconds. Hit Enter to Sum again!"));
    $("#roll").focus();


} else {
  $(".correct,.fail").remove();
  $("#statusArea").append($("<div class='fail'>").text("It took you " + (timerCheck) + " seconds to come up with a wrong answer... try again."));
  input = $("#val").val('').focus();
}
});
