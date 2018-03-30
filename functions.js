let users = {
  addUser(name, dictionary = []) {
    this[name] = {
      dictionary: [],

      addWord(word) {
        this.dictionary.push({
          word,
          occurence: 1
        })
      },

      increaseWord(word) {
        let w = this.dictionary.find(el => el.word === word);
        if (!w) {
          return false;
        }

        w.occurence++;
        return true;
      },

      showStats(word) {
        if (word === undefined) {
          let stringBuffer = '';
          this.dictionary.forEach(el => {
            stringBuffer += `Слово: ${el.word}, частота использования: ${el.occurence}\n`;
          });

          return stringBuffer;
        }
      },

      containsWord(word) {
        if (this.dictionary.find(el => el.word === word) === undefined) return false;
        return true;
      }
    };
    Object.defineProperty(this[name], 'addWord', { enumerable: false });
    Object.defineProperty(this[name], 'increaseWord', { enumerable: false });
    Object.defineProperty(this[name], 'showStats', { enumerable: false });
    Object.defineProperty(this[name], 'containsWord', { enumerable: false });
  },

  containsUser(name) {
    return name in users;
  }
};

// users.Oscar.addWord('word');
// users.Oscar.increaseWord('word');

// let users = {
//   Oscar: {
//     dictionary: [{
//       word: 'хуй',
//       occurence: 5
//     }]
//   }
// }

exports.users = users;