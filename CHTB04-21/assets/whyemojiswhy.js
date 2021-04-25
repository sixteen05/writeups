/*
1. ❓
2. Take test!
> 1
Here is a little help:

🌞 -> 26 🍨 -> 20 ❌ -> 70 🍪 -> 16 🔥 -> 72 ⛔ -> 26 🍧 -> 81 👺 -> 13 👾 -> 82 🦄 -> 42 

1. ❓
2. Take test!
> 2

You must answer 500 questions. You have only a few seconds for each question! Be fast! ⏰

Question 1:
*/

const net = require('net');
const fs = require('fs');

let isFirstTime = true, getHelp = false, isQuest = false;
let helpMap = {};

fs.writeFile('output.html', "Starts", () => {
  console.log('Starts');
});

const log = (_l) => {
  fs.appendFile('output.html', _l + "<br>", () => {
    console.log(_l);
  });
}

const client = new net.Socket();
client.connect({ port: 30774, host: '206.189.121.131' });
client.on('data', (data) => {
  lines = data.toString('utf-8');
  log(lines);
  if (isFirstTime) {
    isFirstTime = false;
    for (let line of lines.split('\n')) {
      if (line.trim() === '>') {
        client.write(`1\n`);
      }
    }
  } else if (getHelp || lines.indexOf('Here is a little help') !== -1) {
    getHelp = lines.indexOf('Take test!') === -1;
    for (let line of lines.split('\n')) {
      if (line.indexOf('->') === -1) {
        continue;
      }
      helpArr = line.trim().split(' ');
      for (let hind = 0; hind < helpArr.length; hind++) {
        helpMap[helpArr[hind].trim()] = helpArr[hind + 2].trim();
        hind = hind + 2;
      }
    }
    log(JSON.stringify(helpMap, null, 2));
    if (!getHelp) {
      client.write('2\n');
      isQuest = true;
    }
  } else if (isQuest) {
    let hasQuest = (_l) => _l.indexOf('= ?') !== -1;
    if (!hasQuest(lines)) {
      return;
    }
    for (let line of lines.split('\n')) {
      if (!hasQuest(line)) {
        continue;
      }
      for (let _k of Object.keys(helpMap)) {
        line = line.replace(new RegExp(_k, 'g'), helpMap[_k]);
      }
      log(line);
      let calc = eval(line.split('= ?')[0]);
      log(calc);
      client.write(calc + '\n');
    }
    // console.log(lines.split('\n'), hasQuest);
  }
});


