import * as React from "react";

export type Tab = string | {name: string} & Record<string, unknown>

export const UpdaterFn: (tab: Tab) => void;

export const CustomFindFunction: (tabs: Tab[], active: Tab) => {tab: Tab};

declare type options = {customFindFn?: CustomFindFunction, customSelector?: string}

declare function useTabsEventHandlers(tab: Tab, tabs: Tab[], updaterFn: UpdaterFn, active: Tab, options?): {handleKeys: React.KeyboardEventHandler<HTMLAnchorElement>, handleFocus: React.FocusEventHandler<HTMLUListElement>};

export default useTabsEventHandlers