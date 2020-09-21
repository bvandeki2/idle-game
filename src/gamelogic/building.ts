import { ResourceState } from './state';
import { randomBinomial } from 'd3-random';

export function asReliability(prob: number): number {
    return Math.log10(prob) + 10;
}

export interface Building {
    displayName: string;
    name: 'basic';
}

type ResourceMiddleware = (
    state: ResourceState,
    updateCount: number
) => ResourceState;

export const buildingHandlers: { [name: string]: ResourceMiddleware } = {
    basic: (state: ResourceState, updateCount: number) => {
        const add = randomBinomial(updateCount, 1.0)();
        return {
            ...state,
            score: state.score + add,
        };
    },
};
