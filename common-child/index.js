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

// Complete the commonChild function below.

const solutions = [];

function commonChild(s1, s2) {
    for (let i = 0; i <= s1.length; i++) {
        solutions.push([]);
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0 || j === 0) {
                solutions[i].push(0);
            } else if (s1[i - 1] === s2[j - 1]) {
                solutions[i].push(1 + solutions[i - 1][j - 1]);
            } else {
                solutions[i].push(Math.max(
                    solutions[i - 1][j],
                    solutions[i][j - 1]
                ))
            }
        }
    }

    return solutions[s1.length][s2.length];
}

// 'qewr'
// 'aerf

//     '' q e w r
// ''  0  0 0 0 0
// a   0  0 0 0 0
// e   0  0 1 1 1
// r   0  0 1 1 2
// f   0  0 1 1 2
//
//
//
//
//

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = commonChild(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
