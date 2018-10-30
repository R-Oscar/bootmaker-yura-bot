const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const petrovich = require('petrovich');

const { UsersController } = require('./controllers/usersController.js');

// replace the value below with the Telegram token you receive from @BotFather
const token = '553888317:AAEGsi1GY_srBfcXqLIOQdtT5qfW19tNleQ';
// Create a bot that uses 'polling' to fetch new updates
const options = {
  webHook: {
    port: process.env.PORT
  }
};
const url = 'https://bootmaker-yura-bot.herokuapp.com:443';
const bot = new TelegramBot(token, options);

bot.setWebHook(`${url}/bot${token}`);


const dbURL = 'mongodb://admin:qwe123@ds046067.mlab.com:46067/bmy';
const regexp = /(?:по|н?а|вы?|за|о|н[и|е]|\s|^)(ху[й|и|е|я])|(п[и|е|ё]зд)|(([е|ё]б[н]?[а|е|ё|у|ы|с|о][л|н|т|в])[аеёиоуэюя^\s])|(бля(?=[дт\s]|$))|(пид[оа]р)|(педик)|(суч?к[аи])/gi;

const regexpMap = ['хуй', 'пизда', 'ебать', 'бля(дь)', 'пидор', 'педик', 'сука'];

mongoose.connect(dbURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', () => {
  console.log('Connected!');

  bot.onText(/\/bmy(.*)/, (msg, match) => {
    (async() => {
      const chatId = msg.chat.id;
      const name = msg.from.first_name;
      const tlg_id = msg.from.id;
      const resp = match[1].replace('@BootmakerYuraBot', '').trim();

      if (resp === '') {
        if (!await UsersController.containsUser(tlg_id)) {
          return bot.sendMessage(chatId, `${name}, ты ещё не ругался матом, хуев чистоплюй!`);
        }

        let usersController = new UsersController();
        await usersController.init(tlg_id, name);

        let stringBuffer = '';
        stringBuffer += `Тааак, ебана в рот, что тут у нас, ща посмотрим, хуё-моё...\n`;
        stringBuffer += await usersController.showStats();
        stringBuffer += `Ебать ты грёбаный сапожник, ${name}`;

        bot.sendMessage(chatId, stringBuffer);
      } else {
        if (!await UsersController.containsUser(tlg_id)) {
          return bot.sendMessage(chatId, `Бля, похоже этот хуй ещё не матюгался!`);
        }

        let stringBuffer = '';

        stringBuffer += `Хочешь посмотреть статистику этого гандона, ${petrovich.male.first.genitive(resp)}?\n`;
        stringBuffer +=  await UsersController.showStatsFor(resp);
        
        bot.sendMessage(chatId, stringBuffer);
      }
    })();
  });

  bot.onText(/(.+)/, (msg, match) => {
    let badWord;

    const chatId = msg.chat.id;
    const name = msg.from.first_name;
    const tlg_id = msg.from.id;

    (async () => {
      while (badWord = regexp.exec(match[0])) {
          // bot.sendMessage(chatId, `Ах ты хуев матершинник, ${name}!`);
          let usersController = new UsersController();
          await usersController.init(tlg_id, name);

          for (let i = 1; i < badWord.length; ++i) {
            if (badWord[i]) {
              let word = regexpMap[i - 1];
              await usersController.increaseWord(word);
            }
          }
      }
    })();
    
  });

  bot.on('polling_error', (error) => {
    console.log(error);
    // console.log(error.code);  // => 'EFATAL'
  });
});
