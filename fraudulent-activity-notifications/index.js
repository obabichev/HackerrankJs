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

// Complete the activityNotifications function below.
function activityNotifications(expenditure, d) {

    let result = 0;

    const trail = expenditure.slice(0, d);
    trail.sort(compareNumber);

    for (let i = d; i < expenditure.length; i++) {
        const m = median(trail);

        if (m <= expenditure[i]) {
            result++;
        }

        change(trail, expenditure[i - d], expenditure[i]);
    }

    return result;
}

const compareNumber = (num1, num2) => num1 - num2;

function median(arr) {
    if (arr.length % 2 === 1) {
        return 2 * arr[(arr.length - 1) / 2];
    } else {
        return (arr[arr.length / 2] + arr[arr.length / 2 - 1]);
    }
}

function change(arr, from, to) {
    if (from === to) {
        return;
    }

    let i = arr.indexOf(from);

    if (to > from) {
        while (i < arr.length - 1 && arr[i + 1] < to) {
            arr[i] = arr[i + 1];
            i++;
        }
        arr[i] = to;
    }

    if (to < from) {
        while (i > 0 && arr[i - 1] > to) {
            arr[i] = arr[i - 1];
            i--;
        }
        arr[i] = to;
    }

    return arr;
}

// [1, 2, 3, 4, 6] from=2 to=5
// i = 1, to > from
// [1, 3, 3, 4, 6], i = 2
// [1, 3, 4, 4, 6], i = 3
// [1, 3, 4, 5, 6]
// console.log('[obabichev] change([1, 2, 3, 4, 6], 2, 10)', change([1, 2, 3, 4, 6], 2, 10));

// [1, 3, 4, 6] from=6 to=2
// i = 3
// [1, 3, 4, 4], i = 2
// [1, 3, 3, 4], i = 1
// [1, 2, 3, 4]
// console.log('[obabichev] change([1, 3, 4, 6], 6, 2)', change([1, 3, 4, 6], 6, 2));



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}
