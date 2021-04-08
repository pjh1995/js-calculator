const digits = document.querySelectorAll('.digit');
const operations = document.querySelectorAll('.operation');
const total = document.getElementById('total');
let tempNumString = '';
const calculatorParam = [];

function onClickDigit(e) {
  if (tempNumString.length === 3) {
    alert('숫자는 세 자리까지만 입력 가능합니다!');
    return false;
  }
  const inputValue = e.target.innerText;

  if (tempNumString === '' && inputValue === '0') {
    return false;
  }

  tempNumString += inputValue;
  displayInputValue(inputValue);
}

function getCalculationResult() {
  switch (calculatorParam.length) {
    case 1: {
      total.innerText = calculatorParam[0];
      break;
    }
    case 2: {
      if (tempNumString === '') {
        total.innerText = calculatorParam[0];
        break;
      } else {
        calculatorParam.push(parseInt(tempNumString));
        tempNumString = '';
      }
    }
    case 3: {
      const result = calculator(...calculatorParam);
      total.innerText = result;
      tempNumString = result;
      calculatorParam.length = 0;
    }
  }
}

function onClickOperation(e) {
  const inputValue = e.target.innerText;

  if (inputValue === '=') {
    getCalculationResult();
    return false;
  }

  if (tempNumString.length === 0) {
    alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!');
    return false;
  }

  if (calculatorParam.length === 3 || (calculatorParam.length === 2 && num !== '')) {
    alert('2개의 숫자에 대해서만 계산 가능합니다.');
    return false;
  }

  calculatorParam.push(parseInt(tempNumString));
  calculatorParam.push(inputValue);
  tempNumString = '';
  displayInputValue(inputValue);
}

function calculator(first, operator, second) {
  let result = 0;
  switch (operator) {
    case '/': {
      result = Math.floor(first / second);
      break;
    }
    case 'X': {
      result = first * second;
      break;
    }
    case '-': {
      result = first - second;
      break;
    }
    case '+': {
      result = first + second;
      break;
    }
  }
  return result;
}

function displayInputValue(text) {
  const currentTotal = total.innerText;
  total.innerText = currentTotal === '0' ? text : currentTotal + text;
}

function reset() {
  total.innerText = '0';
  tempNumString = '';
  calculatorParam.length = 0;
}

function init() {
  digits.forEach((digit) => {
    digit.addEventListener('click', onClickDigit);
  });

  operations.forEach((operation) => {
    operation.addEventListener('click', onClickOperation);
  });

  document.querySelector('.modifier').addEventListener('click', reset);
}

init();
