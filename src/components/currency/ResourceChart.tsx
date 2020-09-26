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
    resourceState: Partial<ResourceState>;
}

function ResourceChart(props: Props) {
    return (
        <div className="Chart-container">
            <div className="Chart-column">
                <CreditAmount amount={props.resourceState.score} />
                <LandAmount amount={0} />
            </div>
            <div className="Chart-column">
                <RedCircleAmount amount={0} />
                <GreenCircleAmount amount={0} />
                <BlueCircleAmount amount={0} />
            </div>
        </div>
    );
}

export default ResourceChart;
