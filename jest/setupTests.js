
// eslint-disable-next-line no-console
const originalError = console.error;
beforeAll(() => {
  // eslint-disable-next-line no-console
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = originalError;
});
