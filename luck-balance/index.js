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

const compareContests = (c1, c2) => c2[0] - c1[0];

// Complete the luckBalance function below.
function luckBalance(k, contests) {
    let totalLuck = 0;

    contests.forEach(([luck, imprortance]) => {
        if (!imprortance) {
            totalLuck += luck;
        }
    });

    contests = contests.filter(([luck, importance]) => !!importance);

    contests = contests.sort(compareContests);

    contests.forEach(([luck, _]) => {
        if (k > 0) {
            k--;
            totalLuck += luck;
        } else {
            totalLuck -= luck;
        }
    });

    return totalLuck;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    let contests = Array(n);

    for (let i = 0; i < n; i++) {
        contests[i] = readLine().split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
