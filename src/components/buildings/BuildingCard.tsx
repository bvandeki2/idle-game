import React from 'react';
import {
    BuildingID,
    buildingDetails,
} from '../../gamelogic/building/buildinglist';
import './BuildingCard.css';

interface Props {
    building: BuildingID;
}

function BuildingCard(props: Props) {
    return (
        <div className="Building-card">
            <span>{buildingDetails[props.building].displayName}</span>
            <br />
            <span>{props.building}</span>
        </div>
    );
}

export default BuildingCard;
