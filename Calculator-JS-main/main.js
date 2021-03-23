const display = document.querySelector("#display");  
document.querySelectorAll(".key").forEach( // All my key values have now onclick and if the display value is zero I want it to change it to what we type in, but if its not zero it gets added on the value//
    el => { 
    el.onclick = () => display.value = 
    display.value !== "0" ? display.value + 
    el.id : el.id;
});

const buffer = []; // This array is for to keep the number history saved while Im taking actions like add or divide//

const opCallback = opName => () => {  // I make a const with op= operator callback , I am using parsefloat because its a decimal and not a integer, if the opname is percent the current value will be x times 0.01 so we get the percentege and the display value will be the currentvalue //
    let currentVal = parseFloat(display.value);

    if (opName === "percent") { 
        currentVal *= 0.01;
        display.value = currentVal;
    }
    else { 
        if (buffer && buffer.length) { // If there are already been given value and operator it will push out the value on screen//
            buffer.push({value: currentVal });

            const result = evaluate(buffer); // We are evluating the value , so whatever the value was before will be operated by what opertion we choosing now//

            buffer.push({value: result }); // We take this result push it in to the buffer and push in the current op and then change the display value to blank so that we can put in our next op//
            buffer.push({value: opName });
            display.value = "";
        }
        else { // If the buffer is empty we putting in the current value with the new operator like add or divide but we leave the display value to nothing so that when the next value comes it will be that value//
            buffer.push({value: currentVal });
            buffer.push({value: opName });
            display.value = "";
        }
    }
}

const evaluate = buffer => { // So as we pushing it into the array we are pushing a number and a op and a another number, then we are taking the last value of array wich is our secondoperan and then it will be the op and then last value will be our firstoperhand and then the array will be empty//
    const secondOperand = buffer.pop().value; 
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;
    
    switch (operator) {  //Here we are passing the switch our operator and then we are checking if the case is add, then we want it to add the firstoperand with the secondoperand and return it, then we take a break so it doent continue//
        case "add":
            return firstOperand + secondOperand; 
            break;
        case "subtract": // Same thing here except we are subtracting not adding then leave it there//
            return firstOperand - secondOperand;
            break;
         case "multiply": //Same thing here except we multiply our operands then leave it there//
            return firstOperand * secondOperand;
            break;
        case "divide": // Same thing here except we divide our operands then leave it there//
            return firstOperand / secondOperand;
            break;
        default: //We add defualt so that when its only one value in the buffer nothing happens and it just return that value//
            return secondOperand;
    }
};


for (const opName of ["add", "subtract", "multiply", // We create new id's with the op names//
 "divide", "percent"]) {
document.querySelector(`.key[id=${opName}]`)
.onclick = opCallback(opName);
} 

document.querySelector(`.key[id="equal"]`) //This is the equal function , when we press the equal button its gonna check if the buffer is there and is there any value in it, if there is it will push then float the display value//
.onclick = () => {
    if (buffer && buffer.length) { 
        buffer.push({value: parseFloat(display.value) }
        );
        display.value = evaluate(buffer);
    }
};

document.querySelector(`.key[id="clear"]` // Here I just made display value equals to zero when you press the c button// 
.onclick =
() => {
    display.value = 0;
    buffer.length = 0;
};

document.querySelector(`.key[id="negate"]`) // Here I tried to make the negate button work , but it didnt I tried mmany opstions but none of the worked but basically I tried to make the display value negative so it doesnt matter wivh number it is it will be negatve ones you hit the negate button//
.onclick = () =>  display.value = -parseFloat(display.value);


