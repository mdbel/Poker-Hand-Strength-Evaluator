import {orderedRanks} from '../models/pocker.model';

export class Utils {
    static getIndexOfRank(rank: string): number {
        return orderedRanks.indexOf(rank);
    }
}