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

// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
    const letters = s.split('');
    const N = letters.length;

    const keys = {};

    for (let i = 0; i < N; i++) {
        const distribution = {};
        for (let j = i; j < N; j++) {
            const letter = letters[j];
            if (!distribution[letter]) {
                distribution[letter] = 0;
            }
            distribution[letter]++;
            const key = genKey(distribution);
            if (!keys[key]) {
                keys[key] = 0;
            }
            keys[key]++;
        }
    }

    let result = 0;
    Object.keys(keys).forEach(key => {
        const num = keys[key];
        result += num * (num - 1) / 2;
    });

    return result;
}

// { a:2, b:2} -> 'a2b2'
function genKey(distribution) {
    return Object.keys(distribution)
        .sort()
        .map(letter => `${letter}${distribution[letter]}`)
        .join('');
}

// abba
// a
// ab
// abb -> a1b2
// abba -> a2b2
//  b
//  bb
//  bba - a1b2
//   b
//   ba
//    a

// aaa
// a
// aa
// aaa
//  a
//  aa
//   a

// 'a' - 20
// 20 * 19 / 2

// 'a' 'a' 'a'
// 3 * 2 / 2

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = sherlockAndAnagrams(s);

        ws.write(result + "\n");
    }

    ws.end();
}
