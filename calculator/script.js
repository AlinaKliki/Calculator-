const numbers = document.querySelectorAll ('.number');
const operators = document.querySelectorAll ('.operator');
const squares = document.getElementById ('square');
const clearBtns = document.querySelectorAll ('.clearBtn');
const results = document.getElementById ('result');
const decimals = document.getElementById ('decimal');
const minuss = document.getElementById ('minus');
const display = document.getElementById ('display');
let MemoryCurrentNumber = 0;  //память текущей цифры на табло
let MemoryNewNumber = false; //ввели мы новое число или нет - новое число, меняется на true
let MemoryPendingOperation = ''; //сохраняет ожидаемую операцию - 12+24+215-124




//цифры

for (var i =0; i<numbers.length; i++) {
	var number = numbers [i];
	number.addEventListener ('click', function (e) {
	numberPress (e.target.textContent); 
	});
};

function numberPress (number) {
if (MemoryNewNumber) {
	display.value = number;
	MemoryNewNumber = false;
	} else  {
		if (display.value === '0') {
		display.value = number;
	} else {
		display.value += number;
	};
};
};




// операторы
for (var i =0; i<operators.length; i++) {
	var operator = operators [i];
	operator.addEventListener ('click', function (e) {
	operation (e.target.textContent);
	});
};

function operation (op) {
	var localOperationMemory = display.value;

	if (MemoryNewNumber && MemoryPendingOperation !=='=') {
		display.value = MemoryCurrentNumber;
	} else {
		MemoryNewNumber = true;
		if (MemoryPendingOperation === '+') {
			MemoryCurrentNumber += parseFloat (localOperationMemory);
		} else if (MemoryPendingOperation === '-') {
			MemoryCurrentNumber -= parseFloat (localOperationMemory);
		} else if (MemoryPendingOperation === '/') {
			MemoryCurrentNumber /= parseFloat (localOperationMemory);
		} else if (MemoryPendingOperation === '*') {
			MemoryCurrentNumber *= parseFloat (localOperationMemory);
		} else if (MemoryPendingOperation === '^') {
			MemoryCurrentNumber **= parseFloat (localOperationMemory);
		} 		else {MemoryCurrentNumber = parseFloat (localOperationMemory);
		};
		display.value=MemoryCurrentNumber;
		MemoryPendingOperation = op
	};
};




// очистка экрана

for (var i =0; i<clearBtns.length; i++) {
	var clearBtn = clearBtns [i];
	clearBtn.addEventListener ('click', function (e) {
		clearPress (e.srcElement.id);
	});
};

function clearPress (id) {
	if (id === 'ce') {
		display.value = '0';
		MemoryNewNumber = true;
	} else if (id === 'c') {
		display.value = '0';
		MemoryNewNumber = true;
		MemoryCurrentNumber = 0;
		MemoryPendingOperation = '';
	};
};




// точка

decimal.addEventListener ('click', decimalPress);


function decimalPress (argument) {
	var localDecimalMemory = display.value;

	if (MemoryNewNumber) {
		localDecimalMemory = '0.';
		MemoryNewNumber = false;
	} else {
			if (localDecimalMemory.indexOf('.') === -1 ) {
			localDecimalMemory += '.';
		};		
	};
	display.value = localDecimalMemory;
};




// минус

minus.addEventListener ('click', minusPress);

function minusPress () {
	display.value = -(display.value);
};




// корень
square.addEventListener ('click', squarePress);

function squarePress () {
	display.value = Math.sqrt(parseFloat(display.value));
};
