import React from 'react';
import { BuildingDetails } from '../gamelogic/building/buildinglist';
import { calculateCost } from '../gamelogic/building/cost';
import './BuyButton.css';
import ResourceChart from './currency/ResourceChart';

interface Props {
    onClick: () => any;
    building: BuildingDetails;
    buildings: BuildingDetails[];
}

function BuyButton(props: Props) {
    return (
        <div className="Button-card" onClick={props.onClick}>
            <h3>{`Buy ${props.building.displayName}`}</h3>
            <ResourceChart
                resourceState={calculateCost(
                    props.buildings.map((s) => s.type),
                    props.building.type,
                    props.building.cost
                )}
            ></ResourceChart>
        </div>
    );
}

export default BuyButton;
