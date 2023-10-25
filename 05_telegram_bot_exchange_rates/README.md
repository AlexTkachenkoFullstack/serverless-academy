# serverless-academy

05_telegram_bot_exchange_rates
This application shows the weather in Plymouth (the UK) and Exchange Rates in NBU and MonoBank.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local computer.
2. Navigate to the project directory.
3. Initialize local repository using `npm init`.
4. Create a telegram Bot using node-telegram-bot-api library
5. Get a telegram-token and add to the app.js as 'TELEGRAM_TOKEN'
6. Get Api-key on OpenWeather API (https://api.openweathermap.org/data/2.5/forecast?appid=) and add this Api-key to the services/fetchWeather.js as 'API_KEY'


## Usage

1. Enter the following command in the command line: node app.js.
2. Open your Telegram bot.
3. Type 'start' or '/start' and press ENTER.
4. Click on the "Weather" or "Exchange Rates".
5. If your choice is "Weather" - select the weather forecast display interval.After pressing you will receive weather data.
6. If your choice is "Exchange Rates"-select the currency.After pressing you will receive the exchange rates.

