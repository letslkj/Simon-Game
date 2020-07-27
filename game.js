var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; // 게임이 제시하는 패턴 저장소
var userClickedPattern = []; // 유저의 선택 패턴 저장소

var started = false; //초기 키입력으로 게임시작을 위한 변수
var level = 0;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

//게임 종료시 변수들 초기화
function startOver() {
  level = 0;
  gamePattern = [];
  started = false; //다시 키입력을 통해 재시작 가능하게 해줌
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (gamePattern.length === userClickedPattern.length)
      setTimeout(function() {
        nextSequence();
      }, 1000);

  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart")

    startOver();

    console.log("wrong");

  }

}


function nextSequence() {
  //새로운 패턴이 발생할때마다 userClickedPattern초기화
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level); //패턴발생시마다 타이틀 변경

  //랜덤숫자 0-3 생성
  var randomNumber = Math.floor(Math.random() * 4);
  //랜덤컬러변수 지정
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //깜박임
  $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
  //소리재생
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
