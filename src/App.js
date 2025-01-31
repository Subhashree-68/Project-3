import { useEffect, useState } from 'react';
import './App.css';
import moon from "./assets/moon1.png"
import sun from './assets/sun3.png';
import Header from './components/Header/Header';
import KeyPad from './components/KeyPad/KeyPad';

const usedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history")) || []);

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;
    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key)
      setExpression(expression + key)
    }
    else if (operators.includes(key)) {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;
      setExpression(expression + key);
    }
    else if (key === ".") {
      if (!expression) return
      const lastChar = expression.slice(-1)
      if (!numbers.includes(lastChar)) return
      setExpression(expression + key);
    }
    else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    }
    else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);
      const tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, -1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
    return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1)
    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  }

  useEffect(()=>{
    localStorage.setItem("calculator-app-mode",JSON.stringify(darkMode))
  },[darkMode])

  useEffect(()=>{
    localStorage.setItem("calculator-app-history",JSON.stringify(history))
  },[history])


  return (
    <div className="App" data-theme={darkMode ? "dark" : ""} onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)} tabIndex="0">
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div className="app_calculator_navbar_toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className={`app_calculator_navbar_toggle_circle ${darkMode ? "app_calculator_navbar_toggle_circle_active" : ""}`}>
            </div>
          </div>
          <img src={darkMode ? moon : sun} alt="" />
        </div>
        <Header expression={expression} result={result} history={history} />
        <KeyPad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
