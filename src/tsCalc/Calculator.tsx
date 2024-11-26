import { MutableRefObject, useRef, useState } from "react";

export class Calculator {
  calculate(num1: number, num2: number, calculationType: string): string {
    let result: number;
    switch (calculationType) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        result = num1 / num2;
        break;
      default:
        throw new Error('Invalid calculation type');
    }
    return result.toString();
  }
}

// TODO: calculator can't handle decimals -- probably going to scrap the calculator when I have something better to replace it with
export default function CalculatorComponent() {
const [screenValue, setScreenValue] = useState('0');
const num1: MutableRefObject<number> = useRef(10);
const num2: MutableRefObject<number> = useRef(20);
const calcType: MutableRefObject<string> = useRef("");
const calculator = new Calculator();
const translateCalcType = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}

const calcStyle = {
  border: '1px solid black',
  padding: '0px',
  width: 'fit-content',
  minWidth: '200px',
  minHeight: '300px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2'
}
const handleClick = (value: string) => {
  const checkNumber = value.match(/^[0-9]$/);
  const checkCalcType =  value === 'add' || value === 'subtract' || value === 'multiply' || value === 'divide';
  if (screenValue === '0') {
    if(!checkNumber) return;
    setScreenValue(value);
  } else {
    setScreenValue(screenValue + value);
  }
  if (checkCalcType) {
    if (screenValue === '0') return
    num1.current = parseInt(screenValue);
    calcType.current = value;
    setScreenValue(screenValue + translateCalcType[value]);
  }
  if (value === '=') {
    let afterCalc = screenValue.split(translateCalcType[calcType.current as keyof typeof translateCalcType]);
    num2.current = parseInt(afterCalc[1]);
    setScreenValue(calculator.calculate(num1.current, num2.current, calcType.current));
  }
  // setScreenValue(screenValue === '0' ? value : screenValue + value);
}
  return (
    <div style={calcStyle}>
      <h3 style={{padding: '0px'}}>Calculator</h3>
      <input type="text" placeholder="0" value={screenValue} readOnly/>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <tbody>
        <tr>
            <td><button onClick={() => handleClick('7')}>7</button></td>
            <td><button onClick={() => handleClick('8')}>8</button></td>
            <td><button onClick={() => handleClick('9')}>9</button></td>
            <td><button onClick={() => handleClick('divide')}>/</button></td>
          </tr>
          <tr>
            <td><button onClick={() => handleClick('4')}>4</button></td>
            <td><button onClick={() => handleClick('5')}>5</button></td>
            <td><button onClick={() => handleClick('6')}>6</button></td>
            <td><button onClick={() => handleClick('multiply')}>*</button></td>
          </tr>
          <tr>
            <td><button onClick={() => handleClick('1')}>1</button></td>
            <td><button onClick={() => handleClick('2')}>2</button></td>
            <td><button onClick={() => handleClick('3')}>3</button></td>
            <td><button onClick={() => handleClick('subtract')}>-</button></td>
          </tr>
          <tr>
            <td><button onClick={() => handleClick('0')}>0</button></td>
            <td><button onClick={() => handleClick('.')}>.</button></td>
            <td><button onClick={() => handleClick('=')}>=</button></td>
            <td><button onClick={() => handleClick('add')}>+</button></td>
          </tr>
          <tr>
            <td colSpan={4}><button onClick={() => setScreenValue('0')}>Clear</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}