# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [5.0.1](https://github.com/Availity/availity-react/compare/@availity/authorize@5.0.0...@availity/authorize@5.0.1) (2025-07-23)


### Bug Fixes

* moved bootstrap components to separate folder as well as added waring about replacement, UXDS-919 ([5c23ad2](https://github.com/Availity/availity-react/commit/5c23ad29ba12adcd7b7e579d21a92d99d69ce33e))



# [5.0.0](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.6...@availity/authorize@5.0.0) (2025-05-15)


### Features

* drop support for node 16 add support for node 20 and 22 ([e31da14](https://github.com/Availity/availity-react/commit/e31da1439915fcd9cd16e049362ff2dc63e4c48b))


### BREAKING CHANGES

* drop support for Node 16



## [4.1.6](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.5...@availity/authorize@4.1.6) (2025-04-29)



## [4.1.5](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.4...@availity/authorize@4.1.5) (2025-04-11)



## [4.1.4](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.3...@availity/authorize@4.1.4) (2025-03-10)



## [4.1.3](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.2...@availity/authorize@4.1.3) (2025-03-10)



## [4.1.2](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.1...@availity/authorize@4.1.2) (2024-10-16)



## [4.1.1](https://github.com/Availity/availity-react/compare/@availity/authorize@4.1.0...@availity/authorize@4.1.1) (2024-08-22)



# 1.0.0 (2024-08-22)


### Bug Fixes

* **authorize:** change query key to useAuthorize ([e916267](https://github.com/Availity/availity-react/commit/e91626725bae7c843e6f7023e5dc769169bf363b))
* **authorize:** fixed unit tests :facepalm: ([87cac9d](https://github.com/Availity/availity-react/commit/87cac9d56fd5648b30f6bf367ce710579fa79a98))
* **authorize:** move react-dom and react-query to peerDeps ([a3c25f9](https://github.com/Availity/availity-react/commit/a3c25f971719dea936dc7c7a3c7253f951c9f0d1))
* **authorize:** resolve linter errors and add type ([fafea0c](https://github.com/Availity/availity-react/commit/fafea0c2b7ef6547b405e385e6b90df260aa8f52))
* **authorize:** the authorize component was using the wrong axi struct ([acb90b1](https://github.com/Availity/availity-react/commit/acb90b188825893719b34d011e51ff0e0eb49092))
* **feature:** fixed the repository for npm ([7a13a9e](https://github.com/Availity/availity-react/commit/7a13a9ea4533c1565998ed6c28439d22016c285e))
* fixed package-locks ([ddb49bb](https://github.com/Availity/availity-react/commit/ddb49bbffef1e4fae59f84fb283f5c4a422c8657))
* re-created package-locks ([49726de](https://github.com/Availity/availity-react/commit/49726dea08a61201a44c7c63c14715dda195cc25))
* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab5a9a38cc8113d5cc71416f1ef347eb4c4))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319b1298096de2e3e37bf6246e5f169ace0e))
* so many package-lock.json's ([8b5dc24](https://github.com/Availity/availity-react/commit/8b5dc24168f9eecae9f3f52da0b49e6da831a643))


* feat(authorize)!: convert to typescript and add react-query ([056744a](https://github.com/Availity/availity-react/commit/056744ac7526544095cfe45749ed5249d73a8956))


### Features

* **authorize:** add resources filter ([e266abc](https://github.com/Availity/availity-react/commit/e266abc037fd5940ffe7f5e4ef5852bff36a39de))
* **authorize:** adding a test to check for blockui when fetching ([6d14150](https://github.com/Availity/availity-react/commit/6d14150ad52fae1e43f02f133ce964bedfb75241))
* **authorize:** adds currentRegion to values returned from useAuthorize() ([245dd2c](https://github.com/Availity/availity-react/commit/245dd2c7015ed77870247b0ecfaccd5922983a6d))
* **authorize:** cache region ([3da1c36](https://github.com/Availity/availity-react/commit/3da1c36bc07f6115fb21696041ecbecd7989a7a6))
* **authorize:** created custom hook for getting authorized state ([cce12f3](https://github.com/Availity/availity-react/commit/cce12f3d10a3c66234d74ea0637f0fa3bbaf665d))
* **authorize:** export useauthorize types ([eecb449](https://github.com/Availity/availity-react/commit/eecb4495d67487520c2f0e230a5cab9256d3aa63))
* **authorize:** remove screen.debug() ([0b6176c](https://github.com/Availity/availity-react/commit/0b6176c22c9f031bb0260896d6e04d66fecb2be2))
* **authorize:** replace deprecated @availity/react-block-ui library with new @availity/block-ui ([6188c5b](https://github.com/Availity/availity-react/commit/6188c5bfe5e470347cd272645737529aa23ac62f))
* **authorize:** update type definition ([7a415c7](https://github.com/Availity/availity-react/commit/7a415c77fa042f60ba17b975a7c45eb4ab1e23a8))
* **authorize:** upgrade react query to v4 ([69a78bd](https://github.com/Availity/availity-react/commit/69a78bdf39de42324981727c330baec21db5415d))
* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b947487ef18c6e11486ad39203882a11bc8a1e7))
* **feature:** added packages from av-react to public ([2c32cf3](https://github.com/Availity/availity-react/commit/2c32cf353f22847a5a293eecf800315a051646f3))
* **feature:** adding typescript support ([cfe57a2](https://github.com/Availity/availity-react/commit/cfe57a265b97ba9a053fb3bee54d2b054fa86e8f))
* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))
* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))
* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### Performance Improvements

* **authorize:** dont need to check undefined permissions ([cb8fabe](https://github.com/Availity/availity-react/commit/cb8fabe6ab2e05e2b648b440dde414df37aa837c))


### BREAKING CHANGES

* **authorize:** react query has been upgraded to v4. you must upgrade
to @tanstack/react-query@^4.36.1 in order to use this package now
* axios v1 is now required
* react-query provider now required,  args are stricter



# [4.1.0](https://github.com/Availity/availity-react/compare/@availity/authorize@4.0.3...@availity/authorize@4.1.0) (2024-05-09)


### Features

* **authorize:** export useauthorize types ([eecb449](https://github.com/Availity/availity-react/commit/eecb4495d67487520c2f0e230a5cab9256d3aa63))



## [4.0.3](https://github.com/Availity/availity-react/compare/@availity/authorize@4.0.2...@availity/authorize@4.0.3) (2024-04-23)



## [4.0.2](https://github.com/Availity/availity-react/compare/@availity/authorize@4.0.1...@availity/authorize@4.0.2) (2024-02-21)



## [4.0.1](https://github.com/Availity/availity-react/compare/@availity/authorize@4.0.0...@availity/authorize@4.0.1) (2023-10-19)



# [4.0.0](https://github.com/Availity/availity-react/compare/@availity/authorize@3.0.0...@availity/authorize@4.0.0) (2023-10-16)


### Features

* **authorize:** upgrade react query to v4 ([69a78bd](https://github.com/Availity/availity-react/commit/69a78bdf39de42324981727c330baec21db5415d))


### BREAKING CHANGES

* **authorize:** react query has been upgraded to v4. you must upgrade
to @tanstack/react-query@^4.36.1 in order to use this package now



# [3.0.0](https://github.com/Availity/availity-react/compare/@availity/authorize@2.3.0...@availity/authorize@3.0.0) (2023-10-09)


### Features

* upgrade deps ([eccefc0](https://github.com/Availity/availity-react/commit/eccefc0549ebd5057595f6ac696642789375f48a))


### BREAKING CHANGES

* axios v1 is now required



# [2.3.0](https://github.com/Availity/availity-react/compare/@availity/authorize@2.2.1...@availity/authorize@2.3.0) (2023-05-23)


### Features

* **authorize:** adding a test to check for blockui when fetching ([6d14150](https://github.com/Availity/availity-react/commit/6d14150ad52fae1e43f02f133ce964bedfb75241))
* **authorize:** remove screen.debug() ([0b6176c](https://github.com/Availity/availity-react/commit/0b6176c22c9f031bb0260896d6e04d66fecb2be2))
* **authorize:** replace deprecated @availity/react-block-ui library with new @availity/block-ui ([6188c5b](https://github.com/Availity/availity-react/commit/6188c5bfe5e470347cd272645737529aa23ac62f))



## [2.2.1](https://github.com/Availity/availity-react/compare/@availity/authorize@2.2.0...@availity/authorize@2.2.1) (2022-11-22)



# [2.2.0](https://github.com/Availity/availity-react/compare/@availity/authorize@2.1.1...@availity/authorize@2.2.0) (2022-08-08)


### Features

* **authorize:** cache region ([3da1c36](https://github.com/Availity/availity-react/commit/3da1c36bc07f6115fb21696041ecbecd7989a7a6))



## [2.1.1](https://github.com/Availity/availity-react/compare/@availity/authorize@2.1.0...@availity/authorize@2.1.1) (2022-06-14)



# [2.1.0](https://github.com/Availity/availity-react/compare/@availity/authorize@2.0.3...@availity/authorize@2.1.0) (2022-06-14)


### Features

* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))



## [2.0.3](https://github.com/Availity/availity-react/compare/@availity/authorize@2.0.2...@availity/authorize@2.0.3) (2022-06-10)



## [2.0.2](https://github.com/Availity/availity-react/compare/@availity/authorize@2.0.1...@availity/authorize@2.0.2) (2022-05-24)



## 2.0.1 (2022-04-05)


### Bug Fixes

* **authorize:** move react-dom and react-query to peerDeps ([a3c25f9](https://github.com/Availity/availity-react/commit/a3c25f971719dea936dc7c7a3c7253f951c9f0d1))





# 2.0.0 (2022-01-31)


### Bug Fixes

* **authorize:** change query key to useAuthorize ([e916267](https://github.com/Availity/availity-react/commit/e91626725bae7c843e6f7023e5dc769169bf363b))


* feat(authorize)!: convert to typescript and add react-query ([056744a](https://github.com/Availity/availity-react/commit/056744ac7526544095cfe45749ed5249d73a8956))


### BREAKING CHANGES

* react-query provider now required,  args are stricter





## [1.6.2](https://github.com/Availity/availity-react/compare/@availity/authorize@1.6.1...@availity/authorize@1.6.2) (2021-12-20)

**Note:** Version bump only for package @availity/authorize





## 1.6.1 (2021-12-14)

**Note:** Version bump only for package @availity/authorize





# 1.6.0 (2021-11-15)


### Features

* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))





## 1.5.23 (2021-10-28)


### Bug Fixes

* **authorize:** resolve linter errors and add type ([fafea0c](https://github.com/Availity/availity-react/commit/fafea0c2b7ef6547b405e385e6b90df260aa8f52))





## [1.5.22](https://github.com/Availity/availity-react/compare/@availity/authorize@1.5.21...@availity/authorize@1.5.22) (2021-10-01)

**Note:** Version bump only for package @availity/authorize





## 1.5.21 (2021-09-28)

**Note:** Version bump only for package @availity/authorize





## 1.5.20 (2021-06-01)

**Note:** Version bump only for package @availity/authorize





## 1.5.19 (2020-11-17)

**Note:** Version bump only for package @availity/authorize





## 1.5.18 (2020-04-30)

**Note:** Version bump only for package @availity/authorize





## 1.5.17 (2020-04-30)

**Note:** Version bump only for package @availity/authorize





## 1.5.16 (2020-04-28)

**Note:** Version bump only for package @availity/authorize





## 1.5.15 (2020-04-17)

**Note:** Version bump only for package @availity/authorize





## 1.5.14 (2020-04-09)

**Note:** Version bump only for package @availity/authorize





## 1.5.13 (2020-04-08)

**Note:** Version bump only for package @availity/authorize





## 1.5.12 (2020-04-08)

**Note:** Version bump only for package @availity/authorize





## 1.5.11 (2020-04-07)

**Note:** Version bump only for package @availity/authorize





## 1.5.10 (2020-04-07)

**Note:** Version bump only for package @availity/authorize





## 1.5.9 (2020-04-06)

**Note:** Version bump only for package @availity/authorize





## 1.5.8 (2020-04-06)

**Note:** Version bump only for package @availity/authorize





## 1.5.7 (2020-04-06)

**Note:** Version bump only for package @availity/authorize





## 1.5.6 (2020-04-06)

**Note:** Version bump only for package @availity/authorize





## 1.5.5 (2020-04-03)

**Note:** Version bump only for package @availity/authorize





## 1.5.4 (2020-04-03)

**Note:** Version bump only for package @availity/authorize





## 1.5.3 (2020-04-02)

**Note:** Version bump only for package @availity/authorize





## 1.5.2 (2020-04-02)

**Note:** Version bump only for package @availity/authorize





## [1.5.1](https://github.com/Availity/availity-react/compare/@availity/authorize@1.5.0...@availity/authorize@1.5.1) (2020-02-19)

**Note:** Version bump only for package @availity/authorize





# [1.5.0](https://github.com/Availity/availity-react/compare/@availity/authorize@1.4.3...@availity/authorize@1.5.0) (2020-02-19)


### Features

* **authorize:** adds currentRegion to values returned from useAuthorize() ([245dd2c](https://github.com/Availity/availity-react/commit/245dd2c7015ed77870247b0ecfaccd5922983a6d))
* **authorize:** update type definition ([7a415c7](https://github.com/Availity/availity-react/commit/7a415c77fa042f60ba17b975a7c45eb4ab1e23a8))


### Performance Improvements

* **authorize:** dont need to check undefined permissions ([cb8fabe](https://github.com/Availity/availity-react/commit/cb8fabe6ab2e05e2b648b440dde414df37aa837c))





## [1.4.3](https://github.com/Availity/availity-react/compare/@availity/authorize@1.4.2...@availity/authorize@1.4.3) (2020-02-11)

**Note:** Version bump only for package @availity/authorize





## [1.4.2](https://github.com/Availity/availity-react/compare/@availity/authorize@1.4.1...@availity/authorize@1.4.2) (2020-02-10)

**Note:** Version bump only for package @availity/authorize





## [1.4.1](https://github.com/Availity/availity-react/compare/@availity/authorize@1.4.0...@availity/authorize@1.4.1) (2019-12-04)

**Note:** Version bump only for package @availity/authorize





# [1.4.0](https://github.com/Availity/availity-react/compare/@availity/authorize@1.3.1...@availity/authorize@1.4.0) (2019-12-03)


### Features

* **authorize:** add resources filter ([e266abc](https://github.com/Availity/availity-react/commit/e266abc037fd5940ffe7f5e4ef5852bff36a39de))





## [1.3.1](https://github.com/Availity/availity-react/compare/@availity/authorize@1.3.0...@availity/authorize@1.3.1) (2019-09-25)

**Note:** Version bump only for package @availity/authorize





# [1.3.0](https://github.com/Availity/availity-react/compare/@availity/authorize@1.2.2...@availity/authorize@1.3.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [1.2.2](https://github.com/Availity/availity-react/compare/@availity/authorize@1.2.1...@availity/authorize@1.2.2) (2019-08-19)

**Note:** Version bump only for package @availity/authorize





## [1.2.1](https://github.com/Availity/availity-react/compare/@availity/authorize@1.2.0...@availity/authorize@1.2.1) (2019-08-13)

**Note:** Version bump only for package @availity/authorize





# [1.2.0](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.8...@availity/authorize@1.2.0) (2019-07-19)


### Features

* **authorize:** created custom hook for getting authorized state ([cce12f3](https://github.com/Availity/availity-react/commit/cce12f3))





## [1.1.8](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.7...@availity/authorize@1.1.8) (2019-06-24)

**Note:** Version bump only for package @availity/authorize





## [1.1.7](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.6...@availity/authorize@1.1.7) (2019-06-17)

**Note:** Version bump only for package @availity/authorize





## [1.1.6](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.5...@availity/authorize@1.1.6) (2019-06-03)

**Note:** Version bump only for package @availity/authorize





## [1.1.5](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.4...@availity/authorize@1.1.5) (2019-05-09)


### Bug Fixes

* **authorize:** fixed unit tests :facepalm: ([87cac9d](https://github.com/Availity/availity-react/commit/87cac9d))
* **authorize:** the authorize component was using the wrong axi struct ([acb90b1](https://github.com/Availity/availity-react/commit/acb90b1))





## [1.1.4](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.2...@availity/authorize@1.1.4) (2019-03-04)

**Note:** Version bump only for package @availity/authorize





## [1.1.3](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.2...@availity/authorize@1.1.3) (2019-03-04)

**Note:** Version bump only for package @availity/authorize





## [1.1.2](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.1...@availity/authorize@1.1.2) (2019-02-25)


### Bug Fixes

* removed npmrc and added config to lerna for now creating locks ([efe82ab](https://github.com/Availity/availity-react/commit/efe82ab))
* removed package-locks,added npmrc ignore,fixed react as hoisted dep ([4648319](https://github.com/Availity/availity-react/commit/4648319))





## [1.1.1](https://github.com/Availity/availity-react/compare/@availity/authorize@1.1.0...@availity/authorize@1.1.1) (2019-02-13)


### Bug Fixes

* fixed package-locks ([ddb49bb](https://github.com/Availity/availity-react/commit/ddb49bb))
* so many package-lock.json's ([8b5dc24](https://github.com/Availity/availity-react/commit/8b5dc24))





# 1.1.0 (2019-02-08)


### Bug Fixes

* **feature:** fixed the repository for npm ([7a13a9e](https://github.com/Availity/availity-react/commit/7a13a9e))
* re-created package-locks ([49726de](https://github.com/Availity/availity-react/commit/49726de))


### Features

* **feature:** added packages from av-react to public ([2c32cf3](https://github.com/Availity/availity-react/commit/2c32cf3))
* **feature:** adding typescript support ([cfe57a2](https://github.com/Availity/availity-react/commit/cfe57a2))
