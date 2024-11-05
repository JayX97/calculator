import { useState } from 'react';

const Calculator = (props) => {
    const numbers = props.numbers;
    const operators = props.operators;
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("");

    const handleNumInput = (event) => {// handler function for number, clear, and decimal point buttons
        const value = event.target.value;
        const classList = event.target.classList;
        //regexes
        const negRegex = /[+\-*/]\s[-]$/; // negative sign present at end of output
        const startingZero = /\s0$|-0$/; // zero at the start of last number in output regardless of sign
        const zeroSlice = output.slice(0, -1); // copy of current output to help slice starting zero


        if (classList.contains("number")) {// if button is number
            //input
            if (input === "0"|| input === "/" || input === "*" || input === "+" || input === "-") setInput(value);
            else setInput(input + value);
            
            //output
            if (startingZero.test(output)) {
                if (value !== "0") setOutput(zeroSlice + value);
                else setOutput(output);
            } else {
                if (Number.isInteger(parseInt(output[output.length - 1])) || output[output.length - 1] === ".") setOutput(output + value);
                else if ((output.length === 1 && output[0] === "-") || negRegex.test(output)) setOutput(output + value); // current number starts with negative sign
                else setOutput(output + " " + value);
            }
        } else {
            switch(value) {
                case "AC": // clear button
                    setInput("0");
                    setOutput("");
                    break;
                case ".": // decimal button
                    if (input.indexOf(".") === -1) {// if no decimal point exists in the current input
                        //input
                        if (!(Number.isInteger(parseInt(input[0])))) setInput("0" + value); //change input display to 0. if current display is operator
                        else setInput(input + value) //only add decimal point if no other decimal point exists in input string
                        
                        //output
                        if (output[output.length - 1] === "0") setOutput(output + value); // weird bug happens without this line
                        else if (input.length === 1 && input[0] === "0") setOutput(input + value); // current input display is 0 and only 0
                        else if (input.length === 1 && (!(Number.isInteger(parseInt(input[0]))))) setOutput(output + " 0" + value); //current input display is an operator
                        else setOutput(output + value);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const handleOperatorInput = (event) => {// handler function for operator buttons
        const operator = event.target.value;
        // regexes
        const oneOp = /[+\-*/]$/; // one operator without additional minus at the end
        const twoOp = /[+\-*/]\s[-]$/; // two operators with minus being last
        var outputAppend = output;

        // negative sign check
        if (output.length > 1 && oneOp.test(output) && !twoOp.test(output)) {
            if (operator === "-") outputAppend = outputAppend + " ";
            else outputAppend = outputAppend.slice(0, -1);
        } else if (output.length > 1 && twoOp.test(output)) {
            if (operator !== "-") outputAppend = outputAppend.slice(0, -3);
            else outputAppend = outputAppend.slice(0, -1);
        }

        // check last character for output
        else if (Number.isInteger(parseInt(output[output.length - 1])) && output[output.length - 1] !== ".") {// last character is number
            outputAppend = outputAppend + " ";
        } else if (output[output.length - 1] === ".") {//add zero if last character is decimal point
            outputAppend = outputAppend + "0 ";
        } else {
            outputAppend = outputAppend.slice(0, -1);
        }

        switch(operator) {
            case "/":
                setInput("/");
                setOutput(outputAppend + "/");
                break;
            case "X":
                setInput("*");
                setOutput(outputAppend + "*");
                break;
            case "+":
                setInput("+");
                setOutput(outputAppend + "+");
                break;
            case "-": // with negative sign check
                setInput("-");
                setOutput(outputAppend + "-")
                break;
            case "=": // COMPUTE EXPRESSION HERE
                const resultArr = output.split(" ");
                resultArr.shift(); // first element is an empty string
                console.log(resultArr); // debugging
                console.log(output.length);
                break;
            default:
                break;
        }
    };

    return (
        <div id="calculator">
            <div id="expression-display">{output}</div>
            <div id="display">{input}</div>
            <div id="calculator-pad">
                <div id="num-pad">
                    {
                        numbers.map(number => {
                            return (
                                <button onClick={handleNumInput} className={number.classes} id={number.id} value={number.label}>{number.label}</button>
                            )
                        })
                    }
                </div>
                <div id="operator-pad">
                    {
                        operators.map(operator => {
                            return (
                                <button onClick={handleOperatorInput} className={operator.classes} id={operator.id} value={operator.label}>{operator.label}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Calculator;