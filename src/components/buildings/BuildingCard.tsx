import React from 'react';
import './BuildingCard.css';
import { Building } from '../../gamelogic/building';

interface Props {
    building: Building;
}

function BuildingCard(props: Props) {
    return (
        <div className="Building-card">
            <span>Building: {props.building.displayName}</span>
            <br />
            <span>raw: {props.building.name}</span>
        </div>
    );
}

export default BuildingCard;
