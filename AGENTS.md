# AGENTS.md: availity-react (legacy component library)

Nx monorepo of React components on Bootstrap 4, reactstrap, and Formik. This is the **legacy** generation. Maintain it. Do not start new feature work here. New UI goes in `element`.

## Branches

- Default and PR target: `master` (see `.github/workflows/pr-build.yml`).
- Check `git branch --show-current` before editing. This clone may have uncommitted work. Run `git status` and do not overwrite changes you did not make.
- Never push to `master`. Work on `feature/<JIRA-###>-description` or `fix/<JIRA-###>-description`.

## Environment

- Node `^22 || ^24` (`.nvmrc` is 22).
- Yarn 4 (`packageManager: yarn@4.17.0`). Do not use npm or yarn 1.
- Install with `yarn install --immutable`. Do not hand-edit `yarn.lock`.
- Peer dependency is React 18.

## Commands

| Task                        | Command                                            |
| --------------------------- | -------------------------------------------------- |
| Build components (no docs)  | `yarn build:components`                            |
| Build everything            | `yarn build`                                       |
| Lint                        | `yarn lint` (changed only: `yarn lint:affected`)   |
| Type check                  | `yarn typecheck`                                   |
| Test (single run, CI-style) | `yarn test:ci`                                     |
| Test changed packages       | `yarn test:affected`                               |
| Format check                | `yarn format:check` (fix with `yarn format:write`) |
| Storybook                   | `yarn start` (port 6006)                           |

Before you say a change is done, run `yarn lint:affected`, `yarn typecheck`, and `yarn test:affected`.

## Commits

- Conventional commits enforced by `commitlint.config.js`. Scope is the Nx project name.
- The header length limit is not enforced: `header-max-length` is disabled.
- `!` or a `BREAKING CHANGE:` footer forces a major release.
- Versioning runs through `nx affected --target version`. Do not run `version` or publish scripts locally.

## Do not

- Do not add new components that depend on Bootstrap or reactstrap without a human decision. Check first whether `element` already has an equivalent.
- Do not run `deploy:ci`, `deploy:docs`, or `check:registry` locally unless asked.
- Do not change the Formik or Bootstrap major versions as a side effect of another change.

## Gotchas

- `yarn lint:fix` edits files. Review the diff before committing.
- `availity-uikit` is not in this workspace. Its absence does not mean it is unused.
