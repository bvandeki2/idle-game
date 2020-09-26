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
