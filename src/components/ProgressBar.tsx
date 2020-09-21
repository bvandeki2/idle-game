import React, { CSSProperties, useEffect, useRef } from 'react';
import './ProgressBar.css';

interface Props {
    duration: number;
    onTick: () => any;
}

function ProgressBar(props: Props) {
    const { duration, onTick } = props;

    const style: CSSProperties = {
        animationDuration: `${duration}ms`,
    };

    const fillRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (fillRef.current) fillRef.current.classList.add('Progress-fill');
        const interval = setInterval(() => {
            if (fillRef.current) {
                fillRef.current.classList.remove('Progress-fill');
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const __forceReflow = fillRef.current.offsetHeight;
                fillRef.current.classList.add('Progress-fill');
            }

            onTick();
        }, duration);

        return () => clearInterval(interval);
    });

    return (
        <div className="Progress-bar">
            <div ref={fillRef} style={style}></div>
        </div>
    );
}

export default ProgressBar;
