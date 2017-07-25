// var colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// ]
var colors = [];
var pickedColor;
var mode = true;
var gameOver = false;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1")
var message = document.getElementById("msg");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	addButtonListener();
	addSquareListener();
	reset();
}

function addButtonListener() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			mode = this.textContent == "Easy" ? false : true;
			reset();
		});
	}

	resetButton.addEventListener("click", function() {
		gameOver = false;
		reset();
	});
}

function reset() {
	colors = mode == false? genRandomColor(3) : genRandomColor(6);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	newSquareColors();
	h1.style.background = "steelblue";
	message.textContent = "";
	this.textContent = "New colors";
	gameOver = false;
	resetButton.textContent = "New Colors";
}

function newSquareColors() {
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

function addSquareListener() {
	for (var i = 0; i < squares.length; i++) {
		//squares[i].style.background = colors[i];
		squares[i].addEventListener("click", function() {
			if (gameOver) return;

			var clickedColor = this.style.background;
			// console.log(clickedColor, pickedColor);
			if (clickedColor !== pickedColor) {
				// alert(clickedColor + "\n" + pickedColor);
				this.style.background = "#232323";
				message.textContent = "Try again!";
			} else {
				message.textContent = "Correct!";
				gameOver = true;
				changeColors(pickedColor);
				resetButton.textContent = "Play Again?"
			}
		});
	}
}


function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
	h1.style.background = color;
}

function genRandomColor(num) {
	var colors = [];
	for (var i = 0; i < num; i++) {
		colors.push(randomColor());
	}
	return colors;
}

function pickColor() {
	var which = Math.floor(Math.random() * colors.length);
	return colors[which];
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}