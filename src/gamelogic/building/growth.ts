import { randomBinomial } from 'd3-random';
import { ResourceKind, ResourceState } from '../state';

interface BinomialGrowth {
    type: 'binomial';
    resource: ResourceKind;
    p: number;
}
export type Growth = BinomialGrowth;

export function applyBuildingGrowth(
    resourceState: ResourceState,
    updateCount: number,
    growthKind: Growth
): ResourceState {
    switch (growthKind.type) {
        case 'binomial':
            return {
                ...resourceState,
                [growthKind.resource]:
                    resourceState[growthKind.resource] +
                    randomBinomial(updateCount, growthKind.p)(),
            };
    }
}
