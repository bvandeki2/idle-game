import { BuildingDetails } from './building/buildinglist';
import { calculateCost } from './building/cost';
import { applyBuildingGrowth } from './building/growth';

export type ResourceKind = 'score';
export type ResourceState = { [kind in ResourceKind]: number };

export function subtractResources(
    a: Partial<ResourceState>,
    b: Partial<ResourceState>
): ResourceState {
    return {
        score: (a.score || 0) - (b.score || 0),
    };
}
export function canAfford(
    resources: ResourceState,
    cost: Partial<ResourceState>
): boolean {
    for (const prop in cost) {
        // if any cost exceeds current resources, cannot afford
        if ((cost[prop as ResourceKind] || 0) > resources[prop as ResourceKind])
            return false;
    }

    return true;
}

export interface GameState {
    resourceState: ResourceState;
    buildings: BuildingDetails[];
    lastUpdate: number | null;
}

export function loadGameState(): GameState | null {
    const save = localStorage.getItem('saveFile');
    if (save) return JSON.parse(save) as GameState;
    return null;
}

export function saveGameState(state: GameState) {
    localStorage.setItem('saveFile', JSON.stringify(state));
}

function computeResourceState(
    state: GameState,
    updateCount: number
): ResourceState {
    let resourceState = state.resourceState;

    for (const building of state.buildings) {
        resourceState = applyBuildingGrowth(
            resourceState,
            updateCount,
            building.growth
        );
    }

    return resourceState;
}

interface AssignAction {
    type: 'assign';
    newState: GameState;
}
interface FastForwardAndSaveAction {
    type: 'fastForwardAndSave';
    count: number;
    when: number;
}
interface TryPurchaseBuilding {
    type: 'tryPurchaseBuilding';
    building: BuildingDetails;
}
type GameAction = AssignAction | FastForwardAndSaveAction | TryPurchaseBuilding;
export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'assign':
            return action.newState;
        case 'fastForwardAndSave':
            const newResourceState = computeResourceState(state, action.count);
            const newState = {
                ...state,
                resourceState: newResourceState,
                lastUpdate: action.when,
            };
            saveGameState(newState);
            return newState;
        case 'tryPurchaseBuilding':
            const cost = calculateCost(
                state.buildings.map((s) => s.type),
                action.building.type,
                action.building.cost
            );
            const affordable = canAfford(state.resourceState, cost);

            if (!affordable) return state;

            return {
                ...state,
                resourceState: subtractResources(state.resourceState, cost),
                buildings: [...state.buildings, action.building],
            };
    }
}
