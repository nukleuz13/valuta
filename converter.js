function convertCurrency() {
    const inputField = document.getElementById('conversionInput');
    const resultField = document.getElementById('result');
    const userInput = inputField.value.toLowerCase();

    const match = userInput.match(/(\d+) ([a-z]{3}) in ([a-z]{3})/);
    if (!match) {
        resultField.innerHTML = 'Неверный формат запроса. Пример: 15 usd in rub';
        return;
    }

    const amount = match[1];
    const fromCurrency = match[2].toUpperCase();
    const toCurrency = match[3].toUpperCase();

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка HTTP ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                resultField.innerHTML = 'Ошибка при получении курса валют.';
            } else {
                const rate = data.rates[toCurrency];
                if (rate) {
                    const convertedAmount = amount * rate;
                    resultField.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
                } else {
                    resultField.innerHTML = 'Курс не найден.';
                }
            }
        })
        .catch(error => {
            resultField.innerHTML = 'Произошла ошибка при обращении к серверу.';
            console.error('Ошибка:', error);
        });
}
