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

// Complete the makeAnagram function below.
function makeAnagram(a, b) {
    const lettersA = lettersCount(a);
    const lettersB = lettersCount(b);

    let count = 0;

    Object.keys(lettersA).forEach(letter => {
        if (!lettersB[letter]) {
            count += lettersA[letter];
        } else if (lettersA[letter] > lettersB[letter]) {
            count += lettersA[letter] - lettersB[letter];
        }
    });

    Object.keys(lettersB).forEach(letter => {
        if (!lettersA[letter]) {
            count += lettersB[letter];
        } else if (lettersB[letter] > lettersA[letter]) {
            count += lettersB[letter] - lettersA[letter];
        }
    });

    return count;
}

function lettersCount(str) {
    const result = {};

    str.split('').forEach(letter => {
        if (!result[letter]) {
            result[letter] = 0;
        }
        result[letter]++;
    });

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();

    const b = readLine();

    const res = makeAnagram(a, b);

    ws.write(res + '\n');

    ws.end();
}
