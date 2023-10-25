const TelegramBot = require("node-telegram-bot-api");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const formatDate=require('./utils/formatDate')
const showExchangeRates=require('./utils/showExchangeRates')
const {fetchWeather, fetchWind} = require('./services/fetchWeather')
const fetchExchangeRates = require('./services/fetchExchangeRates.js')
const TELEGRAM_TOKEN = "YOUR TOKEN";
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (msg.text.toLowerCase() === "/start" || msg.text.toLowerCase()=== "start" || msg.text=== "Previous menu") {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "Weather" }],[{ text: "Exchange Rates" }],
        ],
      }),
    };
    bot.sendMessage(
      msg.from.id,
      "Select weather or exchange rates.",
      opts
    );
  }

  if (msg.text === "exit") {
    const opts = {
      reply_markup: JSON.stringify({ remove_keyboard: true }),
    };
    bot.sendMessage(msg.from.id, "Goodbye. See you later.", opts);
  }

  if (msg.text === "Weather") {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            { text: "at intervals of 3 hours" },
            { text: "at intervals of 6 hours" },
          ],
          [{ text: "Wind" }],
          [{text:"Previous menu"}]
        ],
      }),
    };
    bot.sendMessage(
      msg.from.id,
      "Select an interval to display the weather in Plymouth",
      opts
    );
  }

  if (msg.text === "at intervals of 3 hours") {
    try {
      const data = await fetchWeather();
      await bot.sendMessage(msg.from.id, data.join("\n"));
    } catch (error) {
      throw new Error(error);
    }
  }

  if (msg.text === "at intervals of 6 hours") {
    try {
      const data = await fetchWeather();
      const currentData = data.filter((_, index) => index % 2 === 0);
      await bot.sendMessage(msg.from.id, currentData.join("\n"));
    } catch (error) {
      throw new Error(error);
    }
  }

if(msg.text==="Wind"){
  try {
    const wind = await fetchWind();
    await bot.sendMessage(msg.from.id, wind);
  } catch (error) {
    throw new Error(error);
  }
}

  if (msg.text === "Exchange Rates") {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            { text: "USD" },
            { text: "EUR" },
          ],
          [{text:"Previous menu"}]
        ],
      }),
    };
    bot.sendMessage(
      msg.from.id,
      "Select currency unit",
      opts
    );
  }

  if(msg.text==="USD"){
    const currentDate=Date.now();
    const currentDateWithoutTime=formatDate(currentDate / 1000).split(' ')[0]
    try {
      const todayRate=myCache.get( "rate" )
      if(todayRate?.rateDateWithoutTime===currentDateWithoutTime){
        bot.sendMessage(msg.from.id, showExchangeRates(todayRate, "USD"))
      }else{
        const rates=await fetchExchangeRates()
        bot.sendMessage(msg.from.id, showExchangeRates(rates, "USD"))
        myCache.set( "rate", rates);
      } 
    } catch (error) {
      throw new Error(error);
    }
  }

  if(msg.text==="EUR"){
    const currentDate=Date.now();
    const currentDateWithoutTime=formatDate(currentDate / 1000).split(' ')[0]
    try {
      const todayRate=myCache.get( "rate" )
      if(todayRate?.rateDateWithoutTime===currentDateWithoutTime){
        bot.sendMessage(msg.from.id, showExchangeRates(todayRate, "EUR"))
      }else{
        const rates=await fetchExchangeRates()
        bot.sendMessage(msg.from.id, showExchangeRates(rates, "EUR"))
        myCache.set( "rate", rates);
      } 
    } catch (error) {
      throw new Error(error);
    }
  }
});

