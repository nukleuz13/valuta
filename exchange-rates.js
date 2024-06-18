const baseCurrency = 'RUB'; // Базовая валюта по умолчанию
const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

const exchangeRatesElement = document.getElementById('exchangeRates');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка HTTP ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            exchangeRatesElement.innerHTML = 'Ошибка при получении курсов валют.';
        } else {
            const rates = data.rates;
            delete rates[baseCurrency]; // Удаляем базовую валюту из списка

            let exchangeRatesHTML = '';
            for (const currency in rates) {
                exchangeRatesHTML += `<p>1 ${baseCurrency} = ${rates[currency].toFixed(2)} ${currency}</p>`;
            }

            exchangeRatesElement.innerHTML = exchangeRatesHTML;
        }
    })
    .catch(error => {
        exchangeRatesElement.innerHTML = 'Произошла ошибка при обращении к серверу.';
        console.error('Ошибка:', error);
    });
