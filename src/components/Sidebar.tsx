import React from 'react';
import { Page, PageLink } from './Router';
import './Sidebar.css';

interface Props {
    active: boolean;
    onDismiss: () => any;
    pages: PageLink[];
    onNavigate: (page: Page) => any;
}

function Sidebar(props: Props) {
    return (
        <>
            <div
                className={`Shroud${props.active ? ' Active' : ''}`}
                onClick={props.onDismiss}
            ></div>
            <nav className={`Sidebar${props.active ? ' Active' : ''}`}>
                {props.pages.map((page, i) => {
                    return (
                        <span
                            key={i}
                            className={`Navlink${page.active ? ' Active' : ''}`}
                            onClick={() => props.onNavigate(page.type)}
                        >
                            {page.displayName}
                        </span>
                    );
                })}
            </nav>
        </>
    );
}

export default Sidebar;
