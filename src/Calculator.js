import { useState } from 'react';

const Calculator = (props) => {
    const numbers = props.numbers;
    const operators = props.operators;
    const [input, setInput] = useState("0");
    const [output, setOutput] = useState("");
    var result = 0;

    const handleNumInput = (event) => {// function for input display
        const value = event.target.value;
        const classList = event.target.classList;

        if (classList.contains("number")) {// if button is number
            if (input === "0") setInput(value);
            else setInput(input + value);
            setOutput(output + value);
        } else {
            switch(value) {
                case "AC": // clear button
                    setInput("0");
                    setOutput("");
                    break;
                case ".": // decimal button
                    if (input.indexOf(".") === -1) { 
                        setInput(input + value); //only add decimal point if no other decimal point exists in input string
                        if (input.length === 1 && input[0] === "0") setOutput(input + value);
                        else setOutput(output + value);
                    }
                    break;
                default:
                    break;
            }
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
                                <button className={operator.classes} id={operator.id}>{operator.label}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Calculator;