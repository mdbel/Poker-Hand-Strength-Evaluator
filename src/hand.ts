import * as _ from 'lodash';
import {Card} from './card';
import {Utils} from './utils/utils';
import {HandValue, ItemAmount} from './models/pocker.model';

export class Hand {
    private readonly cards: Array<Card>;
    private value: number;
    private kickers: Array<number> = [];
    private isEqualToOtherHands = false;

    constructor(private hand: string) {
        const cards = hand.split(/(?=[A-Z]|\d)/);
        this.cards = cards.map(card => new Card(card)).sort((a, b) => b.getValue() - a.getValue());
        this.calculateValue();
    }

    getHand(): string {
        return this.hand;
    }

    getHandValue(): HandValue {
        return {
            value: this.value,
            kickers: this.kickers,
            isEqualToOtherHands: this.isEqualToOtherHands
        };
    }

    setEquivalency() {
        this.isEqualToOtherHands = true;
    }

    private calculateValue() {
        if (this.isStraightFlush()) {
            this.value = 1;
        } else if (this.isFourOfKind()) {
            this.value = 2;
        } else if (this.isFullHouse()) {
            this.value = 3;
        } else if (this.isFlush()) {
            this.value = 4;
        } else if (this.isStraight()) {
            this.value = 5;
        } else if (this.isThreeOfKind()) {
            this.value = 6;
        } else if (this.isTwoPairs()) {
            this.value = 7;
        } else if (this.isPair()) {
            this.value = 8;
        } else {
            this.value = 9;
            this.kickers = this.cards.map(a => a.getValue());
        }
    }

    private isStraightFlush(): boolean {
        return this.isFlush() && this.isStraight();
    }

    private isFlush(): boolean {
        const suits = this.cards.map(card => card.getSuit()).sort();
        const rankValues = this.cards.map(card => card.getValue()).sort((a, b) => b - a);

        const isFlush = suits[0] === suits[4] || suits[suits.length - 1] === suits[suits.length - 5];
        if (isFlush) this.kickers = rankValues;
        return isFlush;
    }

    private isStraight(): boolean {
        const handRankIndexes = this.cards.map(card => card.getValue());
        const uniqueRanksIndexes = new Set(handRankIndexes);
        const uniqueRanksAmount = uniqueRanksIndexes.size;
        if (uniqueRanksAmount < 5) {
            return false;
        }
        const sortedUniqueRanksIndexes = Array.from(uniqueRanksIndexes).sort((a, b) => a - b);
        if (uniqueRanksAmount === 5) {
            return this.chekIfCardsInOrder(sortedUniqueRanksIndexes);
        } else {
            return this.chekIfCardsInOrder(sortedUniqueRanksIndexes.slice(0, 5)) || this.chekIfCardsInOrder(sortedUniqueRanksIndexes.slice(uniqueRanksAmount - 5));
        }
    }

    private isTwoPairs(): boolean {
        const ranks = this.getDuplicates().filter(d => d[1] === 2);
        const isTwo = ranks.length === 2;
        const values = ranks.map(rank => Utils.getIndexOfRank(rank[0])).sort((a, b) => a - b);
        if (isTwo) this.addKickers(values);
        return isTwo;
    }

    private isPair(): boolean {
        const rank = this.getDuplicates().find(d => d[1] === 2);
        if (!!rank) this.addKickers([Utils.getIndexOfRank(rank[0])]);
        return !!rank;
    }

    private isFullHouse(): boolean {
        return this.isThreeOfKind() && this.isPair();
    }

    private isFourOfKind(): boolean {
        const rank = this.getDuplicates().find(d => d[1] === 4);
        if (!!rank) this.addKickers([Utils.getIndexOfRank(rank[0])]);
        return !!rank;
    }

    private isThreeOfKind(): boolean {
        const rank = this.getDuplicates().find(d => d[1] === 3);
        if (!!rank) this.addKickers([Utils.getIndexOfRank(rank[0])]);
        return !!rank;
    }

    private getDuplicates(): Array<[string, number]> {
        const ranks = this.cards.map(card => card.getRank());
        const ranksAmount = this.countItems(ranks);
        return Object.entries(ranksAmount);
    }

    private addKickers(values: Array<number>) {
        this.kickers = [...this.kickers, ...values];
        const diff = _.difference(this.cards.map(a => a.getValue()), this.kickers);
        this.kickers = [...this.kickers, ...diff];
    }

    private countItems(items: Array<string | number>): ItemAmount {
        return items.reduce((obj: ItemAmount, item: string | number) => {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {});
    }

    private chekIfCardsInOrder(ranks: Array<number>): boolean {
        const isStraight = ranks.every((rankIndex: number, i: number) => {
            if (i === 0) {
                return true;
            }
            const isNextCard = rankIndex === ranks[i - 1] + 1;
            //'A' can both precede '2' and follow 'K'
            if (rankIndex === Utils.getIndexOfRank('A') && i === ranks.length - 1) {
                return isNextCard || ranks[0] === Utils.getIndexOfRank('2');
            }
            return isNextCard;
        });
        if (isStraight) this.addKickers(ranks);
        return isStraight;
    }
}