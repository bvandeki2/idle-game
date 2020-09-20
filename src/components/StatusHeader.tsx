import React from 'react';
import ProgressBar from './ProgressBar';
import './StatusHeader.css';

function StatusHeader() {
    return (
        <header className="Status-header">
            <div className="Status-container">
                <p>header</p>
            </div>
            <ProgressBar duration={5000}/>
        </header>
    );
}

export default StatusHeader;
