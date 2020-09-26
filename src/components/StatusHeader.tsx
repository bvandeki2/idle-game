import React from 'react';
import { ResourceState } from '../gamelogic/state';
import ResourceChart from './currency/ResourceChart';
import ProgressBar from './ProgressBar';
import './StatusHeader.css';

interface Props {
    msPerTick: number;
    resourceState: ResourceState;
    onTick: () => any;
    onHamburgerClick: () => any;
}

function StatusHeader(props: Props) {
    const { msPerTick, onTick, resourceState } = props;

    return (
        <header className="Status-header">
            <div className="row">
                <span id="hamburger" onClick={props.onHamburgerClick}>
                    hamburger
                </span>
                <ResourceChart resourceState={resourceState} />
            </div>
            <ProgressBar duration={msPerTick} onTick={onTick} />
        </header>
    );
}

export default StatusHeader;
