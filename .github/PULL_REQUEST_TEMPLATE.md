**Before submitting a pull request,** please make sure the following is done:

1. Fork [the repository](https://github.com/availity/availity-react) and create your branch from `master`.
2. Run `yarn install` in the repository root.
3. Run `yarn build:components` to compile packages for local development.
4. If you've fixed a bug or added code that should be tested, add tests!
5. Ensure the test suite passes (`yarn test`). Tip: `yarn test:affected` runs only tests for packages you've changed.
6. Ensure linting passes (`yarn lint`).
7. Ensure type checking passes (`yarn typecheck`).
8. Make sure your commits follow the [Angular Commit Format](https://www.conventionalcommits.org/en/v1.0.0/#summary) — commitlint runs automatically on commit via husky and will reject messages that don't match.
