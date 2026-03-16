declare function getLocation(href: string): HTMLAnchorElement;

declare function getTarget(target?: string): string;

declare function getUrl(url?: string, loadApp?: boolean, absolute?: boolean): string;

declare function getRel(): string | undefined;

declare function isEssentialsUrl(url: string): boolean;

export { getLocation, getTarget, getUrl, getRel };
