var userInput = prompt("What would you like to do?");
var list = [];

while (userInput !== "quit") {
	if (userInput === "new") {
		addTodos();
	} else if (userInput === "list") {
		listTodos();
	} else if (userInput == "delete") {
		deleteTodos();
	}
	userInput = prompt("what would you like to do?");
}

function addTodos() {
	var newTodo = prompt("Enter a new todo");
	console.log(newTodo + " is added to the todo list");
	list.push(newTodo);
}

function listTodos() {
	console.log("*********");
	list.forEach(function(todo, i) {
		console.log(i + " " + todo);
	});
	console.log("*********");
}

function deleteTodos() {
	var index = prompt("Enter index of todo to delete");
	if (index < 0 || index > list.length) {
		alert("not valid index in delete");
	}
	var tobedeleted = list.splice(index, 1);
	console.log("Todo List Removed: " + tobedeleted);
}
