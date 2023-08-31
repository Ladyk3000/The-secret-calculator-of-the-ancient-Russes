const resultInput = document.getElementById("result");
const buttonsContainer = document.querySelector(".buttons");

const symbolToValue = {
    'семь': '7', 'восемь': '8', 'девять': '9', 'умножить': '*',
    'четыре': '4', 'пять': '5', 'шесть': '6','разделить': '/',
    'один': '1', 'два': '2', 'три': '3', 'плюс': '+',
    'ноль': '0', 'сброс': 'C', 'равно': '=', 'минус': '-',
};

for (const key in symbolToValue) {
    const button = document.createElement("button");
    button.textContent = key;
    buttonsContainer.appendChild(button);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

buttonsContainer.addEventListener("click", event => {
    const buttonText = event.target.textContent;
    if (symbolToValue[buttonText] === '=') {
        try {
            const expression = resultInput.value;
            const numericExpression = expression.split(' ').map(char => symbolToValue[char]).join('');
            const numericResult = eval(numericExpression);
            console.log(numericResult)
            for (const key in  numericResult.split('')){
                console.log(key)
                console.log(getKeyByValue(symbolToValue, key))
            }
            const result = str(numericResult).split('').map(char => getKeyByValue(symbolToValue, char)).join(' ');
            console.log(result)
            console.log('g')
            resultInput.value = result;
        } catch (error) {
            resultInput.value = "Околица";
        }
    } else if (symbolToValue[buttonText] === 'C') {
        resultInput.value = "";
    } else {
        resultInput.value += buttonText + ' ';
    }
});
