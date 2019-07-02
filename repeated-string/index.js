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

// Complete the repeatedString function below.
function repeatedString(s, n) {

    let result = Math.floor(n / s.length) * countA(s);

    const restLength = n % s.length;
    const restString = s.substring(0, restLength);
    result += countA(restString);

    return result;
}

// aba aba aba a

const countA = str => {
    let result = 0;
    str.split('').forEach(letter => {
        if (letter === 'a') {
            result++;
        }
    });
    return result;
};

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine(), 10);

    let result = repeatedString(s, n);

    ws.write(result + "\n");

    ws.end();
}
