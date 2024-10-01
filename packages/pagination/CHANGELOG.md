# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [2.17.8](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.7...@availity/pagination@2.17.8) (2024-10-01)

### Dependency Updates

* `@availity/hooks` updated to version `2.17.7`


## [2.17.7](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.6...@availity/pagination@2.17.7) (2024-08-22)

### Dependency Updates

* `@availity/hooks` updated to version `2.17.6`
* `@availity/block-ui` updated to version `2.17.6`


# 1.0.0 (2024-08-22)

### Dependency Updates

* `@availity/hooks` updated to version `1.0.0`
* `@availity/block-ui` updated to version `1.0.0`

### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9252a37c067de3e5b15e583c4a3c06d6c5))
* **pagination:** add waitFor to test to wait for loading to finish ([a0d59ba](https://github.com/Availity/availity-react/commit/a0d59baa54f583b627da109e4ecfa86e5a43ea6f))
* **pagination:** allow custom getResult for AvResourcePagination ([0bb1cbf](https://github.com/Availity/availity-react/commit/0bb1cbfcc3672571458e2a80a31e5c1618d0348d))
* **pagination:** fix test ([143bae6](https://github.com/Availity/availity-react/commit/143bae64e8f48891a127a82f6eacc05ea4a2f5e4))
* **pagination:** fixed breaklabel prop not working ([4fb93e7](https://github.com/Availity/availity-react/commit/4fb93e74e58bd657a8b83f39489b72f3029de00e))
* **pagination:** fixed range error when records go over a certain limit ([44a2bc6](https://github.com/Availity/availity-react/commit/44a2bc64aeb101556d817c8cb0a7110ffce53f7c))
* **pagination:** fixed type, loading shouldn't toggle when pages equal ([39c715f](https://github.com/Availity/availity-react/commit/39c715f527da77e64cc696c3412d966a1997acff))
* **pagination:** handle resetParams when items prop is a function ([40cf6c2](https://github.com/Availity/availity-react/commit/40cf6c255c44b62b0fff1e1bfdd3987bc251d251))
* **pagination:** item type no longer extends Record ([99a7a54](https://github.com/Availity/availity-react/commit/99a7a545dd73b3b75b2114b07f19fed732a0b19b))
* **pagination:** resolve lint errors ([d1cf97c](https://github.com/Availity/availity-react/commit/d1cf97cbcf689f0e032cf6d7a1eb3984f8ebb786))
* **pagination:** set loading on resetParams ([f5e4d1d](https://github.com/Availity/availity-react/commit/f5e4d1d0f2fe48d66d97a7a0ac931043d917a4a0))
* **pagination:** set zIndex to 'auto' to avoid creating new stacking context ([15f4fb1](https://github.com/Availity/availity-react/commit/15f4fb13107f34dc7002849b05b24cd1cecab00a))
* **pagination:** update div to li to fix 508 compliance issues ([8a34a7f](https://github.com/Availity/availity-react/commit/8a34a7f3aa9eff579ec984c0bbfc107af0a7af60))
* **pagination:** update react-use ([739579a](https://github.com/Availity/availity-react/commit/739579a5dc14831594f7a625b49d2eebad386915))
* resetParam loading and test ([16acd4a](https://github.com/Availity/availity-react/commit/16acd4ac509c9e7c27d59a26527cac6d52fab74a))
* update test ([6b46317](https://github.com/Availity/availity-react/commit/6b46317ce02662b6fb5ada6fb6c1bf2cef703b65))
* upgrade yup and update sb stories ([68aeafe](https://github.com/Availity/availity-react/commit/68aeafe4fd7d90d7c88dbb24636ba7770fe87aa3))


### Features

* add change password component ([47e7041](https://github.com/Availity/availity-react/commit/47e70411c459a0651e60c605bffe2ccfc6d0e872))
* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b947487ef18c6e11486ad39203882a11bc8a1e7))
* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))
* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))
* **pagination:** add container tag to the pagination content ([9851d42](https://github.com/Availity/availity-react/commit/9851d42dc6b655d11f835b9d92721e5eadd0910e))
* **pagination:** add customizable aria-label to pagination buttons ([6dfe952](https://github.com/Availity/availity-react/commit/6dfe95229f59976e0241e98f3b6f59cd531cf83d))
* **pagination:** add debounceTimeout prop ([23a0a6c](https://github.com/Availity/availity-react/commit/23a0a6cc91193546b4f151154555cbc88aa771c6))
* **pagination:** add error, setError to usePagination ([3d47be2](https://github.com/Availity/availity-react/commit/3d47be2e84934878b83139d7b5de6f5dcc272c22))
* **pagination:** add infinite scroll ([caf8202](https://github.com/Availity/availity-react/commit/caf82023491be5e88e3bd9483053d604ffcd2abb))
* **pagination:** add listClassName prop for styled/unstyled pagination toggle ([92c14ae](https://github.com/Availity/availity-react/commit/92c14ae9309a668a0827923b6f787f03aa6e0a2f))
* **pagination:** add option for pagination text in controls ([43e2954](https://github.com/Availity/availity-react/commit/43e29548164144fe8d697865fdcd5b1fe3236ce8))
* **pagination:** add render prop ([2db9e17](https://github.com/Availity/availity-react/commit/2db9e17aa7da17e824603583d77c2ecb047a73d0))
* **pagination:** add resetParams prop ([3823a95](https://github.com/Availity/availity-react/commit/3823a95a1bb0288049af593e9a20bfad43a3a353))
* **pagination:** add shouldGetPageData prop ([7e3a83f](https://github.com/Availity/availity-react/commit/7e3a83f1c72a3a36de4103acc4fbe6bd18cb80ac))
* **pagination:** added margin pages and page ranges to the controls ([a2ee1de](https://github.com/Availity/availity-react/commit/a2ee1ded32837f0cd689b67d2e5106ba2842b302))
* **pagination:** added prop for onpagechange ([e542cd4](https://github.com/Availity/availity-react/commit/e542cd421866651a8b75bc30b4c825e4da8af8fb))
* **pagination:** added watchlist param to pagination provider ([2b721a2](https://github.com/Availity/availity-react/commit/2b721a2d87e1e4b20750581cce44cf18129a77aa))
* **pagination:** added watchlist tests and updated readme ([9e2fd11](https://github.com/Availity/availity-react/commit/9e2fd1168ade47a6cf0333bbbfcdade32e3078ea))
* **pagination:** adding aria-label prop ([ec80b57](https://github.com/Availity/availity-react/commit/ec80b5793fe30149c43a456b89d418b39157a8ad))
* **pagination:** adding defaultPage prop ([4312029](https://github.com/Availity/availity-react/commit/43120291e7392f5a2bae81d97727772e7ac87bfc))
* **pagination:** adding defaultPage to type ([d5bcf32](https://github.com/Availity/availity-react/commit/d5bcf327d111ede20dfe0db12c3d38fb9d9d17a7))
* **pagination:** adding try catch around json parse for localstorage get ([efd965b](https://github.com/Availity/availity-react/commit/efd965b9b694077333614d01acf0b889f4287a8c))
* **pagination:** convert to typescript ([04af0f9](https://github.com/Availity/availity-react/commit/04af0f96203ea528ad31d7f01248490750b336d8))
* **pagination:** defaulting defaultPage to 1 ([ee4fd2e](https://github.com/Availity/availity-react/commit/ee4fd2efdf1b5aff69da6b391f6d15c321d49064))
* **pagination:** fix proptype to bool ([0daf42f](https://github.com/Availity/availity-react/commit/0daf42fefe16c9e5ecdb9e6881549eee5cbc929f))
* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd05fcf0656d2309ae091938b334fd422ee)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)
* **pagination:** prev and next text on buttons ([#145](https://github.com/Availity/availity-react/issues/145)) ([7496dcb](https://github.com/Availity/availity-react/commit/7496dcbf05b267789464c202bcaf26c686c13fbb))
* **pagination:** remove react-block-ui in favor of @availity/block-ui, update tests ([60c9aa7](https://github.com/Availity/availity-react/commit/60c9aa736c10dea223126f885166322467a44f71))
* **pagination:** removing ariaLabel, ...rest takes care of it ([8dbce8d](https://github.com/Availity/availity-react/commit/8dbce8d9ad5ae57a312eafa0483779492821f71c))
* **pagination:** rest object will handle listClassName ([4c00d85](https://github.com/Availity/availity-react/commit/4c00d85dd20b0f0e981a39b33ce8841812b0699c))
* **pagination:** unbump version ([6698aad](https://github.com/Availity/availity-react/commit/6698aad375108d300298800ac6f66155d2aa7a30))
* **pagination:** update avLocalStorage ([a1fa6e0](https://github.com/Availity/availity-react/commit/a1fa6e0ef203b63bd13d4e128db10d71368821bb))


### Performance Improvements

* **pagination:** memoize items in pagination content ([c97eca6](https://github.com/Availity/availity-react/commit/c97eca6842d986fc5021400eec82b82386496802))


### BREAKING CHANGES

* **pagination:** pagination provider returns page count rather than array of pages



## [2.17.6](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.5...@availity/pagination@2.17.6) (2024-07-09)


### Bug Fixes

* **pagination:** update react-use ([739579a](https://github.com/Availity/availity-react/commit/739579a5dc14831594f7a625b49d2eebad386915))



## [2.17.5](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.4...@availity/pagination@2.17.5) (2024-05-31)

### Dependency Updates

* `hooks` updated to version `2.17.4`


## [2.17.4](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.3...@availity/pagination@2.17.4) (2024-02-21)



## [2.17.3](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.2...@availity/pagination@2.17.3) (2023-10-20)



## [2.17.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.1...@availity/pagination@2.17.2) (2023-10-16)


### Bug Fixes

* **pagination:** fix test ([143bae6](https://github.com/Availity/availity-react/commit/143bae64e8f48891a127a82f6eacc05ea4a2f5e4))



## [2.17.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.17.0...@availity/pagination@2.17.1) (2023-10-09)


### Bug Fixes

* update test ([6b46317](https://github.com/Availity/availity-react/commit/6b46317ce02662b6fb5ada6fb6c1bf2cef703b65))



# [2.17.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.16.0...@availity/pagination@2.17.0) (2023-07-31)


### Features

* **pagination:** remove react-block-ui in favor of @availity/block-ui, update tests ([60c9aa7](https://github.com/Availity/availity-react/commit/60c9aa736c10dea223126f885166322467a44f71))



# [2.16.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.5...@availity/pagination@2.16.0) (2023-07-20)


### Features

* add change password component ([47e7041](https://github.com/Availity/availity-react/commit/47e70411c459a0651e60c605bffe2ccfc6d0e872))



## [2.15.5](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.4...@availity/pagination@2.15.5) (2022-12-16)



## [2.15.4](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.3...@availity/pagination@2.15.4) (2022-12-15)



## [2.15.3](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.2...@availity/pagination@2.15.3) (2022-08-26)


### Bug Fixes

* **pagination:** update div to li to fix 508 compliance issues ([8a34a7f](https://github.com/Availity/availity-react/commit/8a34a7f3aa9eff579ec984c0bbfc107af0a7af60))



## [2.15.3-alpha.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.2...@availity/pagination@2.15.3-alpha.0) (2022-08-18)


### Bug Fixes

* **pagination:** update div to li to fix 508 compliance issues ([8a34a7f](https://github.com/Availity/availity-react/commit/8a34a7f3aa9eff579ec984c0bbfc107af0a7af60))



## [2.15.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.1...@availity/pagination@2.15.2) (2022-07-28)


### Bug Fixes

* **pagination:** item type no longer extends Record ([99a7a54](https://github.com/Availity/availity-react/commit/99a7a545dd73b3b75b2114b07f19fed732a0b19b))



## [2.15.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.15.0...@availity/pagination@2.15.1) (2022-06-14)



# [2.15.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.14.1...@availity/pagination@2.15.0) (2022-06-14)


### Features

* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))



## [2.14.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.14.0...@availity/pagination@2.14.1) (2022-06-10)



# [2.14.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.13.4...@availity/pagination@2.14.0) (2022-05-24)


### Bug Fixes

* upgrade yup and update sb stories ([68aeafe](https://github.com/Availity/availity-react/commit/68aeafe4fd7d90d7c88dbb24636ba7770fe87aa3))


### Features

* **pagination:** convert to typescript ([04af0f9](https://github.com/Availity/availity-react/commit/04af0f96203ea528ad31d7f01248490750b336d8))



## 2.13.4 (2022-03-08)

**Note:** Version bump only for package @availity/pagination





## 2.13.3 (2022-02-18)

**Note:** Version bump only for package @availity/pagination





## [2.13.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.13.1...@availity/pagination@2.13.2) (2021-12-20)

**Note:** Version bump only for package @availity/pagination





## 2.13.1 (2021-12-14)

**Note:** Version bump only for package @availity/pagination





# 2.13.0 (2021-12-08)


### Features

* **pagination:** add option for pagination text in controls ([43e2954](https://github.com/Availity/availity-react/commit/43e29548164144fe8d697865fdcd5b1fe3236ce8))
* **pagination:** fix proptype to bool ([0daf42f](https://github.com/Availity/availity-react/commit/0daf42fefe16c9e5ecdb9e6881549eee5cbc929f))
* **pagination:** unbump version ([6698aad](https://github.com/Availity/availity-react/commit/6698aad375108d300298800ac6f66155d2aa7a30))





# 2.12.0 (2021-11-15)


### Features

* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))





## [2.11.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.11.1...@availity/pagination@2.11.2) (2021-10-28)

**Note:** Version bump only for package @availity/pagination





## 2.11.1 (2021-10-28)


### Bug Fixes

* **pagination:** resolve lint errors ([d1cf97c](https://github.com/Availity/availity-react/commit/d1cf97cbcf689f0e032cf6d7a1eb3984f8ebb786))





# 2.11.0 (2021-10-11)


### Features

* **pagination:** adding try catch around json parse for localstorage get ([efd965b](https://github.com/Availity/availity-react/commit/efd965b9b694077333614d01acf0b889f4287a8c))





## [2.10.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.10.1...@availity/pagination@2.10.2) (2021-10-01)

**Note:** Version bump only for package @availity/pagination





## 2.10.1 (2021-09-28)

**Note:** Version bump only for package @availity/pagination





# 2.10.0 (2021-08-12)


### Features

* **pagination:** add customizable aria-label to pagination buttons ([6dfe952](https://github.com/Availity/availity-react/commit/6dfe95229f59976e0241e98f3b6f59cd531cf83d))
* **pagination:** add listClassName prop for styled/unstyled pagination toggle ([92c14ae](https://github.com/Availity/availity-react/commit/92c14ae9309a668a0827923b6f787f03aa6e0a2f))
* **pagination:** adding aria-label prop ([ec80b57](https://github.com/Availity/availity-react/commit/ec80b5793fe30149c43a456b89d418b39157a8ad))
* **pagination:** removing ariaLabel, ...rest takes care of it ([8dbce8d](https://github.com/Availity/availity-react/commit/8dbce8d9ad5ae57a312eafa0483779492821f71c))
* **pagination:** rest object will handle listClassName ([4c00d85](https://github.com/Availity/availity-react/commit/4c00d85dd20b0f0e981a39b33ce8841812b0699c))





## 2.9.8 (2021-06-01)

**Note:** Version bump only for package @availity/pagination





## 2.9.7 (2021-02-12)

**Note:** Version bump only for package @availity/pagination





## 2.9.6 (2021-01-06)

**Note:** Version bump only for package @availity/pagination





## 2.9.5 (2020-12-23)

**Note:** Version bump only for package @availity/pagination





## [2.9.4](https://github.com/Availity/availity-react/compare/@availity/pagination@2.9.3...@availity/pagination@2.9.4) (2020-11-17)

**Note:** Version bump only for package @availity/pagination





## 2.9.3 (2020-10-30)

**Note:** Version bump only for package @availity/pagination





## 2.9.2 (2020-08-13)

**Note:** Version bump only for package @availity/pagination





## 2.9.1 (2020-06-29)

**Note:** Version bump only for package @availity/pagination





# 2.9.0 (2020-05-29)


### Features

* **pagination:** add error, setError to usePagination ([3d47be2](https://github.com/Availity/availity-react/commit/3d47be2e84934878b83139d7b5de6f5dcc272c22))





## 2.8.18 (2020-04-30)

**Note:** Version bump only for package @availity/pagination





## 2.8.17 (2020-04-30)

**Note:** Version bump only for package @availity/pagination





## 2.8.16 (2020-04-28)

**Note:** Version bump only for package @availity/pagination





## 2.8.15 (2020-04-17)

**Note:** Version bump only for package @availity/pagination





## 2.8.14 (2020-04-09)

**Note:** Version bump only for package @availity/pagination





## 2.8.13 (2020-04-08)

**Note:** Version bump only for package @availity/pagination





## 2.8.12 (2020-04-08)

**Note:** Version bump only for package @availity/pagination





## 2.8.11 (2020-04-07)

**Note:** Version bump only for package @availity/pagination





## 2.8.10 (2020-04-07)

**Note:** Version bump only for package @availity/pagination





## 2.8.9 (2020-04-06)

**Note:** Version bump only for package @availity/pagination





## 2.8.8 (2020-04-06)

**Note:** Version bump only for package @availity/pagination





## 2.8.7 (2020-04-06)

**Note:** Version bump only for package @availity/pagination





## 2.8.6 (2020-04-06)

**Note:** Version bump only for package @availity/pagination





## 2.8.5 (2020-04-03)

**Note:** Version bump only for package @availity/pagination





## 2.8.4 (2020-04-03)

**Note:** Version bump only for package @availity/pagination





## 2.8.3 (2020-04-02)

**Note:** Version bump only for package @availity/pagination





## 2.8.2 (2020-04-02)

**Note:** Version bump only for package @availity/pagination





## [2.8.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.8.0...@availity/pagination@2.8.1) (2020-03-24)


### Bug Fixes

* **pagination:** allow custom getResult for AvResourcePagination ([0bb1cbf](https://github.com/Availity/availity-react/commit/0bb1cbfcc3672571458e2a80a31e5c1618d0348d))





# [2.8.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.7.1...@availity/pagination@2.8.0) (2020-03-19)


### Features

* **pagination:** add debounceTimeout prop ([23a0a6c](https://github.com/Availity/availity-react/commit/23a0a6cc91193546b4f151154555cbc88aa771c6))
* **pagination:** add shouldGetPageData prop ([7e3a83f](https://github.com/Availity/availity-react/commit/7e3a83f1c72a3a36de4103acc4fbe6bd18cb80ac))





## [2.7.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.7.0...@availity/pagination@2.7.1) (2020-03-17)


### Bug Fixes

* **pagination:** set zIndex to 'auto' to avoid creating new stacking context ([15f4fb1](https://github.com/Availity/availity-react/commit/15f4fb13107f34dc7002849b05b24cd1cecab00a))





# [2.7.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.6.2...@availity/pagination@2.7.0) (2020-02-11)


### Features

* **pagination:** update avLocalStorage ([a1fa6e0](https://github.com/Availity/availity-react/commit/a1fa6e0ef203b63bd13d4e128db10d71368821bb))





## [2.6.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.6.1...@availity/pagination@2.6.2) (2020-01-25)

**Note:** Version bump only for package @availity/pagination





## [2.6.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.6.0...@availity/pagination@2.6.1) (2019-12-13)

**Note:** Version bump only for package @availity/pagination





# [2.6.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.5.3...@availity/pagination@2.6.0) (2019-11-20)


### Features

* **pagination:** add render prop ([2db9e17](https://github.com/Availity/availity-react/commit/2db9e17aa7da17e824603583d77c2ecb047a73d0))


### Performance Improvements

* **pagination:** memoize items in pagination content ([c97eca6](https://github.com/Availity/availity-react/commit/c97eca6842d986fc5021400eec82b82386496802))





## [2.5.3](https://github.com/Availity/availity-react/compare/@availity/pagination@2.5.2...@availity/pagination@2.5.3) (2019-10-24)

**Note:** Version bump only for package @availity/pagination





## [2.5.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.5.1...@availity/pagination@2.5.2) (2019-10-24)

**Note:** Version bump only for package @availity/pagination





## [2.5.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.5.0...@availity/pagination@2.5.1) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





# [2.5.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.4.2...@availity/pagination@2.5.0) (2019-10-04)


### Features

* **pagination:** add infinite scroll ([caf8202](https://github.com/Availity/availity-react/commit/caf8202))





## [2.4.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.4.1...@availity/pagination@2.4.2) (2019-09-26)

**Note:** Version bump only for package @availity/pagination





## [2.4.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.4.0...@availity/pagination@2.4.1) (2019-09-25)

**Note:** Version bump only for package @availity/pagination





# [2.4.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.3.5...@availity/pagination@2.4.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [2.3.5](https://github.com/Availity/availity-react/compare/@availity/pagination@2.3.4...@availity/pagination@2.3.5) (2019-08-19)

**Note:** Version bump only for package @availity/pagination





## [2.3.4](https://github.com/Availity/availity-react/compare/@availity/pagination@2.3.3...@availity/pagination@2.3.4) (2019-08-13)

**Note:** Version bump only for package @availity/pagination





## [2.3.3](https://github.com/Availity/availity-react/compare/@availity/pagination@2.3.2...@availity/pagination@2.3.3) (2019-08-11)

**Note:** Version bump only for package @availity/pagination





## [2.3.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.3.1...@availity/pagination@2.3.2) (2019-07-23)

**Note:** Version bump only for package @availity/pagination





## [2.3.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.3.0...@availity/pagination@2.3.1) (2019-06-24)

**Note:** Version bump only for package @availity/pagination





# [2.3.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.2.0...@availity/pagination@2.3.0) (2019-06-11)


### Bug Fixes

* **pagination:** handle resetParams when items prop is a function ([40cf6c2](https://github.com/Availity/availity-react/commit/40cf6c2))


### Features

* **pagination:** add resetParams prop ([3823a95](https://github.com/Availity/availity-react/commit/3823a95))





# [2.2.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.1.1...@availity/pagination@2.2.0) (2019-06-05)


### Features

* **pagination:** prev and next text on buttons ([#145](https://github.com/Availity/availity-react/issues/145)) ([7496dcb](https://github.com/Availity/availity-react/commit/7496dcb))





## [2.1.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.1.0...@availity/pagination@2.1.1) (2019-06-03)

**Note:** Version bump only for package @availity/pagination





# [2.1.0](https://github.com/Availity/availity-react/compare/@availity/pagination@2.0.3...@availity/pagination@2.1.0) (2019-05-30)


### Features

* **pagination:** adding defaultPage prop ([4312029](https://github.com/Availity/availity-react/commit/4312029))
* **pagination:** adding defaultPage to type ([d5bcf32](https://github.com/Availity/availity-react/commit/d5bcf32))
* **pagination:** defaulting defaultPage to 1 ([ee4fd2e](https://github.com/Availity/availity-react/commit/ee4fd2e))





## [2.0.3](https://github.com/Availity/availity-react/compare/@availity/pagination@2.0.2...@availity/pagination@2.0.3) (2019-05-29)

**Note:** Version bump only for package @availity/pagination





## [2.0.2](https://github.com/Availity/availity-react/compare/@availity/pagination@2.0.1...@availity/pagination@2.0.2) (2019-05-02)


### Bug Fixes

* **pagination:** fixed breaklabel prop not working ([4fb93e7](https://github.com/Availity/availity-react/commit/4fb93e7))





## [2.0.1](https://github.com/Availity/availity-react/compare/@availity/pagination@2.0.0...@availity/pagination@2.0.1) (2019-03-14)

**Note:** Version bump only for package @availity/pagination





# [2.0.0](https://github.com/Availity/availity-react/compare/@availity/pagination@1.3.0...@availity/pagination@2.0.0) (2019-03-13)


### Bug Fixes

* **pagination:** fixed range error when records go over a certain limit ([44a2bc6](https://github.com/Availity/availity-react/commit/44a2bc6))


### BREAKING CHANGES

* **pagination:** pagination provider returns page count rather than array of pages





# [1.3.0](https://github.com/Availity/availity-react/compare/@availity/pagination@1.2.0...@availity/pagination@1.3.0) (2019-03-08)


### Bug Fixes

* **pagination:** fixed type, loading shouldn't toggle when pages equal ([39c715f](https://github.com/Availity/availity-react/commit/39c715f))


### Features

* **pagination:** add container tag to the pagination content ([9851d42](https://github.com/Availity/availity-react/commit/9851d42))
* **pagination:** added watchlist param to pagination provider ([2b721a2](https://github.com/Availity/availity-react/commit/2b721a2))
* **pagination:** added watchlist tests and updated readme ([9e2fd11](https://github.com/Availity/availity-react/commit/9e2fd11))





# [1.2.0](https://github.com/Availity/availity-react/compare/@availity/pagination@1.1.0...@availity/pagination@1.2.0) (2019-03-05)


### Features

* **pagination:** added margin pages and page ranges to the controls ([a2ee1de](https://github.com/Availity/availity-react/commit/a2ee1de))
* **pagination:** added prop for onpagechange ([e542cd4](https://github.com/Availity/availity-react/commit/e542cd4))





# 1.1.0 (2019-03-04)


### Features

* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)





# 1.6.0 (2019-03-04)


### Features

* **pagination:** pagination components using hooks ([590e5fd](https://github.com/Availity/availity-react/commit/590e5fd)), closes [#27](https://github.com/Availity/availity-react/issues/27) [#64](https://github.com/Availity/availity-react/issues/64)
