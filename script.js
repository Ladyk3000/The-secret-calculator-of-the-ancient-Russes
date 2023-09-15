const resultInput = document.getElementById("result");
const buttonsContainer = document.querySelector(".buttons");

// const symbolToValue = {
//     'семь': '7', 'восемь': '8', 'девять': '9', 'умножить': '*',
//     'четыре': '4', 'пять': '5', 'шесть': '6', 'разделить': '/',
//     'один': '1', 'два': '2', 'три': '3', 'плюс': '+',
//     'ноль': '0', 'сброс': 'C', 'равно': '=', 'минус': '-',
// };

const symbolToValue = {
    'серебрячок': '7', 'золотничок': '8', 'девятичок': '9', 'множь': '*',
    'осьмушка': '4', 'подувичок': '5', 'медичок': '6', 'сделить': '/',
    'целковый': '1', 'полушка': '2', 'четвертушка': '3', 'сбрать': '+',
    'ноль': '0', 'събросъ': 'C', 'такесть': '=', 'отечать': '-',
};

// const numbersToText = {
//     '0': 'ноль',
//     '1': 'один',
//     '2': 'два',
//     '3': 'три',
//     '4': 'четыре',
//     '5': 'пять',
//     '6': 'шесть',
//     '7': 'семь',
//     '8': 'восемь',
//     '9': 'девять'
// };

const numbersToText = {
    '0': 'ноль',
    '1': 'целковый',
    '2': 'полушка',
    '3': 'четвертушка',
    '4': 'осьмушка',
    '5': 'подувичок',
    '6': 'медичок',
    '7': 'серебрячок',
    '8': 'золотничок',
    '9': 'девятичок'
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
            resultInput.value = roundedResult.toString().split('').map(char => numbersToText[char] || char).join(' ');
        } catch (error) {
            resultInput.value = "Околица";
        }
    } else if (symbolToValue[buttonText] === 'C') {
        resultInput.value = "";
    } else if (['множь', 'сделить'].includes(buttonText)) {
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
