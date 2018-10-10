const warned = {};
export function warnOnce(message) {
  if (!warned[message]) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}

export function shallowIsDifferent(a, b) {
  for (const i in a) if (!(i in b)) return true; // eslint-disable-line no-restricted-syntax
  for (const i in b) if (a[i] !== b[i]) return true; // eslint-disable-line no-restricted-syntax
  return false;
}
