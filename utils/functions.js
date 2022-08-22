const capitalize = ([firstLetter, ...restOfWord]) =>
  `${firstLetter.toUpperCase()}${restOfWord.join('')}`;

module.exports = capitalize;
