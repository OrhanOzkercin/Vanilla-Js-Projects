gamePattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

$(".btn").click(function () {
	let userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

function nextSequence() {
	userClickedPattern = [];
	randomNumber = Math.floor(Math.random() * 4);
	randomChosenColour = buttonColors[randomNumber];

	gamePattern.push(randomChosenColour);

	level++;
	$("#level-title").text("Level " + level);
	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");

	setTimeout(() => {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}
function checkAnswer(currentLevel) {
	if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length == gamePattern.length) {
			setTimeout(() => {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		$("#level-title").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
