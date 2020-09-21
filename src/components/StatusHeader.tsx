import React from 'react';
import { ResourceState } from '../gamelogic/state';
import ProgressBar from './ProgressBar';
import './StatusHeader.css';

interface Props {
    msPerTick: number;
    resourceState: ResourceState;
    onTick: () => any;
}

function StatusHeader(props: Props) {
    const { msPerTick, onTick, resourceState } = props;

    return (
        <header className="Status-header">
            <div className="Status-container">
                <p>score: {resourceState.score.toFixed(2)}</p>
            </div>
            <ProgressBar duration={msPerTick} onTick={onTick} />
        </header>
    );
}

export default React.memo(StatusHeader, (prevProps, nextProps) => {
    if (prevProps.msPerTick !== nextProps.msPerTick) return false;
    // if (prevProps.onTick !== nextProps.onTick) return false;
    if (prevProps.resourceState !== nextProps.resourceState) return false;

    return true;
});
