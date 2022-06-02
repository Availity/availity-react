import * as React from 'react';

function mathMod(a, b) {
  return ((a % b) + b) % b;
}
function isObject(value) {
  return !!value && typeof value === 'object';
}

export default function useTabsEventHandlers(tab, tabs, updaterFn, active, options = {}) {
  const { customFindFn, customSelector } = options;
  if (typeof tab !== 'string' && !isObject(tab) && isObject(tab) && !('name' in tab)) {
    throw new Error('useTabsEventHandler requires tabs to be strings or objects with a name propery');
  }
  const handleKeys = React.useCallback(
    (event) => {
      switch (event.key) {
        case 'Tab': {
          if (event.shiftKey) return false;
          const selector = customSelector ?? '#tabPanel';
          let el = document.querySelector(selector);
          if (!el) {
            el = document.querySelector('#tabListParentNav')?.nextElementSibling;
          }
          // if we cant find something either way fall back to default to avoid trap
          if (el) {
            event.preventDefault();
            event.stopPropagation();
          }
          return el?.focus();
        }
        case ' ':
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();
          return updaterFn(tab);
        case 'ArrowLeft': {
          const indexLeft =
            isObject(tab) && typeof customFindFn === 'function'
              ? mathMod(tabs.indexOf(customFindFn(tabs, active)) - 1, tabs.length)
              : mathMod(tabs.indexOf(active) - 1, tabs.length);
          const tabToUse = tabs[indexLeft];
          updaterFn(tabToUse);
          const id = typeof tabToUse === 'string' ? `${tabToUse}-tab` : `${tabToUse.name}-tab`;
          return document.querySelector(`#${id}`)?.focus();
        }
        case 'ArrowRight': {
          const indexRight =
            isObject(tab) && typeof customFindFn === 'function'
              ? mathMod(tabs.indexOf(customFindFn(tabs, active)) + 1, tabs.length)
              : mathMod(tabs.indexOf(active) + 1, tabs.length);
          const tabToUse = tabs[indexRight];
          updaterFn(tabToUse);
          const id = typeof tabToUse === 'string' ? `${tabToUse}-tab` : `${tabToUse.name}-tab`;
          return document.querySelector(`#${id}`)?.focus();
        }
        default:
          return false;
      }
    },
    [tabs, tab, updaterFn, active, customFindFn, customSelector]
  );
  const handleFocus = React.useCallback(
    (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        // Not triggered when swapping focus between children
        const id = typeof active === 'string' ? `${active}-tab` : `${active.name}-tab`;
        const activeTab = document.querySelector(`#${id}`);
        activeTab?.focus();
      }
    },
    [active]
  );
  return { handleKeys, handleFocus };
}
