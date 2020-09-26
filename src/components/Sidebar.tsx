import React from 'react';
import './Sidebar.css';

interface Props {
    active: boolean;
    onDismiss: () => any;
}

function Sidebar(props: Props) {
    return (
        <>
            <div
                className={`Shroud${props.active ? ' Active' : ''}`}
                onClick={props.onDismiss}
            ></div>
            <nav className={`Sidebar${props.active ? ' Active' : ''}`}>
                <a href="/">link 1</a>
                <a href="/">link 2</a>
            </nav>
        </>
    );
}

export default Sidebar;
