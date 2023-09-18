const resultInput = document.getElementById("result");
const buttonsContainer = document.querySelector(".buttons");

// const symbolToValue = {
//     'семь': '7', 'восемь': '8', 'девять': '9', 'умножить': '*',
//     'четыре': '4', 'пять': '5', 'шесть': '6', 'разделить': '/',
//     'один': '1', 'два': '2', 'три': '3', 'плюс': '+',
//     'ноль': '0', 'сброс': 'C', 'равно': '=', 'минус': '-',
// };

const symbolToValue = {
    'Сѣдмь': '7', 'Осмь': '8', 'Дьвѧтце': '9', 'множь': '*',
    'Чѧтьре': '4', 'Пѧтьѣ': '5', 'Шєсть': '6', 'сделить': '/',
    'Одінъ': '1', 'Двѣ': '2', 'Тріеца': '3', 'сбрать': '+',
    'Нуль': '0', 'събросъ': 'C', 'такесть': '=', 'отечать': '-',
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
    '0': 'Нуль',
    '1': 'Одінъ',
    '2': 'Двѣ',
    '3': 'Тріеца',
    '4': 'Чѧтьре',
    '5': 'Пѧтьѣ',
    '6': 'Шєсть',
    '7': 'Сѣдмь',
    '8': 'Осмь',
    '9': 'Дьвѧтце'
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
