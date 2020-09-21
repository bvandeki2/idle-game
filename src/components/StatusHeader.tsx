import React from 'react';
import { ResourceState } from '../gamelogic/state';
import { CreditAmount } from './currency/CurrencyAmount';
import ResourceChart from './currency/ResourceChart';
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
            <ResourceChart resourceState={resourceState} />
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
