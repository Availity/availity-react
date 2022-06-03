import * as React from 'react';

function mathMod(a, b) {
  return ((a % b) + b) % b;
}
function isObject(value) {
  return !!value && typeof value === 'object';
}

export default function useTabsEventHandlers(tab, tabs, updaterFn, active, options = {}) {
  const { customFindFn } = options;
  if ((typeof tab !== 'string' && !isObject(tab)) || (isObject(tab) && !('name' in tab))) {
    throw new Error('useTabsEventHandler requires tabs to be strings or objects with a name property');
  }

  if ((isObject(tab) || isObject(active)) && typeof customFindFn !== 'function') {
    throw new Error('when using tab objects a custom find function is required');
  }
  const handleKeys = React.useCallback(
    (event) => {
      switch (event.key) {
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
    [tabs, tab, updaterFn, active, customFindFn]
  );
  return handleKeys;
}
