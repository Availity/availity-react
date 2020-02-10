# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.0.16](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.15...@availity/page-header@10.0.16) (2020-02-10)

**Note:** Version bump only for package @availity/page-header





## [10.0.15](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.14...@availity/page-header@10.0.15) (2020-02-09)

**Note:** Version bump only for package @availity/page-header





## [10.0.14](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.13...@availity/page-header@10.0.14) (2020-02-08)

**Note:** Version bump only for package @availity/page-header





## [10.0.13](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.12...@availity/page-header@10.0.13) (2020-01-31)

**Note:** Version bump only for package @availity/page-header





## [10.0.12](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.11...@availity/page-header@10.0.12) (2020-01-31)

**Note:** Version bump only for package @availity/page-header





## [10.0.11](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.10...@availity/page-header@10.0.11) (2020-01-15)

**Note:** Version bump only for package @availity/page-header





## [10.0.10](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.9...@availity/page-header@10.0.10) (2020-01-13)

**Note:** Version bump only for package @availity/page-header





## [10.0.9](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.8...@availity/page-header@10.0.9) (2020-01-10)

**Note:** Version bump only for package @availity/page-header





## [10.0.8](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.7...@availity/page-header@10.0.8) (2020-01-08)

**Note:** Version bump only for package @availity/page-header





## [10.0.7](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.6...@availity/page-header@10.0.7) (2019-12-31)

**Note:** Version bump only for package @availity/page-header





## [10.0.6](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.5...@availity/page-header@10.0.6) (2019-12-31)

**Note:** Version bump only for package @availity/page-header





## [10.0.5](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.4...@availity/page-header@10.0.5) (2019-12-20)

**Note:** Version bump only for package @availity/page-header





## [10.0.4](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.3...@availity/page-header@10.0.4) (2019-12-20)

**Note:** Version bump only for package @availity/page-header





## [10.0.3](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.2...@availity/page-header@10.0.3) (2019-12-17)

**Note:** Version bump only for package @availity/page-header





## [10.0.2](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.1...@availity/page-header@10.0.2) (2019-11-21)

**Note:** Version bump only for package @availity/page-header





## [10.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@10.0.0...@availity/page-header@10.0.1) (2019-11-20)

**Note:** Version bump only for package @availity/page-header





# [10.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@9.0.5...@availity/page-header@10.0.0) (2019-11-15)


### Build System

