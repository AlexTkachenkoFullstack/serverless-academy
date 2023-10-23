# serverless-academy

03_cli_telegram_console_sender
This application helps to create a simple telegram bot that can act as notes or notepad when you need to save something urgently from the console.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local computer.
2. Navigate to the project directory.
3. Initialize local repository using `npm init`.
4. Create a telegram Bot using node-telegram-bot-api library
5. Get a telegram-token and add to the app.js as 'const TELEGRAM_TOKEN'
6. Find bot @userinfobot on Telegram and enter "/start". You will get your chat_id. Add this chat_Id to the app.js as 'const CHATID'.


## Usage

1. Enter the following command in the command line: node app.js send-message 'Your message' or node app.js m 'Your message'. Press ENTER. In your Telegram bot, you will receive the entered message 'Your message'.
2. Enter the following command in the command line: node app.js send-photo or node app.js p. Choose a photo from your computer and drag it into the console after the p-flag. Press ENTER. Your photo will be sent to your Telegram bot.
3. To view all available commands of this application, enter the following command in the command line: node app.js -h or node app.js help.
