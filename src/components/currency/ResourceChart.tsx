import React from 'react';
import { ResourceState } from '../../gamelogic/state';
import {
    BlueCircleAmount,
    CreditAmount,
    GreenCircleAmount,
    LandAmount,
    RedCircleAmount,
} from './CurrencyAmount';
import './ResourceChart.css';

interface Props {
    resourceState: ResourceState;
}

function ResourceChart(props: Props) {
    return (
        <div className="Chart-container">
            <div className="Chart-column">
                <CreditAmount amount={props.resourceState.score} />
                <LandAmount amount={100} />
            </div>
            <div className="Chart-column">
                <RedCircleAmount amount={104545} />
                <GreenCircleAmount amount={5} />
                <BlueCircleAmount amount={4} />
            </div>
        </div>
    );
}

export default ResourceChart;
