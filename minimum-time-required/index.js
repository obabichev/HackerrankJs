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

// Complete the minTime function below.
function minTime(machines, goal) {
    console.log('[obabichev] checkDay(machines, 100)', checkDay(machines, 100));

    let day = 2;
    while (checkDay(machines, day) < goal) {
        day *= 2;
    }

    let step = day / 2;

    while (step > 0) {
        const items = checkDay(machines, day);

        // console.log(`day: %d, step: %d, items: %d`, day, step, items)
        if (items >= goal) {
            day -= step;
        } else {
            day += step;
        }
        if (step === 1) {
            step = 0;
        } else {
            step = div(step, 2) + step % 2;
        }
    }

    const items = checkDay(machines, day);
    if (items < goal) {
        day++;
    }
    // console.log(`day: %d, step: %d, items: %d`, day, step, items);

    return day;
}

function checkDay(machines, day) {
    return machines
        .map(m => div(day, m))
        .reduce((collector, item) => collector + item, 0);
}

function div(a, b) {
    return (a - a % b) / b;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nGoal = readLine().split(' ');

    const n = parseInt(nGoal[0], 10);

    const goal = parseInt(nGoal[1], 10);

    const machines = readLine().split(' ').map(machinesTemp => parseInt(machinesTemp, 10));

    const ans = minTime(machines, goal);

    ws.write(ans + '\n');

    ws.end();
}
