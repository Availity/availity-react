# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 4.0.26 (2020-07-08)

**Note:** Version bump only for package @availity/spaces





## 4.0.25 (2020-06-12)

**Note:** Version bump only for package @availity/spaces





## 4.0.24 (2020-05-28)


### Bug Fixes

* **spaces:** look at first space payer id before searching all ([a969b20](https://github.com/Availity/availity-react/commit/a969b202a6bdab7b0cd6fa8697108b4cfa1b667b))





## 4.0.23 (2020-04-30)

**Note:** Version bump only for package @availity/spaces





## 4.0.22 (2020-04-30)

**Note:** Version bump only for package @availity/spaces





## 4.0.21 (2020-04-28)

**Note:** Version bump only for package @availity/spaces





## 4.0.20 (2020-04-17)

**Note:** Version bump only for package @availity/spaces





## 4.0.19 (2020-04-09)

**Note:** Version bump only for package @availity/spaces





## 4.0.18 (2020-04-08)

**Note:** Version bump only for package @availity/spaces





## 4.0.17 (2020-04-08)

**Note:** Version bump only for package @availity/spaces





## 4.0.16 (2020-04-07)

**Note:** Version bump only for package @availity/spaces





## 4.0.15 (2020-04-07)

**Note:** Version bump only for package @availity/spaces





## 4.0.14 (2020-04-06)

**Note:** Version bump only for package @availity/spaces





## 4.0.13 (2020-04-06)

**Note:** Version bump only for package @availity/spaces





## 4.0.12 (2020-04-06)

**Note:** Version bump only for package @availity/spaces





## 4.0.11 (2020-04-06)

**Note:** Version bump only for package @availity/spaces





## 4.0.10 (2020-04-03)

**Note:** Version bump only for package @availity/spaces





## 4.0.9 (2020-04-03)

**Note:** Version bump only for package @availity/spaces





## 4.0.8 (2020-04-02)

**Note:** Version bump only for package @availity/spaces





## 4.0.7 (2020-04-02)

**Note:** Version bump only for package @availity/spaces





## [4.0.6](https://github.com/Availity/availity-react/compare/@availity/spaces@4.0.5...@availity/spaces@4.0.6) (2020-03-02)

**Note:** Version bump only for package @availity/spaces





## [4.0.5](https://github.com/Availity/availity-react/compare/@availity/spaces@4.0.4...@availity/spaces@4.0.5) (2020-02-28)

**Note:** Version bump only for package @availity/spaces





## [4.0.4](https://github.com/Availity/availity-react/compare/@availity/spaces@4.0.3...@availity/spaces@4.0.4) (2020-02-19)

**Note:** Version bump only for package @availity/spaces





## [4.0.3](https://github.com/Availity/availity-react/compare/@availity/spaces@4.0.2...@availity/spaces@4.0.3) (2020-02-11)

**Note:** Version bump only for package @availity/spaces





## [4.0.2](https://github.com/Availity/availity-react/compare/@availity/spaces@4.0.1...@availity/spaces@4.0.2) (2020-02-10)

**Note:** Version bump only for package @availity/spaces





## [4.0.1](https://github.com/Availity/availity-react/compare/@availity/spaces@4.0.0...@availity/spaces@4.0.1) (2019-10-24)

**Note:** Version bump only for package @availity/spaces





# [4.0.0](https://github.com/Availity/availity-react/compare/@availity/spaces@3.2.3...@availity/spaces@4.0.0) (2019-10-22)


### Code Refactoring

* **spaces:** remove useSpace hook in favor of useSpaces ([8a6a932](https://github.com/Availity/availity-react/commit/8a6a932))


### Features

* **spaces:** add useSpaces hook ([b631946](https://github.com/Availity/availity-react/commit/b631946))


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





## [3.2.3](https://github.com/Availity/availity-react/compare/@availity/spaces@3.2.2...@availity/spaces@3.2.3) (2019-10-18)

**Note:** Version bump only for package @availity/spaces





## [3.2.2](https://github.com/Availity/availity-react/compare/@availity/spaces@3.2.1...@availity/spaces@3.2.2) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





## [3.2.1](https://github.com/Availity/availity-react/compare/@availity/spaces@3.2.0...@availity/spaces@3.2.1) (2019-10-08)

**Note:** Version bump only for package @availity/spaces





# [3.2.0](https://github.com/Availity/availity-react/compare/@availity/spaces@3.1.3...@availity/spaces@3.2.0) (2019-10-07)


### Features

* **spaces:** add SpacesFile component ([d0d95a9](https://github.com/Availity/availity-react/commit/d0d95a9))





## [3.1.3](https://github.com/Availity/availity-react/compare/@availity/spaces@3.1.2...@availity/spaces@3.1.3) (2019-10-01)

**Note:** Version bump only for package @availity/spaces





## [3.1.2](https://github.com/Availity/availity-react/compare/@availity/spaces@3.1.1...@availity/spaces@3.1.2) (2019-09-26)

**Note:** Version bump only for package @availity/spaces





## [3.1.1](https://github.com/Availity/availity-react/compare/@availity/spaces@3.1.0...@availity/spaces@3.1.1) (2019-09-25)

**Note:** Version bump only for package @availity/spaces





# [3.1.0](https://github.com/Availity/availity-react/compare/@availity/spaces@3.0.1...@availity/spaces@3.1.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [3.0.1](https://github.com/Availity/availity-react/compare/@availity/spaces@3.0.0...@availity/spaces@3.0.1) (2019-08-21)

**Note:** Version bump only for package @availity/spaces





# [3.0.0](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.6...@availity/spaces@3.0.0) (2019-08-19)


### Code Refactoring

* **spaces:** made api resources peer dep ([f1da56d](https://github.com/Availity/availity-react/commit/f1da56d))


### BREAKING CHANGES

* **spaces:** api-axios api-core and axios are peer deps now





## [2.0.6](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.5...@availity/spaces@2.0.6) (2019-08-13)

**Note:** Version bump only for package @availity/spaces





## [2.0.5](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.4...@availity/spaces@2.0.5) (2019-08-11)

**Note:** Version bump only for package @availity/spaces





## [2.0.4](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.3...@availity/spaces@2.0.4) (2019-07-23)

**Note:** Version bump only for package @availity/spaces





## [2.0.3](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.2...@availity/spaces@2.0.3) (2019-07-11)


### Bug Fixes

* **spaces:** allow number or string for skeleton width/height ([800c937](https://github.com/Availity/availity-react/commit/800c937))
* **spaces:** only spread skeletonProps onto Loader ([d2aa0af](https://github.com/Availity/availity-react/commit/d2aa0af))





## [2.0.2](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.1...@availity/spaces@2.0.2) (2019-07-02)

**Note:** Version bump only for package @availity/spaces





## [2.0.1](https://github.com/Availity/availity-react/compare/@availity/spaces@2.0.0...@availity/spaces@2.0.1) (2019-06-24)

**Note:** Version bump only for package @availity/spaces





# [2.0.0](https://github.com/Availity/availity-react/compare/@availity/spaces@1.3.0...@availity/spaces@2.0.0) (2019-06-20)


### Bug Fixes

* **spaces:** wait for spaces to load to default url in SpacesLogo ([02bf3e4](https://github.com/Availity/availity-react/commit/02bf3e4))


### Code Refactoring

* **spaces:** making breaking change commit to major bump spaces ([4134486](https://github.com/Availity/availity-react/commit/4134486))


### Features

* **spaces:** render spinner til space loads in SpacesImage ([e9acb79](https://github.com/Availity/availity-react/commit/e9acb79))


### BREAKING CHANGES

* **spaces:** [Commit](https://github.com/Availity/availity-react/pull/170/commits/e9acb794c504ec159949a7fe82ea76c9e4f5c986) was noted as a breaking change but not using the correct conventional commit format for lerna to major bump the package. reactstrap >= 8 is now a peer dep





# [1.3.0](https://github.com/Availity/availity-react/compare/@availity/spaces@1.2.0...@availity/spaces@1.3.0) (2019-06-14)


### Features

* **spaces:** add spaces prop ([ce7d721](https://github.com/Availity/availity-react/commit/ce7d721))





# [1.2.0](https://github.com/Availity/availity-react/compare/@availity/spaces@1.1.1...@availity/spaces@1.2.0) (2019-06-06)


### Features

* **spaces:** add SpacesGhostText component ([b6a11f6](https://github.com/Availity/availity-react/commit/b6a11f6))





## [1.1.1](https://github.com/Availity/availity-react/compare/@availity/spaces@1.1.0...@availity/spaces@1.1.1) (2019-06-03)

**Note:** Version bump only for package @availity/spaces





# 1.1.0 (2019-05-29)


### Bug Fixes

* **spaces:** fixes from code review ([47ba435](https://github.com/Availity/availity-react/commit/47ba435))


### Features

* add spaces package ([e2eff44](https://github.com/Availity/availity-react/commit/e2eff44))
* **spaces:** add SpacesDisclaimer component ([bb7e2c1](https://github.com/Availity/availity-react/commit/bb7e2c1))
* **spaces:** normalize pair fields when spaces fetched ([23e283f](https://github.com/Availity/availity-react/commit/23e283f))
