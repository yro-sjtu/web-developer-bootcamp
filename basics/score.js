var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var numInput = document.querySelector("input");
var winningScoreDisplay = document.querySelector("p span");
var player1 = document.querySelector("#player1");
var player2 = document.querySelector("#player2");
var reset = document.querySelector("#reset");

var score1 = 0;
var score2 = 0;
var maxScore = 5;

var gameOver = false;

player1.addEventListener("click", function() {
	if (!gameOver) {
		score1++;
		if (score1 === maxScore) {
			gameOver = true;
			p1Display.classList.add("winner");
		}
	}
	p1Display.textContent = score1;
});

player2.addEventListener("click", function() {
	if (!gameOver) {
		score2++;
		if (score2 === maxScore) {
			gameOver = true;
			p2Display.classList.add("winner");
		}
	}
	p2Display.textContent = score2;
})

reset.addEventListener("click", function() {
	resetScore();
})

numInput.addEventListener("change", function() {
	winningScoreDisplay.textContent = this.value;
	maxScore = Number(this.value);
	resetScore();
})

function resetScore() {
	gameOver = false;
	score1 = 0;
	score2 = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
}

