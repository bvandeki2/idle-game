import { Cost } from './cost';
import { Growth } from './growth';

interface BuildingDetails {
    displayName: string;
    growth: Growth;
    cost: Cost;
}

export type BuildingID = 'basic';

export const buildingDetails: { [id in BuildingID]: BuildingDetails } = {
    basic: {
        displayName: 'Baseline',
        growth: {
            type: 'binomial',
            resource: 'score',
            p: 1.0,
        },
        cost: {
            type: 'exponential',
            resource: 'score',
            initial: 1,
            factor: 2,
            roundToNearest: 1,
        },
    },
};
