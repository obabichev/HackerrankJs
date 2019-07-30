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

// Complete the minimumBribes function below.
function minimumBribes(q) {
    let result = 0;
    for (let i = 0; i < q.length; i++) {
        q[i]--;
    }

    for (let i = 0; i < q.length; i++) {
        const current = q[i];

        const diff = q[i] - i;
        if (diff > 2) {
            console.log('Too chaotic');
            return;
        }

        for (let j = Math.max(current - 1, 0); j < i; j++) {
            if (q[j] > current) {
                result++;
            }
        }
    }

    console.log(result);
}

// 0 1 2 3 4 5 6 7
// 0 1 2 4 3 5 6
// 0 1 4 2 3 5 6
// 0 1 4 2 5 3 6
// 0 1 4 5 2 3 6



// 1 0 4 2 3
// i === 1
// q[i] === 0


function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const q = readLine().split(' ').map(qTemp => parseInt(qTemp, 10));

        minimumBribes(q);
    }
}
