import React from 'react';

export type Page = 'building' | 'buy';

export interface PageLink {
    type: Page;
    displayName: string;
    active: boolean;
}

export const initialPageLinks: PageLink[] = [
    {
        type: 'building',
        active: true,
        displayName: 'Buildings',
    },
    {
        type: 'buy',
        active: false,
        displayName: 'Buy',
    },
];
export function changePage(pageLinks: PageLink[], newPage: Page): PageLink[] {
    return pageLinks.map((link) => {
        return {
            ...link,
            active: link.type === newPage,
        };
    });
}

interface Props {
    pageState: PageLink[];
    pages: { [page in Page]: JSX.Element };
}
export default function Router(props: Props) {
    for (const pageLink of props.pageState) {
        if (pageLink.active) return props.pages[pageLink.type];
    }

    return <></>;
}
