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

// Complete the freqQuery function below.
function freqQuery(queries) {

    const data = {};
    const frequency = {};

    const result = [];

    queries.forEach(pair => {
        const command = pair[0];
        const number = pair[1];

        if (command === 1) {
            if (!data[number]) {
                data[number] = 0;
            }

            if (frequency[data[number]]) {
                frequency[data[number]]--;
            }

            data[number]++;

            if (!frequency[data[number]]) {
                frequency[data[number]] = 0;
            }
            frequency[data[number]]++;
        }

        if (command === 2) {
            if (data[number]) {
                frequency[data[number]]--;
                data[number]--;
                if (data[number]) {
                    frequency[data[number]]++;
                }
            }
        }

        if (command === 3) {
            if (frequency[number]) {
                result.push(1);
            } else {
                result.push(0);
            }
        }

        // if (command !== 3) {
        //     console.log('=============');
        //     console.log(`command: ${command} number: ${number}`);
        //     console.log('[obabichev] data', data);
        //     console.log('[obabichev] frequency', frequency);
        // }
    });

    return result;
}

// command   data           frequency
//  (1, 1)   {1: 1}         {1: 1}
//  (1, 1)   {1: 2}         {2: 1, 1: 0}
//  (1, 1)   {1: 3}         {3: 1, 2: 0, 1: 0}
//  (1, 2)   {1: 3, 2: 1}   {3: 1, 1: 1}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
