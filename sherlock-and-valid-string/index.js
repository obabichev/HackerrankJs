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

// Complete the isValid function below.
function isValid(s) {

    const letters = {};

    s.split('').forEach(letter => {
        if (!letters[letter]) {
            letters[letter] = 0;
        }
        letters[letter]++;
    });

    const distribution = {};

    Object.keys(letters).forEach(letter => {
        const count = letters[letter];

        if (!distribution[count]) {
            distribution[count] = 0;
        }
        distribution[count]++;
    });

    if (Object.keys(distribution).length === 1) {
        return 'YES';
    }

    if (Object.keys(distribution).length > 2) {
        return 'NO';
    }

    const keys = Object.keys(distribution).map(Number).sort((n1, n2) => n2 - n1);

    if (keys[0] === keys[1] + 1 && distribution[keys[0]] === 1) {
        return 'YES';
    }

    if (keys[1] === 1 && distribution[keys[1]] === 1) {
        return 'YES';
    }

    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
