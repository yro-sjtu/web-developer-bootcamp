var answer = prompt("Are we there yet?");

// while (!answer.includes("yes")) {
// 	answer = prompt("Are we there yet?");
// }
while (answer.indexOf("yes") == -1) {
	answer = prompt("Are we there yet?");
}

alert("Yay, we finally made it!");