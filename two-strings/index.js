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

// Complete the twoStrings function below.
function twoStrings(s1, s2) {

    const charsCount = countSymbols(s1.split(''));

    for (const char of s2.split('')) {
        if (charsCount[char]) {
            return "YES";
        }
    }

    return "NO";
}

function countSymbols(symbols) {
    const result = {};

    for (let symbol of symbols) {
        result[symbol] = (result[symbol] || 0) + 1;
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s1 = readLine();

        const s2 = readLine();

        let result = twoStrings(s1, s2);

        console.log('[obabichev] result', result);

        ws.write(result + "\n");
    }

    ws.end();
}
