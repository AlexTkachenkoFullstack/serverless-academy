const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const formatDate = require("./utils/formatDate");
const LATITUDE = 50.376289;
const LONGITUDE = -4.143841;
const TELEGRAM_TOKEN = "YOUR TELEGRAM_TOKEN";
const API_KEY = "YOUR API_KEY";
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  if (msg.text.toLowerCase() === "/start" || msg.text.toLowerCase()=== "start") {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "Weather forecast in Plymouth" }],
          [{ text: "exit" }],
        ],
      }),
    };
    bot.sendMessage(
      msg.from.id,
      "To show the weather forecast in Plymouth, click on the button below.",
      opts
    );
  }

  if (msg.text === "exit") {
    const opts = {
      reply_markup: JSON.stringify({ remove_keyboard: true }),
    };
    bot.sendMessage(msg.from.id, "Goodbye. See you later.", opts);
  }

  if (msg.text === "Weather forecast in Plymouth") {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            { text: "at intervals of 3 hours" },
            { text: "at intervals of 6 hours" },
          ],
          [{ text: "exit" }],
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
      const data = await fetch();
      await bot.sendMessage(msg.from.id, data.join("\n"));
    } catch (error) {
      throw new Error(error);
    }
  }

  if (msg.text === "at intervals of 6 hours") {
    try {
      const data = await fetch();
      const currentData = data.filter((_, index) => index % 2 === 0);
      await bot.sendMessage(msg.from.id, currentData.join("\n"));
    } catch (error) {
      throw new Error(error);
    }
  }
});

async function fetch() {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`
  );
  const weather = response.data.list.map((item) => {
    const date = formatDate(item.dt);
    const temp = Math.round(item.main.temp) + "\u00B0C";
    const clouds = item.clouds.all + "%";
    const windSpeed = item.wind.speed + "m/s";
    const weatherParams = item.weather[0].main;
    const weatherDesc = item.weather[0].description;
    return `${date},${temp}, ${clouds}, ${windSpeed},${weatherDesc},${weatherParams}`;
  });
  return weather;
}
