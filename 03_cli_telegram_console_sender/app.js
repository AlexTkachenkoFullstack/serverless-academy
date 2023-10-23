const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const CHATID = 'ADD YOUR CHATID';
const TELEGRAM_TOKEN = 'ADD YOUR BOT"S TELEGRAM_TOKEN';

const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});
process.env.NTBA_FIX_350 = true;
const program = new Command();
program
.command('send-message <message>')
.alias('m')
.description('Send message to Telegram Bot.')
.action(async(message) => {
   await bot.sendMessage(CHATID, message); 
   process.exit();
})
program
.command('send-photo <path>')
.alias('p')
.description('Send photo to Telegram Bot. Just drag and drop it console after p-flag')
.action(async(photo) => {
        await bot.sendPhoto(CHATID, photo);
        process.exit();
})

program.parse(process.argv);