* **page-header:** update dependencies ([104ed57](https://github.com/Availity/availity-react/commit/104ed5781d92c4cf8563084eae4ae4cfcab579de))


### BREAKING CHANGES

* **page-header:** api-core and localstorage-core have been bumped to next major version





## [9.0.5](https://github.com/Availity/availity-react/compare/@availity/page-header@9.0.4...@availity/page-header@9.0.5) (2019-10-24)

**Note:** Version bump only for package @availity/page-header





## [9.0.4](https://github.com/Availity/availity-react/compare/@availity/page-header@9.0.3...@availity/page-header@9.0.4) (2019-10-24)

**Note:** Version bump only for package @availity/page-header





## [9.0.3](https://github.com/Availity/availity-react/compare/@availity/page-header@9.0.2...@availity/page-header@9.0.3) (2019-10-23)

**Note:** Version bump only for package @availity/page-header





## [9.0.2](https://github.com/Availity/availity-react/compare/@availity/page-header@9.0.1...@availity/page-header@9.0.2) (2019-10-22)


### Bug Fixes

* **page-header:** ensure breadcrumbs parent div never gets squished ([2060a03](https://github.com/Availity/availity-react/commit/2060a03))





## [9.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@9.0.0...@availity/page-header@9.0.1) (2019-10-22)

**Note:** Version bump only for package @availity/page-header





# [9.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@8.2.0...@availity/page-header@9.0.0) (2019-10-22)


### Code Refactoring

* **spaces:** remove useSpace hook in favor of useSpaces ([8a6a932](https://github.com/Availity/availity-react/commit/8a6a932))


### BREAKING CHANGES

* **spaces:** `useSpace` is no longer available. Use `useSpaces`
instead. Additionally, `isGhost` is no longer exported as that property is computed server side and assigned to the space asset

*Before:*
```js
import { useSpace } from '@availity/spaces';

// ...
const { space: space1, loading, error, isGhost } = useSpace('1');
const { space: space2 } = useSpace('2');
const { space: space3 } = useSpace('3');
```

*After:*
```js
import { useSpaces, useSpacesContext } from '@availity/spaces';

// ...
const [space1, space2, space3] = useSpaces('1', '2', '3');
const { loading, error } = useSpacesContext();
```





# [8.2.0](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.10...@availity/page-header@8.2.0) (2019-10-18)


### Features

* **page-header:** add renderRightClassName props and defaults ([c8403fe](https://github.com/Availity/availity-react/commit/c8403fe))





## [8.1.10](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.9...@availity/page-header@8.1.10) (2019-10-18)

**Note:** Version bump only for package @availity/page-header





## [8.1.9](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.8...@availity/page-header@8.1.9) (2019-10-18)

**Note:** Version bump only for package @availity/page-header





## [8.1.8](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.7...@availity/page-header@8.1.8) (2019-10-18)

**Note:** Version bump only for package @availity/page-header





## [8.1.7](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.6...@availity/page-header@8.1.7) (2019-10-18)

**Note:** Version bump only for package @availity/page-header





## [8.1.6](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.5...@availity/page-header@8.1.6) (2019-10-11)

**Note:** Version bump only for package @availity/page-header





## [8.1.5](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.4...@availity/page-header@8.1.5) (2019-10-11)

**Note:** Version bump only for package @availity/page-header





## [8.1.4](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.3...@availity/page-header@8.1.4) (2019-10-11)

**Note:** Version bump only for package @availity/page-header





## [8.1.3](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.2...@availity/page-header@8.1.3) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





## [8.1.2](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.1...@availity/page-header@8.1.2) (2019-10-09)

**Note:** Version bump only for package @availity/page-header





## [8.1.1](https://github.com/Availity/availity-react/compare/@availity/page-header@8.1.0...@availity/page-header@8.1.1) (2019-10-08)

**Note:** Version bump only for package @availity/page-header





# [8.1.0](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.6...@availity/page-header@8.1.0) (2019-10-07)


### Features

* **spaces:** add SpacesFile component ([d0d95a9](https://github.com/Availity/availity-react/commit/d0d95a9))





## [8.0.6](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.5...@availity/page-header@8.0.6) (2019-10-04)

**Note:** Version bump only for package @availity/page-header





## [8.0.5](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.4...@availity/page-header@8.0.5) (2019-10-01)

**Note:** Version bump only for package @availity/page-header





## [8.0.4](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.3...@availity/page-header@8.0.4) (2019-10-01)

**Note:** Version bump only for package @availity/page-header





## [8.0.3](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.2...@availity/page-header@8.0.3) (2019-09-26)

**Note:** Version bump only for package @availity/page-header





## [8.0.2](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.1...@availity/page-header@8.0.2) (2019-09-25)

**Note:** Version bump only for package @availity/page-header





## [8.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@8.0.0...@availity/page-header@8.0.1) (2019-09-25)

**Note:** Version bump only for package @availity/page-header





# [8.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.8...@availity/page-header@8.0.0) (2019-09-23)


### Code Refactoring

* **page-header:** refactored page header strcuture to fix ux ([d79d269](https://github.com/Availity/availity-react/commit/d79d269))


### Features

* **page-header:** added function prop to render custom right content ([9b36f16](https://github.com/Availity/availity-react/commit/9b36f16))


### BREAKING CHANGES

* **page-header:** Tag prop now is defaulted to div and appName instead of children will render an h1 tag by default





## [7.1.8](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.7...@availity/page-header@7.1.8) (2019-09-20)

**Note:** Version bump only for package @availity/page-header





## [7.1.7](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.6...@availity/page-header@7.1.7) (2019-09-19)

**Note:** Version bump only for package @availity/page-header





## [7.1.6](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.5...@availity/page-header@7.1.6) (2019-09-19)

**Note:** Version bump only for package @availity/page-header





## [7.1.5](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.4...@availity/page-header@7.1.5) (2019-09-13)

**Note:** Version bump only for package @availity/page-header





## [7.1.4](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.3...@availity/page-header@7.1.4) (2019-09-13)

**Note:** Version bump only for package @availity/page-header





## [7.1.3](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.2...@availity/page-header@7.1.3) (2019-09-06)

**Note:** Version bump only for package @availity/page-header





## [7.1.2](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.1...@availity/page-header@7.1.2) (2019-09-06)

**Note:** Version bump only for package @availity/page-header





## [7.1.1](https://github.com/Availity/availity-react/compare/@availity/page-header@7.1.0...@availity/page-header@7.1.1) (2019-09-05)

**Note:** Version bump only for package @availity/page-header





# [7.1.0](https://github.com/Availity/availity-react/compare/@availity/page-header@7.0.3...@availity/page-header@7.1.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [7.0.3](https://github.com/Availity/availity-react/compare/@availity/page-header@7.0.2...@availity/page-header@7.0.3) (2019-08-23)

**Note:** Version bump only for package @availity/page-header





## [7.0.2](https://github.com/Availity/availity-react/compare/@availity/page-header@7.0.1...@availity/page-header@7.0.2) (2019-08-21)

**Note:** Version bump only for package @availity/page-header





## [7.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@7.0.0...@availity/page-header@7.0.1) (2019-08-21)

**Note:** Version bump only for package @availity/page-header





# [7.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@6.0.1...@availity/page-header@7.0.0) (2019-08-20)


### Bug Fixes

* **page-header:** made spaces peer dep to prevent duplicate installations ([a3d705d](https://github.com/Availity/availity-react/commit/a3d705d))


### BREAKING CHANGES

* **page-header:** `@availity/spaces` is now a peer dependency





## [6.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@6.0.0...@availity/page-header@6.0.1) (2019-08-19)

**Note:** Version bump only for package @availity/page-header





# [6.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@5.0.4...@availity/page-header@6.0.0) (2019-08-19)


### Code Refactoring

* **page-header:** made api resources peer dep ([66e136a](https://github.com/Availity/availity-react/commit/66e136a))


### BREAKING CHANGES

* **page-header:** api-axios api-core and axios are peer deps now





## [5.0.4](https://github.com/Availity/availity-react/compare/@availity/page-header@5.0.3...@availity/page-header@5.0.4) (2019-08-15)

**Note:** Version bump only for package @availity/page-header





## [5.0.3](https://github.com/Availity/availity-react/compare/@availity/page-header@5.0.2...@availity/page-header@5.0.3) (2019-08-15)

**Note:** Version bump only for package @availity/page-header





## [5.0.2](https://github.com/Availity/availity-react/compare/@availity/page-header@5.0.1...@availity/page-header@5.0.2) (2019-08-14)

**Note:** Version bump only for package @availity/page-header





## [5.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@5.0.0...@availity/page-header@5.0.1) (2019-08-14)

**Note:** Version bump only for package @availity/page-header





# [5.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@4.5.1...@availity/page-header@5.0.0) (2019-08-14)


### chore

* **page-header:** feedback update to latest formik should have been major bump ([f217189](https://github.com/Availity/availity-react/commit/f217189))


### BREAKING CHANGES

* **page-header:** this requires formik and yup to be installed alongside for feedback to work





## [4.5.1](https://github.com/Availity/availity-react/compare/@availity/page-header@4.5.0...@availity/page-header@4.5.1) (2019-08-13)

**Note:** Version bump only for package @availity/page-header





# [4.5.0](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.17...@availity/page-header@4.5.0) (2019-08-13)


### Features

* **select:** add autofill prop ([37d3fba](https://github.com/Availity/availity-react/commit/37d3fba))





## [4.4.17](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.16...@availity/page-header@4.4.17) (2019-08-12)

**Note:** Version bump only for package @availity/page-header





## [4.4.16](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.15...@availity/page-header@4.4.16) (2019-08-11)

**Note:** Version bump only for package @availity/page-header





## [4.4.15](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.14...@availity/page-header@4.4.15) (2019-08-08)

**Note:** Version bump only for package @availity/page-header





## [4.4.14](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.13...@availity/page-header@4.4.14) (2019-08-05)

**Note:** Version bump only for package @availity/page-header





## [4.4.13](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.12...@availity/page-header@4.4.13) (2019-08-05)

**Note:** Version bump only for package @availity/page-header





## [4.4.12](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.11...@availity/page-header@4.4.12) (2019-08-02)

**Note:** Version bump only for package @availity/page-header





## [4.4.11](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.10...@availity/page-header@4.4.11) (2019-07-31)

**Note:** Version bump only for package @availity/page-header





## [4.4.10](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.9...@availity/page-header@4.4.10) (2019-07-23)

**Note:** Version bump only for package @availity/page-header





## [4.4.9](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.8...@availity/page-header@4.4.9) (2019-07-19)

**Note:** Version bump only for package @availity/page-header





## [4.4.8](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.7...@availity/page-header@4.4.8) (2019-07-11)

**Note:** Version bump only for package @availity/page-header





## [4.4.7](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.6...@availity/page-header@4.4.7) (2019-07-02)

**Note:** Version bump only for package @availity/page-header





## [4.4.6](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.5...@availity/page-header@4.4.6) (2019-06-24)

**Note:** Version bump only for package @availity/page-header





## [4.4.5](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.4...@availity/page-header@4.4.5) (2019-06-20)

**Note:** Version bump only for package @availity/page-header





## [4.4.4](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.3...@availity/page-header@4.4.4) (2019-06-17)

**Note:** Version bump only for package @availity/page-header





## [4.4.3](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.2...@availity/page-header@4.4.3) (2019-06-14)

**Note:** Version bump only for package @availity/page-header





## [4.4.2](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.1...@availity/page-header@4.4.2) (2019-06-06)

**Note:** Version bump only for package @availity/page-header





## [4.4.1](https://github.com/Availity/availity-react/compare/@availity/page-header@4.4.0...@availity/page-header@4.4.1) (2019-06-03)


### Bug Fixes

* **page-header:** correct usage of useSpace ([2bc911c](https://github.com/Availity/availity-react/commit/2bc911c))





# [4.4.0](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.6...@availity/page-header@4.4.0) (2019-05-29)


### Bug Fixes

* **spaces:** fixes from code review ([47ba435](https://github.com/Availity/availity-react/commit/47ba435))


### Features

* add spaces package ([e2eff44](https://github.com/Availity/availity-react/commit/e2eff44))
* **page-header:** use space from spaces provider if it exists ([f3e5bdd](https://github.com/Availity/availity-react/commit/f3e5bdd))





## [4.3.6](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.5...@availity/page-header@4.3.6) (2019-05-10)

**Note:** Version bump only for package @availity/page-header





## [4.3.5](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.4...@availity/page-header@4.3.5) (2019-05-07)

**Note:** Version bump only for package @availity/page-header





## [4.3.4](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.3...@availity/page-header@4.3.4) (2019-05-02)

**Note:** Version bump only for package @availity/page-header





## [4.3.3](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.2...@availity/page-header@4.3.3) (2019-04-30)

**Note:** Version bump only for package @availity/page-header





## [4.3.2](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.1...@availity/page-header@4.3.2) (2019-04-23)

**Note:** Version bump only for package @availity/page-header





## [4.3.1](https://github.com/Availity/availity-react/compare/@availity/page-header@4.3.0...@availity/page-header@4.3.1) (2019-04-18)

**Note:** Version bump only for package @availity/page-header





# [4.3.0](https://github.com/Availity/availity-react/compare/@availity/page-header@4.2.1...@availity/page-header@4.3.0) (2019-04-10)


### Features

* **page-header:** add feedbackProps prop type ([525b9e9](https://github.com/Availity/availity-react/commit/525b9e9))





## [4.2.1](https://github.com/Availity/availity-react/compare/@availity/page-header@4.2.0...@availity/page-header@4.2.1) (2019-04-09)

**Note:** Version bump only for package @availity/page-header





# [4.2.0](https://github.com/Availity/availity-react/compare/@availity/page-header@4.1.0...@availity/page-header@4.2.0) (2019-04-09)


### Features

* **page-header:** allow logo and feedback to rendered at same time ([227d6b9](https://github.com/Availity/availity-react/commit/227d6b9)), closes [#88](https://github.com/Availity/availity-react/issues/88)





# [4.1.0](https://github.com/Availity/availity-react/compare/@availity/page-header@4.0.4...@availity/page-header@4.1.0) (2019-03-26)


### Features

* **page-header:** added new app-icon props to page-header ([b1a4ca0](https://github.com/Availity/availity-react/commit/b1a4ca0))





## [4.0.4](https://github.com/Availity/availity-react/compare/@availity/page-header@4.0.3...@availity/page-header@4.0.4) (2019-03-14)

**Note:** Version bump only for package @availity/page-header





## [4.0.3](https://github.com/Availity/availity-react/compare/@availity/page-header@4.0.2...@availity/page-header@4.0.3) (2019-03-13)

**Note:** Version bump only for package @availity/page-header





## [4.0.2](https://github.com/Availity/availity-react/compare/@availity/page-header@4.0.1...@availity/page-header@4.0.2) (2019-03-13)

**Note:** Version bump only for package @availity/page-header





## [4.0.1](https://github.com/Availity/availity-react/compare/@availity/page-header@4.0.0...@availity/page-header@4.0.1) (2019-03-13)

**Note:** Version bump only for package @availity/page-header





# [4.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@3.1.1...@availity/page-header@4.0.0) (2019-03-12)

**Note:** Version bump only for package @availity/page-header





## [3.1.1](https://github.com/Availity/availity-react/compare/@availity/page-header@3.1.0...@availity/page-header@3.1.1) (2019-03-08)

**Note:** Version bump only for package @availity/page-header





# [3.1.0](https://github.com/Availity/availity-react/compare/@availity/page-header@3.0.0...@availity/page-header@3.1.0) (2019-03-05)


### Features

* **page-header:** add clientId prop ([85067b9](https://github.com/Availity/availity-react/commit/85067b9))





# [3.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@1.3.2...@availity/page-header@3.0.0) (2019-03-04)


### Features

* **feedback:** refactored feedback component with more options ([becab2e](https://github.com/Availity/availity-react/commit/becab2e))


### BREAKING CHANGES

* **feedback:** The feedback modal has a new look.





# [2.0.0](https://github.com/Availity/availity-react/compare/@availity/page-header@1.3.2...@availity/page-header@2.0.0) (2019-03-04)


### Features

* **feedback:** refactored feedback component with more options ([becab2e](https://github.com/Availity/availity-react/commit/becab2e))


### BREAKING CHANGES

* **feedback:** The feedback modal has a new look.





## [1.3.2](https://github.com/Availity/availity-react/compare/@availity/page-header@1.3.1...@availity/page-header@1.3.2) (2019-02-28)


### Bug Fixes

* **page-header:** removing breadcrumb type check ([0896c2d](https://github.com/Availity/availity-react/commit/0896c2d))





## [1.3.1](https://github.com/Availity/availity-react/compare/@availity/page-header@1.3.0...@availity/page-header@1.3.1) (2019-02-26)

**Note:** Version bump only for package @availity/page-header





# [1.3.0](https://github.com/Availity/availity-react/compare/@availity/page-header@1.2.0...@availity/page-header@1.3.0) (2019-02-25)


### Bug Fixes

* **page-header:** allow custom crumbs in crumbs prop ([d3af59f](https://github.com/Availity/availity-react/commit/d3af59f))
* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319))


### Features

* integrated dynamic breadcrumbs into PageHeader ([7865b13](https://github.com/Availity/availity-react/commit/7865b13))





# [1.2.0](https://github.com/Availity/availity-react/compare/@availity/page-header@1.1.0...@availity/page-header@1.2.0) (2019-02-13)


### Bug Fixes

* fixed package-locks ([ddb49bb](https://github.com/Availity/availity-react/commit/ddb49bb))
* included pageheader test snapshot ([a315f8e](https://github.com/Availity/availity-react/commit/a315f8e))
* so many package-lock.json's ([8b5dc24](https://github.com/Availity/availity-react/commit/8b5dc24))
* **breadcrumbs, page-header:** fixed tests ([63e0ac7](https://github.com/Availity/availity-react/commit/63e0ac7))


### Features

* added dynamic breadcrumb (react-router tests) ([f79f8cf](https://github.com/Availity/availity-react/commit/f79f8cf))





# 1.1.0 (2019-02-08)


### Bug Fixes

* **feature:** fixed the repository for npm ([7a13a9e](https://github.com/Availity/availity-react/commit/7a13a9e))
* re-created package-locks ([49726de](https://github.com/Availity/availity-react/commit/49726de))


### Features

* **feature:** added packages from av-react to public ([2c32cf3](https://github.com/Availity/availity-react/commit/2c32cf3))
* **feature:** adding typescript support ([cfe57a2](https://github.com/Availity/availity-react/commit/cfe57a2))
