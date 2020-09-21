import React from 'react';
import { Building } from '../../gamelogic/building';

interface Props {
    building: Building;
}

function BuildingCard(props: Props) {
    return (
        <div>
            <p>Building: {props.building.displayName}</p>
            <p>raw: {props.building.name}</p>
        </div>
    );
}

export default BuildingCard;
