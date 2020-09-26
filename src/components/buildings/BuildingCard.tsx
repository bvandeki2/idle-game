import React from 'react';
import { BuildingDetails } from '../../gamelogic/building/buildinglist';
import './BuildingCard.css';

interface Props {
    building: BuildingDetails;
}

function BuildingCard(props: Props) {
    return (
        <div className="Building-card">
            <span>{props.building.displayName}</span>
            <br />
            <span>{props.building.growth.resource}</span>
        </div>
    );
}

export default BuildingCard;
