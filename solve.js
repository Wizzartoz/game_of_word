const words = [];

const chainList = [];
const wordList = [];
const current = [];

const fs = require('fs');

try {
    const data = fs.readFileSync('file.txt', 'UTF-8');
    const lines = data.split(/\r?\n/)
    lines.forEach(line => {
        words.push(line);
    })
} catch (err) {
    console.error(err)
}

function createChain(current, words, wordList, chainList) {
    let isChain = false;
    for (let index = 0; index < words.length; index++) {
        if ((current.length === 0
                || current[current.length - 1].slice(-1) === words[index].toLowerCase().charAt(0))
                && !wordList.includes(index)) {
            current.push(words[index]);
            isChain = true;
            wordList.push(index);
            createChain(current, words, wordList, chainList);
        }
    }
    if (!isChain) {
        chainList.push(current.slice());
    }
    current.pop();
    wordList.pop();
}

createChain(current, words, wordList, chainList);
console.log(chainList.sort()[0].join(" "));