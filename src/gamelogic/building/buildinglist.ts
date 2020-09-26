import { MultiCost } from './cost';
import { Growth } from './growth';

export interface BuildingDetails {
    type: BuildingID;
    displayName: string;
    growth: Growth;
    cost: MultiCost;
}

export type BuildingID = 'basic';

const buildings: BuildingDetails[] = [
    {
        type: 'basic',
        displayName: 'Baseline',
        growth: {
            type: 'binomial',
            resource: 'score',
            p: 1.0,
        },
        cost: [
            {
                type: 'exponential',
                resource: 'score',
                initial: 1,
                factor: 2,
                roundToNearest: 1,
            },
        ],
    },
];

type BuildingMap = { [id in BuildingID]: BuildingDetails };
export const buildingDetails: BuildingMap = Object.fromEntries(
    buildings.map((b) => [b.type, b as BuildingDetails])
) as BuildingMap;
