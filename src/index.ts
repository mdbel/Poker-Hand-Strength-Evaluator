import * as readline from 'readline';
import {Poker} from './poker';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const poker = new Poker();

rl.on('line', (line: string) => {
    try {
        console.log(parseLine(line));
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
});

function parseLine(line: string) {
    if (line.length) {
       return poker.getSortedHands(line);
    } else {
        throw new Error('An empty line is not allowed');
    }
}