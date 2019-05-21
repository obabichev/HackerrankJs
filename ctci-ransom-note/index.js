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

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {

    const magazineWords = countWords(magazine);
    const noteWords = countWords(note);

    for (let word in noteWords) {

        if (!magazineWords[word] || magazineWords[word] < noteWords[word]) {
            console.log('No');
            return;
        }
    }

    console.log('Yes');
}

function countWords(words) {
    const result = {};

    for (let word of words) {
        result[word] = (result[word] || 0) + 1;
    }

    return result;
}

function main() {
    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const magazine = readLine().split(' ');

    const note = readLine().split(' ');

    checkMagazine(magazine, note);
}
