# AGENTS.md: availity-react (legacy component library)

Nx monorepo of React components on Bootstrap 4, reactstrap, and Formik. This is the **legacy** generation. Maintain it. Do not start new feature work here. New UI goes in `element`.

## Branches

- Default and PR target: `master` (see `.github/workflows/pr-build.yml`).
- Check `git branch --show-current` before editing. This clone may have uncommitted work. Run `git status` and do not overwrite changes you did not make.
- Never push to `master`. Work on a branch named `feature/<short-description>` or `fix/<short-description>`.

## Environment

- Node `^22 || ^24` (`.nvmrc` is 22).
- Yarn 4 (`packageManager: yarn@4.17.0`). Do not use npm or yarn 1.
- Install with `yarn install --immutable`. Do not hand-edit `yarn.lock`.
- React 18 is a runtime dependency in the root `package.json` (`^18.3.1`). Most packages declare `react` `^18.0.0` as a peer. The active `analytics`, `authorize`, `feature`, `help`, `hooks`, and `json-viewer` packages also accept React 19.

## Active and deprecated packages

Check a package's status before you change it. Status is marked in two places that agree with each other:

- A `## ⚠️ Deprecated` banner at the top of `packages/<name>/README.md`.
- The package list in `docusaurus/docs/deprecated/index.md`.

Docs for active packages live in `docusaurus/docs/components/` and `docusaurus/docs/hooks/`. Legacy docs live in `docusaurus/docs/deprecated/`. Do not use the folder alone to decide status: `feature` is active but still has a legacy page at `deprecated/bootstrap-components/feature.md`. The current page is `components/feature.md`.

**Active** (still supported here; this is where changes go):

- `@availity/analytics`
- `@availity/authorize`
- `@availity/feature`
- `@availity/help`
- `@availity/hooks`
- `@availity/json-viewer`
- `@availity/mock` (private, not published)

**Deprecated** (no longer actively maintained, future updates not guaranteed). These depend on Bootstrap, reactstrap, or availity-uikit for styling. The replacement is `@availity/element`.

- `app-icon`, `app-tiles`, `avatar`, `badge`, `block-ui`, `breadcrumbs`, `button`, `change-password`, `date`, `favorites`, `feedback`, `form`, `form-upload`, `icon`, `link`, `list-group`, `list-group-item`, `page-header`, `pagination`, `payer-logo`, `phone`, `progress`, `select`, `spaces`, `step-wizard`, `table`, `tooltip`, `training-link`, `tree`, `typography`
- Not compatible with React 19 and will not be upgraded: `reactstrap-validation-date`, `reactstrap-validation-select`, `upload`. They use legacy context (`contextTypes`) and/or `componentWillReceiveProps`, which React 19 removed.

(All are `@availity/<name>`.)

Rules:

- Do not add features to a deprecated package. Point the user to `@availity/element` instead.
- No active package depends on a deprecated one today. Keep it that way.
- To deprecate another package, update both markers above together.
- `useEffectAsync` in `@availity/hooks` is also deprecated. Its docs are at `docusaurus/docs/deprecated/hooks/use-effect-async.md`. Do not use it in new code.

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
