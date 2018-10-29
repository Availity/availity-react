const warned = {};
export default function warnOnce(message) {
  if (!warned[message]) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message); // eslint-disable-line no-console
    }
    warned[message] = true;
  }
}
