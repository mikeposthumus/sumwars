//
// Constants
//
var DICE_COUNT = 4;

//
// Global
var faceValue = 0;
var timerStart = 0;
var timerCheck = 0;
//
// Form initialization
//
$("#roll").click(function() {
  faceValue = 0;
  timerStart = performance.now();
    $("#submissionForm").show();
    $(".correct,.fail").remove();
    var input = $("#val").val('').focus();

    $("#val").keyup(function () {
           if (this.value.length == this.maxLength) {
             $(this).next().focus();
           }
     });

    var timer$ = $("#timer");
    var time$ = $("<div class='time'>")
    timer$.find(".time").remove();
    $("#timer").show().append(time$.text("Timer Fx Here"));
    $("#submit").show();



var diceArea$ = $("#diceArea");
diceArea$.find(".dice").remove();
    for (var i=1; i <= DICE_COUNT; i++) {
      var dice$ = $("<div class='dice'>");
      var val = Math.floor(Math.random() * 6) +1;
      faceValue += val;
      dice$.text (val);
      diceArea$.append(dice$);
    }
});

$("#submit").click(function() {
var timerCheck = Math.floor((performance.now() - timerStart)) / 1000;
var input = $("#val").val();
var statusArea$ = $("#statusArea");
input = parseInt(input)

if (input === faceValue) {
    $(".correct,.fail").remove();
    var timerEnd = timerCheck
    $("#statusArea").append($("<div class='correct'>").text("Nice work. You got it right in " + (timerEnd) + " seconds. Hit Enter to Sum again!"));
    $("#submit").hide();
    $("#roll").focus();


} else {
  $(".correct,.fail").remove();
  $("#statusArea").append($("<div class='fail'>").text("It took you " + (timerCheck) + " seconds to come up with a wrong answer... try again."));
  input = $("#val").val('').focus();
}
});


// add timer performance.now(); x
// add remove success status X
// add failure status (one static status box) X
// on roll set status to '' x
//
