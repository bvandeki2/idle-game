import React from 'react';
import { BuildingDetails } from '../gamelogic/building/buildinglist';
import { calculateCost } from '../gamelogic/building/cost';
import { canAfford, ResourceState } from '../gamelogic/state';
import './BuyButton.css';
import ResourceChart from './currency/ResourceChart';

interface Props {
    onClick: () => any;
    building: BuildingDetails;
    buildings: BuildingDetails[];
    resources: ResourceState;
}

function BuyButton(props: Props) {
    const cost = calculateCost(
        props.buildings.map((s) => s.type),
        props.building.type,
        props.building.cost
    );

    const affordable = canAfford(props.resources, cost);

    return (
        <div
            className="Button-card"
            onClick={affordable ? props.onClick : undefined}
        >
            <h3>{`Buy ${props.building.displayName}${
                affordable ? '' : '(cannot afford)'
            }`}</h3>
            <ResourceChart resourceState={cost}></ResourceChart>
        </div>
    );
}

export default BuyButton;
