const TelegramBot = require('node-telegram-bot-api');

const { users } = require('./functions.js');

// replace the value below with the Telegram token you receive from @BotFather
const token = '553888317:AAEGsi1GY_srBfcXqLIOQdtT5qfW19tNleQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// const regexp = /(хуй)|(пизда)/g;
const regexp = /(?:по|н?а|вы?|за|о|н[и|е]|\s|^)(ху[й|и|е|я])|(п[и|е|ё]зд)|([е|ё]б[н]?[а|е|ё|у|ы|с|о][л|н|т|в])|((?:вы|по|^|\s)бля[дт\s])|(пид[оа]р)|(педик)|(суч?к[аи])/;

const regexpMap = ['хуй', 'пизда', 'ебать', 'бля(дь)', 'пидор', 'педик', 'сука'];

bot.onText(/\/bmy(.*)/, (msg, match) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;
  const resp = match[1].replace('@BootmakerYuraBot', '').trim();

  if (resp === '') {
    if (!users[name]) {
      return bot.sendMessage(chatId, `${name}, ты ещё не ругался матом, хуев чистоплюй!`);
    }

    let stringBuffer = '';

    stringBuffer += `Тааак, ебана в рот, что тут у нас, ща посмотрим, хуё-моё...\n`;
    stringBuffer += users[name].showStats();
    stringBuffer += `Ебать ты грёбаный сапожник, ${name}`;

    bot.sendMessage(chatId, stringBuffer);
  } else {
    if (!users[resp]) {
      return bot.sendMessage(chatId, `Бля, похоже этот хуй ещё не матюгался!`);
    }

    let stringBuffer = '';

    stringBuffer += `Хочешь посмотреть статистику этого гандона, ${resp}?\n`;
    stringBuffer += users[resp].showStats();
    
    bot.sendMessage(chatId, stringBuffer);
  }
});

bot.onText(/(.+)/, (msg, match) => {
  let badWords = match[0].match(regexp);

  console.log(badWords, 'badWords');

  // console.log(match);
  // console.log(badWords);

  if (!badWords) return;

  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  // bot.sendMessage(chatId, `Ах ты хуев матершинник, ${name}!`);

  if (!users.containsUser(name)) {
    users.addUser(name);
  }

  badWords.forEach((el, i) => {
    if (i !== 0)
      console.log(el);
    if (el && i !== 0) {
      let word = regexpMap[i - 1];

      if (users[name].containsWord(word)) {
        users[name].increaseWord(word);
      } else {
        users[name].addWord(word);
      }
    }
  }
  );
});

bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});