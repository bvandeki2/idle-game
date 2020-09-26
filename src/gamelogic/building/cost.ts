import { ResourceKind, ResourceState } from '../state';
import { BuildingID } from './buildinglist';

interface ExponentialCost {
    type: 'exponential';
    resource: ResourceKind;
    initial: number;
    factor: number;
    roundToNearest: number;
}

export type Cost = ExponentialCost;
export type MultiCost = Cost[];

export function calculateCost(
    existingBuildings: BuildingID[],
    newBuilding: BuildingID,
    costs: MultiCost
): Partial<ResourceState> {
    let computedCost = Object.fromEntries(
        costs.map((c) => [c.resource, c.initial])
    ) as Partial<ResourceState>;

    for (const building of existingBuildings) {
        if (building === newBuilding) {
            // existing building found, increase cost accordingly
            for (const cost of costs) {
                switch (cost.type) {
                    case 'exponential':
                        computedCost[cost.resource] =
                            cost.roundToNearest *
                            Math.floor(
                                (cost.factor *
                                    (computedCost[cost.resource] as number)) /
                                    cost.roundToNearest
                            );
                        break;
                }
            }
        }
    }

    return computedCost;
}
