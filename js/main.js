//
// Constants
//
var DICE_COUNT = 4;

//
// Global
var faceValue = 0;
//
// Form initialization
//
$("#roll").click(function() {
  faceValue = 0;
    $("#submissionForm").show();
    $(".correct,.fail").remove();
    var input = $("#val").val('');

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

var input = $("#val").val();
var statusArea$ = $("#statusArea");

input = parseInt(input)

if (input === faceValue) {
    $(".correct,.fail").remove();
    $("#statusArea").append($("<div class='correct'>").text("Nice Job Einstein! Play again."));


} else {
  $(".correct,.fail").remove();
  $("#statusArea").append($("<div class='fail'>").text("Keep Trying"));
}
});


// add timer performance.now();
// add remove success status X
// add failure status (one static status box) X
// on roll set status to ''
//
