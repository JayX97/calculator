const Calculator = (props) => {
    const numbers = props.numbers;
    const operators = props.operators;

    return (
        <div id="calculator">
            <div id="expression-display">Expression</div>
            <div id="display">Input</div>
            <div id="calculator-pad">
                <div id="num-pad">
                    {
                        numbers.map(number => {
                            return (
                                <button className={number.classes} id={number.id}>{number.label}</button>
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