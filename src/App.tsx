import React, { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import BuildingCard from './components/buildings/BuildingCard';
import BuyButton from './components/BuyButton';
import { changePage, initialPageLinks } from './components/pagelinks';
import Sidebar from './components/Sidebar';
import StatusHeader from './components/StatusHeader';
import { BuildingID } from './gamelogic/building/buildinglist';
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

    const [pagelinks, navigatePage] = useReducer(changePage, initialPageLinks);

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
            building: 'basic',
        });
    }, [gameDispatch]);

    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarActive((v) => !v);
    }, [setSidebarActive]);

    return (
        <div className="App">
            <Sidebar
                pages={pagelinks}
                active={sidebarActive}
                onDismiss={() => setSidebarActive(false)}
                onNavigate={navigatePage}
            ></Sidebar>
            <div className="Col">
                <StatusHeader
                    onTick={tick}
                    onHamburgerClick={toggleSidebar}
                    msPerTick={msPerTick}
                    resourceState={gameState.resourceState}
                />
                <div className="Primary-container">
                    <BuyButton onClick={buyBasic} building="basic" />
                    {gameState.buildings.map(
                        (building: BuildingID, i: number) => (
                            <BuildingCard building={building} key={i} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
