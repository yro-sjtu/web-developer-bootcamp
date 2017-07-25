//1.print all numbers between -10 and 19
var number = -10;
while (number <= 19) {
	console.log(number);
	number++;
}

console.clear();

//2.print all even numbers between 10 and 40
var even = 10;
while (even <= 40) {
	console.log(even);
	even += 2;
}

//3. print all odd numbers between 300 and 333
var odd = 300;
while (odd <= 333) {
	if (odd % 2 == 1) {
		console.log(odd);
	}
	odd++;
}

//4. print all numbers divisible by 5 AND 3 between 5 and 50
number = 5;
while (number <= 50) {
	if (number % 15 == 0) {
		console.log(number);
	}
	number++;
}
