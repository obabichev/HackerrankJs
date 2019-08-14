'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

fs.readFile('input', 'utf8', function (err, data) {
    inputString = data.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the substrCount function below.
function substrCount(n, s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        result += countSpecialSubstring(s, i);
    }
    return result;
}

function countSpecialSubstring(s, i) {
    let count = 0;
    let length = 0;
    const start = i;

    while (s[start] === s[i] && length < s.length) {
        count++;
        i++;
        length++;
    }

    i++;

    while (length > 0) {
        if (s[i] !== s[start] || i === s.length) {
            return count;
        }
        length--;
        i++;
    }

    count++;
    return count;
}

countSpecialSubstring('aaa', 0);

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
