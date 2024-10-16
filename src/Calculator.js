import { useState } from 'react';

const Calculator = (props) => {
    const numbers = props.numbers;
    const operators = props.operators;
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("");
    var resultArr = []; // array used to collect numbers and operators for output display and expression calculation

    const handleNumInput = (event) => {// function for input display
        const value = event.target.value;
        const classList = event.target.classList;

        if (classList.contains("number")) {// if button is number
            if (input === "0" || input === "/" || input === "X" || input === "+" || input === "-") setInput(value);
            else setInput(input + value);
            
            if (Number.isInteger(parseInt(output[output.length - 1])) || output[output.length - 1] === ".") setOutput(output + value);
            else setOutput(output + " " + value);
        } else {
            switch(value) {
                case "AC": // clear button
                    resultArr = [];
                    setInput("0");
                    setOutput("");
                    console.log(resultArr); // debugging
                    break;
                case ".": // decimal button
                    if (input.indexOf(".") === -1) {// if no decimal point exists in the current input
                        if (!(Number.isInteger(parseInt(input[0])))) setInput("0" + value); //change input display to 0. if current display is operator
                        else setInput(input + value) //only add decimal point if no other decimal point exists in input string
                        
                        if (input.length === 1 && input[0] === "0") setOutput(input + value); //current input display is 0 and only 0
                        else if (input.length === 1 && (!(Number.isInteger(parseInt(input[0]))))) setOutput(output + " 0" + value); //current input display is an operator
                        else setOutput(output + value);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const handleOperatorInput = (event) => {
        const operator = event.target.value;
        var outputAppend = output;

        if (Number.isInteger(parseInt(output[output.length - 1]))) {
            outputAppend = outputAppend + " ";
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
            case "-":
                setInput("-");
                setOutput(outputAppend + "-");
                break;
            case "=":
                console.log(resultArr); // debugging
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