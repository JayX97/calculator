import './App.css';
import Calculator from './Calculator';
import numbers from "./numPad.json";
import operators from "./operatorPad.json";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="wrapper">
      <Calculator numbers={numbers.numPad} operators={operators.operatorPad} />
      <div className="footer">
        <p>by <a id="author-link" href="https://github.com/JayX97" target="_blank">JayX97</a></p>
      </div>
    </div>
  );
}

export default App;
