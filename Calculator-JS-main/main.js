const display = document.querySelector("#display"); 
document.querySelectorAll(".key").forEach( 
    el => { 
    el.onclick = () => display.value = 
    display.value !== "0" ? display.value + 
    el.id : el.id;
});

const buffer = [];

const opCallback = opName => () => { 
    let currentVal = parseFloat(display.value);

    if (opName === "percent") { 
        currentVal *= 0.01;
        display.value = currentVal;
    }
    else {
        if (buffer && buffer.length) { 
            buffer.push({value: currentVal });

            const result = evaluate(buffer);

            buffer.push({value: result });
            buffer.push({value: opName });
            display.value = "";
        }
        else {
            buffer.push({value: currentVal });
            buffer.push({value: opName });
            display.value = "";
        }
    }
}

const evaluate = buffer => { 
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;
    
    switch (operator) { 
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
         case "multiply":
            return firstOperand * secondOperand;
            break;
        case "divide":
            return firstOperand / secondOperand;
            break;
        default:
            return secondOperand;
    }
};


for (const opName of ["add", "subtract", "multiply",
 "divide", "percent"]) {
document.querySelector(`.key[id=${opName}]`)
.onclick = opCallback(opName);
} 

document.querySelector(".equal_key").onclick = 
() => {
    if (buffer && buffer.length) { 
        buffer.push({value: parseFloat(display.value) }
        );
        display.value = evaluate(buffer);
    }
};

document.querySelector(".c_key[op=clear]")
.onclick =
() => {
    display.value = 0;
    buffer.length = 0;
};

/*const $input = document.querySelector("input");

document.querySelectorAll (".num__keys").forEach(el 
    => {
        el.onclick = () => 
        ($input.value = 
         $input.value !== "0" ? $input.value + 
         el.innerText : el.innerText);

});

const buffer = []; 

const opCallback = opName => () => { 
    let currentVal = parseFloat($input.value);
     
    if(opName === "percent") {
        currentVal *= 0.01;
        $input.value = currentVal;
    }
    else {
        if(buffer && buffer.length) {
            buffer.push({value: currentVal});

            const result = evaluate(buffer);

            buffer.push({ value: resul });
            buffer.push({vaule: opName});
            $input.value = "";
        }
        else {
            buffer.push({value: currentVal});
            buffer.push({value: opName});
            $input.value = "";        }
    }
}

const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch(operator) {
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract": 
        return firstOperand - secondOperand;
        break;
        case "multiply": 
        return firstOperand * secondOperand;
        break;
        case "divide": 
        return firstOperand / secondOperand;
        break;
        default:
        return secondOperand;
    }

};

for (const opName of ["add", "subtract",
 "multiply", "divide","percent"]) {
    document.querySelector(`.op__key[op=${opName}]`)
    .onclick = opCallback(opName);
}

*/