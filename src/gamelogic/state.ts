import { BuildingDetails } from './building/buildinglist';
import { applyBuildingGrowth } from './building/growth';

export type ResourceKind = 'score';
export type ResourceState = { [kind in ResourceKind]: number };

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
            return {
                ...state,
                buildings: [...state.buildings, action.building],
            };
    }
}
