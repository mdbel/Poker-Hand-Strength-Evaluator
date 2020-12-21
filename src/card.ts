import {Utils} from './utils/utils';
import {orderedRanks, suits} from './models/pocker.model';

export class Card {
    private readonly rank: string;
    private readonly suit: string;

    constructor(card: string) {
        if (this.isCardValid(card)) {
            this.rank = card[0];
            this.suit = card[1];
        } else {
            throw new Error(`${card} is not valid`);
        }
    }

    getRank(): string {
        return this.rank;
    }

    getSuit(): string {
        return this.suit;
    }

    getValue(): number {
        return Utils.getIndexOfRank(this.rank);
    }

    isCardValid(card: string): boolean {
        return card.length === 2 && orderedRanks.includes(card[0]) && suits.includes(card[1]);
    }
}