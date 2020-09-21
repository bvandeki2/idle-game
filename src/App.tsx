import React, { useCallback, useEffect, useReducer } from 'react';
import './App.css';
import BuildingCard from './components/buildings/BuildingCard';
import BuyButton from './components/BuyButton';
import StatusHeader from './components/StatusHeader';
import { Building } from './gamelogic/building';
import { gameReducer, loadGameState } from './gamelogic/state';

function App() {
    const [gameState, gameDispatch] = useReducer(gameReducer, {
        resourceState: {
            score: 0.0,
        },
        buildings: [],
        lastUpdate: null,
    });

    const msPerTick = 5000;

    // Load game, fast-forwarding to current time
    useEffect(() => {
        const loadedState = loadGameState();
        if (loadedState != null && loadedState.lastUpdate != null) {
            gameDispatch({ type: 'assign', newState: loadedState });

            const now = new Date().getTime();
            const delta = now - loadedState.lastUpdate;
            const updateCount = Math.floor(delta / msPerTick);

            gameDispatch({
                type: 'fastForwardAndSave',
                count: updateCount,
                when: now,
            });
        }
    }, []);

    const tick = useCallback(() => {
        gameDispatch({
            type: 'fastForwardAndSave',
            count: 1,
            when: new Date().getTime(),
        });
    }, [gameDispatch]);

    const buyBasic = useCallback(() => {
        gameDispatch({
            type: 'tryPurchaseBuilding',
            building: {
                displayName: 'Basic',
                name: 'basic',
            },
        });
    }, [gameDispatch]);

    return (
        <div className="App">
            <StatusHeader
                onTick={tick}
                msPerTick={msPerTick}
                resourceState={gameState.resourceState}
            />
            <div className="Primary-container">
                <BuyButton onClick={buyBasic} />
                {gameState.buildings.map((building: Building, i: number) => (
                    <BuildingCard building={building} key={i} />
                ))}
            </div>
        </div>
    );
}

export default App;
