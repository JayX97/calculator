import { useState } from 'react';

const Calculator = (props) => {
    const numbers = props.numbers;
    const operators = props.operators;
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("");
    const [resultDisplayed, setResultDisplayed] = useState(false); /* MAIN FOCUS */

    const handleNumInput = (event) => {// handler function for number, clear, and decimal point buttons
        const value = event.target.value;
        const classList = event.target.classList;
        //regexes
        const negRegex = /[+\-*/]\s[-]$/; // negative sign present at end of output
        const startingZero = /\s0$|-0$/; // zero at the start of last number in output regardless of sign
        const zeroSlice = output.slice(0, -1); // copy of current output to help slice starting zero
        var outputAppend = output;
        var inputAppend = input;


        if (classList.contains("number")) {// if button is number
            // reset display if new number is inputted after result instead of operator
            if (resultDisplayed === true) {
                outputAppend = "";
                inputAppend = "";
                setResultDisplayed(false);
            }
            // input
            if (input === "0"|| input === "/" || input === "*" || input === "+" || input === "-") setInput(value);
            else setInput(inputAppend + value);
            
            // output
            if (startingZero.test(output)) {
                if (value !== "0") setOutput(zeroSlice + value);
                else setOutput(outputAppend);
            } else {
                if (Number.isInteger(parseInt(output[output.length - 1])) || output[output.length - 1] === ".") setOutput(outputAppend + value);
                else if ((output.length === 1 && output[0] === "-") || negRegex.test(output)) setOutput(outputAppend + value); // current number starts with negative sign
                else setOutput(outputAppend + " " + value);
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
                        else setInput(inputAppend + value) //only add decimal point if no other decimal point exists in input string
                        
                        //output
                        if (output[output.length - 1] === "0") setOutput(outputAppend + value); // weird bug happens without this line
                        else if (input.length === 1 && input[0] === "0") setOutput(inputAppend + value); // current input display is 0 and only 0
                        else if (input.length === 1 && (!(Number.isInteger(parseInt(input[0]))))) setOutput(outputAppend + " 0" + value); //current input display is an operator
                        else setOutput(outputAppend + value);
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

        setResultDisplayed(false);

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
                const result = parseFloat(calcResult().toFixed(4)); // parseFloat used to remove trailing zeros
                setOutput(result.toString());
                setInput(result.toString());
                setResultDisplayed(true);
                break;
            default:
                break;
        }
    };

    const calcResult = () => {// function used to parse output string and evaluate expression
        var result = 0;
        const resultArr = output.split(" ");
        if (resultArr[0] === "") resultArr.shift(); // first element is an empty string (weird bug)
        var currentOp = "+";

        if (!Number.isInteger(parseInt(resultArr[0]))) resultArr.shift(); // array starts with operator, continue with calculation

        resultArr.forEach((currentValue) => {
            if (!Number.isInteger(parseInt(currentValue))) currentOp = currentValue;
            else {
                switch(currentOp) {
                    case "+":
                        result = parseFloat(result) + parseFloat(currentValue);
                        break;
                    case "-":
                        result = parseFloat(result) - parseFloat(currentValue);
                        break;
                    case "*":
                        result = parseFloat(result) * parseFloat(currentValue);
                        break;
                    case "/":
                        result = parseFloat(result) / parseFloat(currentValue);
                        break;
                    default:
                        break;
                }
            }
        });

        return result;
    };

    return (
        <div id="calculator">
            <div id="expression-display">{output}</div>
            <div id="display">{input}</div>
            <div id="calculator-pad">
                <div className="container row row-cols-3" id="num-pad">
                    {
                        numbers.map(number => {
                            if (number.id !== "space") {
                                return (
                                    <button onClick={handleNumInput} className={number.classes} id={number.id} value={number.label}>{number.label}</button>
                                )
                            } else { // space added between AC and "7 buttons
                                return (
                                    <div className={number.classes} id={number.id} value={number.label}></div>
                                )
                            }
                        })
                    }
                </div>
                <div className="container row row-cols-1 col-4" id="operator-pad">
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