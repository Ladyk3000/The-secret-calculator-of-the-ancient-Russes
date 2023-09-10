const resultInput = document.getElementById("result");
const buttonsContainer = document.querySelector(".buttons");

const symbolToValue = {
    'семь': '7', 'восемь': '8', 'девять': '9', 'умножить': '*',
    'четыре': '4', 'пять': '5', 'шесть': '6', 'разделить': '/',
    'один': '1', 'два': '2', 'три': '3', 'плюс': '+',
    'ноль': '0', 'сброс': 'C', 'равно': '=', 'минус': '-',
};

const numbersToText = {
    '0': 'ноль', '1': 'один', '2': 'два', '3': 'три', '4': 'четыре',
    '5': 'пять', '6': 'шесть', '7': 'семь', '8': 'восемь', '9': 'девять'
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
            const numericExpression = expression.split(' ').filter(char => char !== ' ').map(char => symbolToValue[char]).join('');
            const numericResult = eval(numericExpression);
            const roundedResult = parseFloat(numericResult.toFixed(1));
            const textResult = roundedResult.toString().split('').map(char => numbersToText[char] || char).join(' ');
            resultInput.value = textResult;
        } catch (error) {
            resultInput.value = "Ошибка";
        }
    } else if (symbolToValue[buttonText] === 'C') {
        resultInput.value = "";
    } else if (['умножить', 'разделить'].includes(buttonText)) {
        if (!resultInput.value.match(/\d$/)) return;
        resultInput.value += ` ${buttonText} на `;
    } else if (Object.keys(symbolToValue).includes(buttonText)) {
        const lastChar = resultInput.value.charAt(resultInput.value.length - 1);
        if (lastChar === ' ' || lastChar === '.') {
            resultInput.value += `${buttonText} `;
        } else {
            resultInput.value += ` ${buttonText} `;
        }
    }
});
