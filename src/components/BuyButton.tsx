import React from 'react';
import {
    BuildingID,
    buildingDetails,
} from '../gamelogic/building/buildinglist';
import './BuyButton.css';

interface Props {
    onClick: () => any;
    building: BuildingID;
}

function BuyButton(props: Props) {
    return (
        <input
            type="button"
            value={`Buy ${buildingDetails[props.building].displayName}`}
            onClick={props.onClick}
        />
    );
}

export default BuyButton;
