export enum GameType {
    TEXAS_HOLDEM = 'texas-holdem',
    OMAHA_HOLDEM = 'omaha-holdem',
    FIVE_CARD_DRAW = 'five-card-draw'
}

export interface ItemAmount {
    [item: string]: number
}

export interface HandValue {
    value: number;
    kickers: Array<number>;
    isEqualToOtherHands?: boolean;
}

export  const orderedRanks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export const suits = ['h', 'd', 'c', 's'];