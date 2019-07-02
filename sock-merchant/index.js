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
// process.stdin.on('end', _ => {
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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {

    const counts = countSocks(ar);

    let countOfpairs = 0;

    for (const color of Object.keys(counts)){
        const countOfSocks = counts[color];

        countOfpairs += (countOfSocks - countOfSocks % 2) / 2
    }

    return countOfpairs;
}

// countOfSocks === 4, countOfpairs = (4 - 0) / 2 === 2
// countOfSocks === 5, countOfpairs = (5 - 1) / 2 === 2

const countSocks = socks => {
    const result = {};
    socks.forEach(sock => result[sock] = (result[sock] || 0) + 1);
    return result;
};


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = sockMerchant(n, ar);

    ws.write(result + "\n");

    ws.end();
}
