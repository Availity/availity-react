## Contributing

This monorepo is managed using [yarn](https://yarnpkg.com/getting-started) and [nx](https://nx.dev/getting-started/intro). Each package is independently versioned and published to the `npm registry`.

## Prerequisites

- **Node.js** — version 22 or 24 (see `engines` in `package.json`). A `.nvmrc` file is included set to `22`. We recommend [nvm](https://github.com/nvm-sh/nvm#readme) or [fnm](https://github.com/Schniz/fnm#readme):

  ```bash
  nvm install   # reads .nvmrc and installs Node 22
  nvm use       # switches to Node 22
  ```

- **Yarn 4** — defined in `packageManager: "yarn@4.17.0"` in `package.json`. The repo ships a pinned Yarn binary at `.yarn/releases/yarn-4.17.0.cjs`, so no global install is required. To enable `yarn` as a command, use Corepack (ships with Node.js):

  ```bash
  corepack enable
  ```

## Installation

Clone the repo (or your fork) and install dependencies:

```bash
git clone https://github.com/Availity/availity-react.git
cd availity-react
yarn install
```

> **Note:** `yarn install` automatically runs `husky` to set up Git hooks for commit linting. This is handled via the `prepare` / `postinstall` scripts in `package.json` — no manual setup needed.

Now build the packages so they are ready for local development:

```bash
yarn build:components
```

You are now ready to begin development in the repo!

## Contributor Workflow

1. **Fork** the repository on GitHub and clone your fork locally.
2. **Create a branch** from `master` for your change:
   ```bash
   git checkout -b fix/my-change
   ```
3. **Make your changes** and add or update tests as needed.
4. **Run the checks** (see sections below) — build, test, lint, and typecheck should all pass.
5. **Commit** using the [Angular Commit Format](#commits) (commitlint enforces this on commit).
6. **Push** your branch and open a pull request against `master`.
7. **PR review** — at least one maintainer approval is required before merge. CI must pass across Node 22 and 24 on both Ubuntu and macOS.

## Local Development

### Storybook

The recommended way to work in the repo is running Storybook while you write your code. This gives you a live environment to view your changes and serves as documentation once deployed.

```bash
yarn start
```

To build Storybook as a static site (e.g., for deployment preview):

```bash
yarn build:storybook
```

### Unit Tests

All new features should have a unit test added. Tests are run with [Vitest](https://vitest.dev/).

Run all tests:

```bash
yarn test
```

Run tests for affected packages only (faster during local iteration):

```bash
yarn test:affected
```

Run tests for a single package (e.g., `app-icon`):

```bash
yarn nx test app-icon
```

### Type Checking

```bash
yarn typecheck
```

### Linting

This repo uses [eslint-config-availity](https://github.com/Availity/eslint-config-availity#readme) for linting. Make sure to have linting support in your IDE or run the linting script to make sure your code does not have any errors. You will not be able to commit your code if there are linting errors.

Run lint across all packages:

```bash
yarn lint
```

Run lint and auto-fix affected packages:

```bash
yarn lint:fix
```

### Formatting

```bash
# Check formatting
yarn format:check

# Apply formatting fixes
yarn format:write
```

### Adding/Removing a dependency

Managing dependencies in a monorepo is similar to a single package repo. The main difference is the command is longer. We use the `workspace` command from `yarn` to tell yarn which package we want updated.

Here is an example of adding `react-query` to the `avatar` package:

```bash
yarn workspace @availity/avatar add react-query
```

## Adding a New Package

```bash
yarn new
```

## Commits

The commit messages in this repository are important for two main reasons:

1. The `type` (feat, fix, build, etc.) is used to determine how to bump the version when publishing.

2. Commits with types `feat` and `fix` will show up in the `CHANGELOG.md` for the given package.

Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should be one of the un-prefixed names of the packages under `./packages/` or `docusaurus` for the docs. If a commit applies to multiple packages, leave out the scope.

For example, here is what the commit message would look like when fixing a null-checking error in the [icon](../packages/icon) package:

```bash
git commit -m "fix(icon): check for null before doing the action"
```

In order to bump a package by a major version you must indicate a `BREAKING CHANGE` in the commit message. Read through the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) for more information:

```bash
git commit -m "feat(table)!: add new features

BREAKING CHANGE: names of props changed"
```

Commitlint runs automatically on commit (via husky) and will reject messages that don't match the Angular format.

## Versioning

This repo uses [@jscutlery/semver](https://github.com/jscutlery/semver) with the Angular preset to determine version bumps:

| Commit type                                                 | Version bump |
| ----------------------------------------------------------- | ------------ |
| `feat`                                                      | minor        |
| `fix`                                                       | patch        |
| `BREAKING CHANGE`                                           | major        |
| `docs`, `chore`, `style`, `refactor`, `test`, `build`, `ci` | **no bump**  |

> Commits with type `docs` do **not** trigger a version bump.

Versioning and publishing runs automatically on every push to `master` via CI.

## Canary Releases

Canary Releases can be used to test changes without impacting the `latest` tag.

The first thing we need to do is create a new version to be tagged. Version bumps are generated off the latest commits to the package. You should commit any changes before running the version and publish commands.

Bump the version using a `preid`. The `preid` is the tag you want to use in order to identify the release. If you want to see what version will be created without actually making the changes, then add the `--dry-run` flag to the end.

```bash
# This will make changes to the package.json, changelog.md, and make a commit
yarn nx version app-icon --releaseAs=prerelease --preid=alpha

# Dry run to make sure changes are correct
yarn nx version app-icon --releaseAs=prerelease --preid=alpha --dry-run
```

Once you have a newly created version it will need to be published to the registry so you or others can use it. First login, and then run the publish command:

```sh
# login
yarn npm login --publish

# publish
yarn nx publish:canary app-icon
```
