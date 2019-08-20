
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

// Complete the triplets function below.
function triplets(a, b, c) {
    const compare = (n1, n2) => n1 - n2;
    const delDuplicates = (num, index, arr) => index === 0 || num !== arr[index - 1];

    a = a.sort(compare).filter(delDuplicates);
    b = b.sort(compare).filter(delDuplicates);
    c = c.sort(compare).filter(delDuplicates);

    let i = -1;
    let j = -1;

    let result = 0;

    b.forEach(current => {
        while (i < a.length - 1 && a[i + 1] <= current) {
            i++;
        }
        while (j < c.length - 1 && c[j + 1] <= current) {
            j++;
        }

        result += (i + 1) * (j + 1);
    });

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const lenaLenbLenc = readLine().split(' ');

    const lena = parseInt(lenaLenbLenc[0], 10);

    const lenb = parseInt(lenaLenbLenc[1], 10);

    const lenc = parseInt(lenaLenbLenc[2], 10);

    const arra = readLine().split(' ').map(arraTemp => parseInt(arraTemp, 10));

    const arrb = readLine().split(' ').map(arrbTemp => parseInt(arrbTemp, 10));

    const arrc = readLine().split(' ').map(arrcTemp => parseInt(arrcTemp, 10));

    const ans = triplets(arra, arrb, arrc);

    ws.write(ans + '\n');

    ws.end();
}
