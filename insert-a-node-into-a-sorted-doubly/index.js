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

const DoublyLinkedListNode = class {
    constructor(nodeData) {
        this.data = nodeData;
        this.next = null;
        this.prev = null;
    }
};

const DoublyLinkedList = class {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData) {
        let node = new DoublyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
        }

        this.tail = node;
    }
};

function printDoublyLinkedList(node, sep, ws) {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            ws.write(sep);
        }
    }
}

// Complete the sortedInsert function below.

/*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     int data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */
function sortedInsert(head, data) {
    const node = new DoublyLinkedListNode(data);

    if (!head || head.data > data) {
        node.next = head;
        head.prev = node;
        return node;
    }

    const target = findLastNode(head, data);

    node.next = target.next;
    node.prev = target;
    if (target.next) {
        target.next.prev = node;
    }
    target.next = node;

    return head;
}

function findLastNode(head, data) {
    let node = head;

    while (node && node.next && node.next.data < data) {
        node = node.next;
    }

    return node;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const llistCount = parseInt(readLine(), 10);

        let llist = new DoublyLinkedList();

        for (let i = 0; i < llistCount; i++) {
            const llistItem = parseInt(readLine(), 10);
            llist.insertNode(llistItem);
        }

        const data = parseInt(readLine(), 10);

        let llist1 = sortedInsert(llist.head, data);

        printDoublyLinkedList(llist1, " ", ws)
        ws.write("\n");
    }

    ws.end();
}
