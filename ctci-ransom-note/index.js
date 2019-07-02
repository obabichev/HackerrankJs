'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });
//
// process.stdin.on('end', function() {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));
//
//     main();
// });

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
    const magazineWordCounts = countWords(magazine);
    const noteWordCounts = countWords(note);

    for(const word in noteWordCounts) {
        if (!magazineWordCounts[word] || noteWordCounts[word] > magazineWordCounts[word]) {
            console.log('No');
            return;
        }
    }
    console.log('Yes');
}

function countWords(words) {
    const result = {};

    words.forEach(word => {
        if (!result[word]) {
            result[word] = 0;
        }

        result[word]++;
    });

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
