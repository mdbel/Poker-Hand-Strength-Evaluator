import {GameType} from './models/pocker.model';
import {Hand} from './hand';

export class Poker {

    private gameType: GameType;

    getSortedHands(line: string): string {
        const splitInputLine = line.split(' ');
        this.gameType = splitInputLine[0] as GameType;
        if (this.isGameTypeValid()) {
            const combinations = this.getCardCombinations(splitInputLine);
            const sorted = combinations.map(hand => new Hand(hand)).sort(this.compareHands);
            return this.getOutputString(sorted);
        } else {
            throw new Error('The game type is not valid');
        }
    }

    private getOutputString(hands: Array<Hand>): string {
        return hands.reduce((acc, current, i, arr) => {
            const hand = this.gameType === GameType.TEXAS_HOLDEM ? current.getHand().slice(0, 4) : current.getHand();
            if (i === 0) return hand;
            const prevHand = arr[i - 1];
            const currentHandValue = current.getHandValue();
            const prevHandValue = prevHand?.getHandValue();
            const areHandsEqual = currentHandValue.value === prevHandValue?.value && currentHandValue.isEqualToOtherHands && prevHandValue?.isEqualToOtherHands;
            const connector = areHandsEqual ? '=' : ' ';
            return `${acc}${connector}${hand}`;
        }, '');
    }

    private isGameTypeValid(): boolean {
        const availableTypes = Object.values(GameType);
        return availableTypes.includes(this.gameType);
    }

    private getCardCombinations(gameInput: Array<string>): Array<string> {
        if (gameInput.length === 1) {
            throw new Error('No cards');
        }
        this.gameType = gameInput[0] as GameType;
        if (this.gameType === GameType.TEXAS_HOLDEM) {
            if (gameInput.length === 2) {
                throw new Error('No hands');
            }
            return gameInput.slice(2).map(hand => hand + gameInput[1]);
        }
        //TODO: not supported for now
        if (this.gameType === GameType.OMAHA_HOLDEM) {
            throw new Error('Sorry, omaha-holdem is not supported yet');
        }
        return gameInput.slice(1);
    }

    private compareHands(hand1: Hand, hand2: Hand) {
        const hand1Data = hand1.getHandValue();
        const hand2Data = hand2.getHandValue();
        if (hand1Data.value > hand2Data.value) {
            return -1;
        } else if (hand1Data.value === hand2Data.value) {
            for (let i = 0; i < hand1Data.kickers.length; i++) {
                if (hand1Data.kickers[i] !== hand2Data.kickers[i]) {
                    return hand1Data.kickers[i] - hand2Data.kickers[i];
                }
            }
            hand1.setEquivalency();
            hand2.setEquivalency();
            return -1;
        } else {
            return 1;
        }
    }
}
