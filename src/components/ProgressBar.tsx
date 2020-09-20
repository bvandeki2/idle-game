import React, { CSSProperties, useRef } from 'react';
import './ProgressBar.css';

interface Props {
    duration: number;
}

function ProgressBar(props: Props) {
    const { duration } = props;
    
    const style: CSSProperties = {
        animationDuration: `${duration}ms`,
        animationTimingFunction: 'linear',
    };

    const fillRef = useRef<HTMLDivElement | null>(null);

    setInterval(() => {
        if (fillRef.current) {
            fillRef.current.classList.remove('Progress-fill');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const __forceReflow = fillRef.current.offsetHeight;
            fillRef.current.classList.add('Progress-fill');
        }
    }, duration);

    return (
        <div className="Progress-bar">
            <div ref={fillRef} className="Progress-fill" style={style}></div>
        </div>
    );
}

export default ProgressBar;
