import './App.css';
import Calculator from './Calculator';
import numbers from "./numPad.json";
import operators from "./operatorPad.json";

function App() {
  return (
    <div className="wrapper">
      <Calculator numbers={numbers.numPad} operators={operators.operatorPad} />
    </div>
  );
}

export default App;
