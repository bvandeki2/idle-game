import { Building, buildingHandlers } from './building';

export interface ResourceState {
    score: number;
}

export interface GameState {
    resourceState: ResourceState;
    buildings: Building[];
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
        resourceState = buildingHandlers[building.name](
            resourceState,
            updateCount
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
    building: Building;
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
