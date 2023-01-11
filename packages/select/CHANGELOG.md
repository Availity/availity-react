# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [3.3.3-alpha.0](https://github.com/Availity/availity-react/compare/@availity/select@3.3.2...@availity/select@3.3.3-alpha.0) (2023-01-09)


### Features

* **select:** add support for the resource select to call regular (get) query instead of forcing it to be a postget to fix significant performance issues ([21b9312](https://github.com/Availity/availity-react/commit/21b9312672f82db696a01e6f499cda082eb55e11))



## [3.3.2](https://github.com/Availity/availity-react/compare/@availity/select@3.3.1...@availity/select@3.3.2) (2022-08-03)


### Bug Fixes

* **select:** firefox grid bug ([851b9d3](https://github.com/Availity/availity-react/commit/851b9d30a6eca9c0488a87d878be7f275411ce4b))



## [3.3.1](https://github.com/Availity/availity-react/compare/@availity/select@3.3.0...@availity/select@3.3.1) (2022-07-19)


### Bug Fixes

* **select:** add unique label to clear button ([00c05c1](https://github.com/Availity/availity-react/commit/00c05c1d8c8c6fd3aa8ae671fe44bc63580437ea))



# [3.3.0](https://github.com/Availity/availity-react/compare/@availity/select@3.2.0...@availity/select@3.3.0) (2022-07-13)


### Bug Fixes

* **select:** cleanup clear button and selectStyles ([f5fbeaa](https://github.com/Availity/availity-react/commit/f5fbeaab2717f3f11d08f1f34d882a59210e072b))
* **select:** fix input component proptype ([fe5752a](https://github.com/Availity/availity-react/commit/fe5752acff50ea8fdae7495088bcc17346d4a716))


### Features

* **select:** move clear field button to outside of field, allow aria-required, export styling fix [#933](https://github.com/Availity/availity-react/issues/933) ([d2b82f2](https://github.com/Availity/availity-react/commit/d2b82f2d6a9112191524a35e0abc2d006d28553b))



# [3.2.0](https://github.com/Availity/availity-react/compare/@availity/select@3.1.2...@availity/select@3.2.0) (2022-06-30)


### Features

* **select:** getResult to respect async functions ([4eea613](https://github.com/Availity/availity-react/commit/4eea613107c74a0d26161e5351dbf57da2726581))



## [3.1.2](https://github.com/Availity/availity-react/compare/@availity/select@3.1.1...@availity/select@3.1.2) (2022-06-23)


### Bug Fixes

* **select:** display selected option when raw is false ([3095ada](https://github.com/Availity/availity-react/commit/3095ada5e85b91f55a2c039722e872a7dcbdc777))



## [3.1.1](https://github.com/Availity/availity-react/compare/@availity/select@3.1.0...@availity/select@3.1.1) (2022-06-14)



# [3.1.0](https://github.com/Availity/availity-react/compare/@availity/select@3.0.1...@availity/select@3.1.0) (2022-06-14)


### Features

* **form:** add currency input ([fa9eea6](https://github.com/Availity/availity-react/commit/fa9eea6a3b3dd2ef741a0658c102e36c6db5288c))



## [3.0.1](https://github.com/Availity/availity-react/compare/@availity/select@3.0.0...@availity/select@3.0.1) (2022-06-10)



# [3.0.0](https://github.com/Availity/availity-react/compare/@availity/select@2.10.0...@availity/select@3.0.0) (2022-05-24)


### Bug Fixes

* upgrade yup and update sb stories ([68aeafe](https://github.com/Availity/availity-react/commit/68aeafe4fd7d90d7c88dbb24636ba7770fe87aa3))


* feat(select)!: compile with tsup ([537ac57](https://github.com/Availity/availity-react/commit/537ac57812688dce41f02b575dda0fc281a3d958))


### BREAKING CHANGES

* import resources from the root file instead of @availity/select/resources



# 2.10.0 (2022-05-11)


### Features

* **select:** add back unit test for extended payers api all call ([0d4a8cf](https://github.com/Availity/availity-react/commit/0d4a8cf27a184f31517b495a3b3e9faa96f0c708))
* **select:** add custom select for payers through extended-payers api ([22eda92](https://github.com/Availity/availity-react/commit/22eda92850a870047bb5ab3df1a4b62297b392cb))
* **select:** creating a resource select directly instead of making payer select to avoid null defaultconfig issues ([f81a1f6](https://github.com/Availity/availity-react/commit/f81a1f6622cc4fc8fc0bbfebfa46d20e788b0e54))
* **select:** properly use all call instead of postGet ([42f8350](https://github.com/Availity/availity-react/commit/42f83503736aa5cc0597bf1ced584a768adcebf3))
* **select:** remove redundant select unit test and update documentation ([40d6f90](https://github.com/Availity/availity-react/commit/40d6f90ef7b9777d9ea86cbd7571bf6d1e595240))





## [2.9.1](https://github.com/Availity/availity-react/compare/@availity/select@2.9.0...@availity/select@2.9.1) (2022-03-09)


### Bug Fixes

* **select:** add resource select types ([2cda8f4](https://github.com/Availity/availity-react/commit/2cda8f48459d12f8b272a4411ea044a810106b13))
* **select:** fix typedefs for all select components ([2334bce](https://github.com/Availity/availity-react/commit/2334bceeb48dbcf01b91c706e5f3049c8bf345a9))





# [2.9.0](https://github.com/Availity/availity-react/compare/@availity/select@2.8.0...@availity/select@2.9.0) (2022-02-24)


### Features

* **select:** add aria-hidden='false' for individual clear indicator ([ae17081](https://github.com/Availity/availity-react/commit/ae17081e143210beaa8eef42456cd8ec2def6863))
* **select:** merge conflicts ([7af8633](https://github.com/Availity/availity-react/commit/7af863357d225c1386660fb8b8ac13574fd6917a))
* **select:** run prettier ([00c10e3](https://github.com/Availity/availity-react/commit/00c10e3e07cc5993859cf5714cdefbf19bc68c90))





# [2.8.0](https://github.com/Availity/availity-react/compare/@availity/select@2.7.1...@availity/select@2.8.0) (2022-02-24)


### Features

* **select:** added role and aria attributes to clear indicator of select ([f2feca8](https://github.com/Availity/availity-react/commit/f2feca8c08e6b6a46daa2dc9dc7b018571c8db3d))
* **select:** fix lint errors ([1f0f8b3](https://github.com/Availity/availity-react/commit/1f0f8b3aad77d2bf30b44d6837159a129747d063))
* **select:** remove console statement ([46d4d9d](https://github.com/Availity/availity-react/commit/46d4d9d1870c18ae98bacda3325fa32db040d2da))





## [2.7.1](https://github.com/Availity/availity-react/compare/@availity/select@2.7.0...@availity/select@2.7.1) (2022-02-23)


### Bug Fixes

* update proptype and typedef for helpMessage ([f61d0a1](https://github.com/Availity/availity-react/commit/f61d0a1c204900e55046262aa2f06056ce858c3b))





# 2.7.0 (2022-02-23)


### Features

* add prop to allow inputValue to not be encoded ([9c598a8](https://github.com/Availity/availity-react/commit/9c598a8d4b69f3aebfc215a56f81501fa3451b58))





## 2.6.5 (2022-02-17)


### Bug Fixes

* **select:** allow valueKey to work with ResourceSelect ([85c554d](https://github.com/Availity/availity-react/commit/85c554d6d5b519c5d9ec6342a6f5b074ae8520a9))





## [2.6.4](https://github.com/Availity/availity-react/compare/@availity/select@2.6.3...@availity/select@2.6.4) (2022-02-11)

**Note:** Version bump only for package @availity/select





## [2.6.3](https://github.com/Availity/availity-react/compare/@availity/select@2.6.2...@availity/select@2.6.3) (2022-02-04)

**Note:** Version bump only for package @availity/select





## 2.6.2 (2022-02-03)

**Note:** Version bump only for package @availity/select





## [2.6.1](https://github.com/Availity/availity-react/compare/@availity/select@2.6.0...@availity/select@2.6.1) (2022-01-27)


### Bug Fixes

* **select:** remove role and attributes from clear indicator ([b4eae57](https://github.com/Availity/availity-react/commit/b4eae5751967a1f85b9b0c6e0064086e50f13e56))





# [2.6.0](https://github.com/Availity/availity-react/compare/@availity/select@2.5.0...@availity/select@2.6.0) (2022-01-25)


### Features

* **select:** added role and aria attributes to clear indicator of select ([8de0038](https://github.com/Availity/availity-react/commit/8de003825d3049f07ec25a8fc8decbfc3a357323))





# [2.5.0](https://github.com/Availity/availity-react/compare/@availity/select@2.4.0...@availity/select@2.5.0) (2022-01-19)


### Features

* **select:** add ability to override searchTerm and fix default of method to POST ([7af25f0](https://github.com/Availity/availity-react/commit/7af25f07162c9d725ea2c394eb95b40958e680db))
* **select:** add docs, reset typescript file ([9f875a2](https://github.com/Availity/availity-react/commit/9f875a283f0966bbbb79396b92b77287d81f976e))
* **select:** add test, apply searchTerm for graph ql stuff too ([725bd64](https://github.com/Availity/availity-react/commit/725bd64a877b63e56bae82af495ffc9e890cf7f4))





# 2.4.0 (2022-01-13)


### Features

* **select:** allow components override ([3db073d](https://github.com/Availity/availity-react/commit/3db073dc3b3dd3532b60f809ed349a61e14ab17f))





## [2.3.2](https://github.com/Availity/availity-react/compare/@availity/select@2.3.1...@availity/select@2.3.2) (2021-12-20)

**Note:** Version bump only for package @availity/select





## 2.3.1 (2021-12-14)

**Note:** Version bump only for package @availity/select





# 2.3.0 (2021-12-03)


### Features

* **select:** add placeholder prop ([0f115fc](https://github.com/Availity/availity-react/commit/0f115fc01d812ab65ff1458ed4f3a66684188f39))
* **select:** associate help and error messages to input ([5e042c6](https://github.com/Availity/availity-react/commit/5e042c600887a2aa7fd82c3d3f245c63666464a0))
* **select:** rename error variable ([f1e74f8](https://github.com/Availity/availity-react/commit/f1e74f8cffeaf232b7df85fdc6e2b7385f436d6d))
* **select:** rename error variable ([ed50160](https://github.com/Availity/availity-react/commit/ed50160fc5523b4fd4badfcf04d8f10f7491155e))





## [2.2.1](https://github.com/Availity/availity-react/compare/@availity/select@2.2.0...@availity/select@2.2.1) (2021-11-30)

**Note:** Version bump only for package @availity/select





# [2.2.0](https://github.com/Availity/availity-react/compare/@availity/select@2.1.2...@availity/select@2.2.0) (2021-11-19)


### Features

* **select:** add helpMessage prop ([68014af](https://github.com/Availity/availity-react/commit/68014afc0bcb6b082ff6042c8880655fe31ada1d))





## [2.1.2](https://github.com/Availity/availity-react/compare/@availity/select@2.1.1...@availity/select@2.1.2) (2021-11-16)


### Bug Fixes

* **select:** use withAsyncPaginate instead of SelectComponent prop for creatable AsyncPaginate selects ([b45b0d4](https://github.com/Availity/availity-react/commit/b45b0d4a4a041c3d8c35939fc7e6494bd96cf5b8))





## [2.1.1](https://github.com/Availity/availity-react/compare/@availity/select@2.1.0...@availity/select@2.1.1) (2021-11-15)


### Bug Fixes

* **select:** set new colors due to accessibility issue when error changes border and color ([40b0156](https://github.com/Availity/availity-react/commit/40b0156f41436bf4b293d44861127996e5b4489d))
* **select,reactstrap-validation-select:** fixed select color to fix contrast issue with white text ([6e5bf3a](https://github.com/Availity/availity-react/commit/6e5bf3aa21446c17fc29548a177ac2ba75e85b07))





# [2.1.0](https://github.com/Availity/availity-react/compare/@availity/select@2.0.1...@availity/select@2.1.0) (2021-11-15)


### Features

* move storybook, stories, and fix hmr ([2f65f71](https://github.com/Availity/availity-react/commit/2f65f71769d2d981e22700b87a09516833588f64))





## [2.0.1](https://github.com/Availity/availity-react/compare/@availity/select@2.0.0...@availity/select@2.0.1) (2021-11-12)


### Bug Fixes

* **select:** set new colors due to accessibility issue when error changes border and color ([40b0156](https://github.com/Availity/availity-react/commit/40b0156f41436bf4b293d44861127996e5b4489d))





# [2.0.0](https://github.com/Availity/availity-react/compare/@availity/select@1.0.6...@availity/select@2.0.0) (2021-11-12)


### Bug Fixes

* **select:** use label from availity/form ([77dc1a5](https://github.com/Availity/availity-react/commit/77dc1a5fc73f38531371a81ee464c3c64b55e514))


### Features

* **select:** add label component with required asterisk ([ee4913c](https://github.com/Availity/availity-react/commit/ee4913c42813e19eb45bcf97fd14c307b831c5f3))


### BREAKING CHANGES

* **select:** Requires v1.1.0 of form for label component





# [1.1.0](https://github.com/Availity/availity-react/compare/@availity/select@1.0.6...@availity/select@1.1.0) (2021-11-09)


### Features

* add defaultToFirstOption for resource select ([5ea6c80](https://github.com/Availity/availity-react/commit/5ea6c80216319f1548299a51bfe083f002a44798))





## [1.0.6](https://github.com/Availity/availity-react/compare/@availity/select@1.0.3...@availity/select@1.0.6) (2021-11-05)


### Bug Fixes

* coordinate accessible UI changes ([ee84d14](https://github.com/Availity/availity-react/commit/ee84d14412864943e626422e075071cd0571f783))





## [1.0.5](https://github.com/Availity/availity-react/compare/@availity/select@1.0.4...@availity/select@1.0.5) (2021-10-28)


### Bug Fixes

* **select:** pass ref as selectRef when using async component ([729630e](https://github.com/Availity/availity-react/commit/729630e478d5b953f87614af95c83755c5f1c3b6))





## [1.0.4](https://github.com/Availity/availity-react/compare/@availity/select@1.0.3...@availity/select@1.0.4) (2021-10-28)

**Note:** Version bump only for package @availity/select





## [1.0.3](https://github.com/Availity/availity-react/compare/@availity/select@1.0.2...@availity/select@1.0.3) (2021-10-28)


### Bug Fixes

* upgrade eslint-config-availity and fix the errors ([6da0423](https://github.com/Availity/availity-react/commit/6da0423ecfa72b426287fd62ad00445fefce024e))





## 1.0.2 (2021-10-27)

**Note:** Version bump only for package @availity/select





## [1.0.1](https://github.com/Availity/availity-react/compare/@availity/select@1.0.0...@availity/select@1.0.1) (2021-10-19)


### Bug Fixes

* **select:** update typedef ([42f8cd3](https://github.com/Availity/availity-react/commit/42f8cd37b6cd4d1d38882988de73d4c82385ac4f))





# [1.0.0](https://github.com/Availity/availity-react/compare/@availity/select@0.20.4...@availity/select@1.0.0) (2021-10-19)

**Note:** Version bump only for package @availity/select





## 0.20.4 (2021-10-19)

**Note:** Version bump only for package @availity/select





## [0.20.3](https://github.com/Availity/availity-react/compare/@availity/select@0.20.2...@availity/select@0.20.3) (2021-10-19)

**Note:** Version bump only for package @availity/select





## [0.20.2](https://github.com/Availity/availity-react/compare/@availity/select@0.20.1...@availity/select@0.20.2) (2021-10-19)

**Note:** Version bump only for package @availity/select





## [0.20.1](https://github.com/Availity/availity-react/compare/@availity/select@0.20.0...@availity/select@0.20.1) (2021-10-19)

**Note:** Version bump only for package @availity/select





# 0.20.0 (2021-10-19)


### Features

* **select:** upgrade react-select-async-paginate to latest ([ec4b380](https://github.com/Availity/availity-react/commit/ec4b380284594255b346b20943e3e969a17b4bd5))


* feat(select)!: upgrade react-select v3 to v5 and removed unneeded type import ([43bd83c](https://github.com/Availity/availity-react/commit/43bd83c837acaa9c3d844826bd150bcc7667b5af))


### BREAKING CHANGES

* upgraded to version 5 of react-select
feat(select): added new yarn.lock





# 0.19.0 (2021-10-08)


### Features

* **select:** pull field help icon out of label element ([e2ead22](https://github.com/Availity/availity-react/commit/e2ead22326ec5863755398d9b3f68b78c14345c1))





## [0.18.4](https://github.com/Availity/availity-react/compare/@availity/select@0.18.3...@availity/select@0.18.4) (2021-10-04)

**Note:** Version bump only for package @availity/select





## [0.18.3](https://github.com/Availity/availity-react/compare/@availity/select@0.18.2...@availity/select@0.18.3) (2021-10-01)

**Note:** Version bump only for package @availity/select





## 0.18.2 (2021-09-28)

**Note:** Version bump only for package @availity/select





## [0.18.1](https://github.com/Availity/availity-react/compare/@availity/select@0.18.0...@availity/select@0.18.1) (2021-09-17)

**Note:** Version bump only for package @availity/select





# [0.18.0](https://github.com/Availity/availity-react/compare/@availity/select@0.17.12...@availity/select@0.18.0) (2021-09-13)


### Features

* rmv unused prop type SIH-1194 ([266928f](https://github.com/Availity/availity-react/commit/266928f2a3fa7e2c046e3d7a2ca0c416461a5af0))
* use distinct id as name and add proptypes ([a4b1de2](https://github.com/Availity/availity-react/commit/a4b1de29709d5658aba53674123b4bed4b9d0789))
* used innerProps to add role, name and state to field options SIH-1194 ([d67a6c0](https://github.com/Availity/availity-react/commit/d67a6c08ec3c8e904c8d113fee2bdadca421aac1))
* used innerProps to add role, name and state to field options SIH-1194 ([61bbaea](https://github.com/Availity/availity-react/commit/61bbaeaa1934b2a9837a709f56c9751a5f2c5a3b))
* used innerProps to add role, name and state to field options SIH-1194 ([2ac2233](https://github.com/Availity/availity-react/commit/2ac223320c844c5b6767fb80f8e816e50a8a1987))





## [0.17.12](https://github.com/Availity/availity-react/compare/@availity/select@0.17.11...@availity/select@0.17.12) (2021-09-13)

**Note:** Version bump only for package @availity/select





## 0.17.11 (2021-09-09)


### Bug Fixes

* **select:** fixed the contrast issues with the select options background and text color ([1ba87f5](https://github.com/Availity/availity-react/commit/1ba87f5a1b064ce43888547e87315761f1fdf1ef))





## [0.17.10](https://github.com/Availity/availity-react/compare/@availity/select@0.17.9...@availity/select@0.17.10) (2021-06-11)

**Note:** Version bump only for package @availity/select





## 0.17.9 (2021-06-01)

**Note:** Version bump only for package @availity/select





## 0.17.8 (2021-04-20)

**Note:** Version bump only for package @availity/select





## 0.17.7 (2021-02-12)

**Note:** Version bump only for package @availity/select





## [0.17.6](https://github.com/Availity/availity-react/compare/@availity/select@0.17.5...@availity/select@0.17.6) (2021-01-06)


### Bug Fixes

* **select:** add getResult function to AvRegionSelect ([9ae580d](https://github.com/Availity/availity-react/commit/9ae580db51b94b6cf717624a4eebb2e8de4ee882))





## 0.17.5 (2021-01-04)


### Bug Fixes

* **select:** ensure cacheUniq is an array and rename to cacheUniqs ([0338c32](https://github.com/Availity/availity-react/commit/0338c322fed01c6a87aa07cfcb48d2913cfbafcf))
* **select:** fixes error when cacheUniq isn't an array ([c3de0ce](https://github.com/Availity/availity-react/commit/c3de0ce6693221ca427919b244dd2ce01ab92181))





## [0.17.4](https://github.com/Availity/availity-react/compare/@availity/select@0.17.3...@availity/select@0.17.4) (2020-12-16)


### Bug Fixes

* clearable multiselects not getting cleared when clicking x on the value ([25f4e56](https://github.com/Availity/availity-react/commit/25f4e56718e40131f40fa9efd1d54ecbc8e87992))





## [0.17.3](https://github.com/Availity/availity-react/compare/@availity/select@0.17.2...@availity/select@0.17.3) (2020-12-14)

**Note:** Version bump only for package @availity/select





## 0.17.2 (2020-12-04)


### Bug Fixes

* **select:** allowSelectAll account for null value ([3f47b7e](https://github.com/Availity/availity-react/commit/3f47b7e420407065c0491f8cb886178308223661))





## [0.17.1](https://github.com/Availity/availity-react/compare/@availity/select@0.17.0...@availity/select@0.17.1) (2020-11-17)


### Bug Fixes

* **select:** allow fieldnames that use dot notation to be autofilled ([d89e10a](https://github.com/Availity/availity-react/commit/d89e10ade91e4d8b1da3c43ee6f1152cff6fc436))





# 0.17.0 (2020-11-16)


### Features

* **select:** add ability to waitUntilFocused to loadOptions ([d975506](https://github.com/Availity/availity-react/commit/d97550667aa8d6823327417c60028fc0312f1599))





## [0.16.3](https://github.com/Availity/availity-react/compare/@availity/select@0.16.2...@availity/select@0.16.3) (2020-10-30)


### Bug Fixes

* **select:** allow fieldnames that use dot notation to be autofilled ([d89e10a](https://github.com/Availity/availity-react/commit/d89e10ade91e4d8b1da3c43ee6f1152cff6fc436))





## 0.16.2 (2020-10-12)

**Note:** Version bump only for package @availity/select





## 0.16.1 (2020-10-06)

**Note:** Version bump only for package @availity/select





# 0.16.0 (2020-09-30)


### Features

* **select:** add allowSelectAll option when isMulti is true ([21953a9](https://github.com/Availity/availity-react/commit/21953a91e631291f470daf7f256a016934936ae2))





# [0.15.0](https://github.com/Availity/availity-react/compare/@availity/select@0.14.0...@availity/select@0.15.0) (2020-08-18)


### Bug Fixes

* **select:** pass params to all and check pageAll resp for data ([1f32afe](https://github.com/Availity/availity-react/commit/1f32afe5086f5bbd7e500a0c7e00adf8201571e9))


### Features

* **select:** add pageAllSearchBy and add to regionSelect ([f72a83c](https://github.com/Availity/availity-react/commit/f72a83c30ed88b10edf8865f7e5d296c66369359))
* **select:** add pageAllSearchBy to tst ([9377f80](https://github.com/Availity/availity-react/commit/9377f807dab720e85391f5616294068b802b14c8))





# 0.14.0 (2020-08-18)


### Features

* **select:** add pageAllSearchBy and add to regionSelect ([f72a83c](https://github.com/Availity/availity-react/commit/f72a83c30ed88b10edf8865f7e5d296c66369359))
* **select:** add pageAllSearchBy to tst ([9377f80](https://github.com/Availity/availity-react/commit/9377f807dab720e85391f5616294068b802b14c8))





## [0.13.6](https://github.com/Availity/availity-react/compare/@availity/select@0.13.5...@availity/select@0.13.6) (2020-07-30)

**Note:** Version bump only for package @availity/select





## [0.13.5](https://github.com/Availity/availity-react/compare/@availity/select@0.13.4...@availity/select@0.13.5) (2020-07-21)


### Bug Fixes

* **select:** fixes raw option being returned from getViewValue by doing a deep comparison ([27a6c8f](https://github.com/Availity/availity-react/commit/27a6c8fef7c943d1207b4e62195f09b3c0826a3d))





## 0.13.4 (2020-07-20)

**Note:** Version bump only for package @availity/select





## [0.13.3](https://github.com/Availity/availity-react/compare/@availity/select@0.13.2...@availity/select@0.13.3) (2020-06-22)


### Bug Fixes

* **select:** allow pageAll to call getResult for addtl filtering ([b1cef12](https://github.com/Availity/availity-react/commit/b1cef12afd37cf24b6885c7fadb990b55e36dda7))





## [0.13.2](https://github.com/Availity/availity-react/compare/@availity/select@0.13.1...@availity/select@0.13.2) (2020-06-18)

**Note:** Version bump only for package @availity/select





## 0.13.1 (2020-06-18)

**Note:** Version bump only for package @availity/select





# [0.13.0](https://github.com/Availity/availity-react/compare/@availity/select@0.12.0...@availity/select@0.13.0) (2020-06-05)


### Features

* **select:** add onError prop for api errors ([eadc10e](https://github.com/Availity/availity-react/commit/eadc10efb0c9a67071656f2c0b1b8a556cad281e))


### Reverts

* Revert "test(select): onError test" ([972a58c](https://github.com/Availity/availity-react/commit/972a58c44aaf76666bee74fe77837668ce4b5ba1))





# [0.12.0](https://github.com/Availity/availity-react/compare/@availity/select@0.11.1...@availity/select@0.12.0) (2020-06-03)


### Bug Fixes

* **select:** update orgSelect ts ([391add7](https://github.com/Availity/availity-react/commit/391add716450be30c7410cf81d0ac6696511dbb7))


### Features

* **select:** add permissionsIds to organizationSelect postGetArgs ([28ea098](https://github.com/Availity/availity-react/commit/28ea098a6c6985dcad58a0c0330f35ef45025cef))
* **select:** add ts props to orgSelect ([c2f44ba](https://github.com/Availity/availity-react/commit/c2f44baedabf190aae37804365f53b2c96552278))
* **select:** allow numbers for org select ([035b735](https://github.com/Availity/availity-react/commit/035b73590a5e5964786fc2f95b328fc146755876))
* **select:** keep permissionId param in doc organizationSelect, undefined check ([07764f1](https://github.com/Availity/availity-react/commit/07764f1393f8ad0a7c0b64f7817c98318595fa13))





## [0.11.1](https://github.com/Availity/availity-react/compare/@availity/select@0.11.0...@availity/select@0.11.1) (2020-05-27)


### Bug Fixes

* **select:** fixes additionalPostGetArgs object always being created, removes extra comma in docs ([4201222](https://github.com/Availity/availity-react/commit/4201222a5759767ec84970874d54b8be472993ee))





# [0.11.0](https://github.com/Availity/availity-react/compare/@availity/select@0.10.0...@availity/select@0.11.0) (2020-05-22)


### Bug Fixes

* **select:** add pageAll to ts ([72e3c24](https://github.com/Availity/availity-react/commit/72e3c240b01fd40f193664759463c41b200e4a67))
* **select:** rename to pageAll ([83f9b39](https://github.com/Availity/availity-react/commit/83f9b3978c8e87270a1d1d3a495e728837e20e9b))


### Features

* **select:** add shouldFilterByAllOptions param for client side filtering on regions ([fc58730](https://github.com/Availity/availity-react/commit/fc587300f4e0f27013d337c85ad4c3211df23d45))





# [0.10.0](https://github.com/Availity/availity-react/compare/@availity/select@0.9.28...@availity/select@0.10.0) (2020-05-11)


### Features

* **select:** add additionalPostGetArgs to ResourceSelect, revert AvOrganizationSelect ([2529885](https://github.com/Availity/availity-react/commit/2529885bc6a7e3083e9663ea5c86706d32dc8314))
* **select:** add filteredOrganizations api to AvOrganizationSelect ([5a13594](https://github.com/Availity/availity-react/commit/5a135946c04c5aa0fdeaf90f5d979e78480eaee4))





## [0.9.28](https://github.com/Availity/availity-react/compare/@availity/select@0.9.27...@availity/select@0.9.28) (2020-05-05)

**Note:** Version bump only for package @availity/select





## 0.9.27 (2020-04-30)

**Note:** Version bump only for package @availity/select





## 0.9.26 (2020-04-30)

**Note:** Version bump only for package @availity/select





## 0.9.25 (2020-04-28)

**Note:** Version bump only for package @availity/select





## 0.9.24 (2020-04-17)

**Note:** Version bump only for package @availity/select





## 0.9.23 (2020-04-09)

**Note:** Version bump only for package @availity/select





## 0.9.22 (2020-04-08)

**Note:** Version bump only for package @availity/select





## 0.9.21 (2020-04-08)

**Note:** Version bump only for package @availity/select





## 0.9.20 (2020-04-07)

**Note:** Version bump only for package @availity/select





## 0.9.19 (2020-04-07)

**Note:** Version bump only for package @availity/select





## 0.9.18 (2020-04-06)

**Note:** Version bump only for package @availity/select





## 0.9.17 (2020-04-06)

**Note:** Version bump only for package @availity/select





## 0.9.16 (2020-04-06)

**Note:** Version bump only for package @availity/select





## 0.9.15 (2020-04-06)

**Note:** Version bump only for package @availity/select





## 0.9.14 (2020-04-03)

**Note:** Version bump only for package @availity/select





## 0.9.13 (2020-04-03)

**Note:** Version bump only for package @availity/select





## 0.9.12 (2020-04-02)

**Note:** Version bump only for package @availity/select





## 0.9.11 (2020-04-02)

**Note:** Version bump only for package @availity/select





## [0.9.10](https://github.com/Availity/availity-react/compare/@availity/select@0.9.9...@availity/select@0.9.10) (2020-02-28)

**Note:** Version bump only for package @availity/select





## [0.9.9](https://github.com/Availity/availity-react/compare/@availity/select@0.9.8...@availity/select@0.9.9) (2020-02-24)

**Note:** Version bump only for package @availity/select





## [0.9.8](https://github.com/Availity/availity-react/compare/@availity/select@0.9.7...@availity/select@0.9.8) (2020-02-19)

**Note:** Version bump only for package @availity/select





## [0.9.7](https://github.com/Availity/availity-react/compare/@availity/select@0.9.6...@availity/select@0.9.7) (2020-02-18)

**Note:** Version bump only for package @availity/select





## [0.9.6](https://github.com/Availity/availity-react/compare/@availity/select@0.9.5...@availity/select@0.9.6) (2020-02-17)

**Note:** Version bump only for package @availity/select





## [0.9.5](https://github.com/Availity/availity-react/compare/@availity/select@0.9.4...@availity/select@0.9.5) (2020-02-16)

**Note:** Version bump only for package @availity/select





## [0.9.4](https://github.com/Availity/availity-react/compare/@availity/select@0.9.3...@availity/select@0.9.4) (2020-02-11)

**Note:** Version bump only for package @availity/select





## [0.9.3](https://github.com/Availity/availity-react/compare/@availity/select@0.9.2...@availity/select@0.9.3) (2020-02-10)

**Note:** Version bump only for package @availity/select





## [0.9.2](https://github.com/Availity/availity-react/compare/@availity/select@0.9.1...@availity/select@0.9.2) (2020-02-09)

**Note:** Version bump only for package @availity/select





## [0.9.1](https://github.com/Availity/availity-react/compare/@availity/select@0.9.0...@availity/select@0.9.1) (2020-02-08)

**Note:** Version bump only for package @availity/select





# [0.9.0](https://github.com/Availity/availity-react/compare/@availity/select@0.8.7...@availity/select@0.9.0) (2020-01-31)


### Features

* **select:** add defaultToCurrentRegion prop to AvRegionSelect ([d7ec17e](https://github.com/Availity/availity-react/commit/d7ec17e231e3b20f0a98edbb6e6ddfaf6a1ddabd))
* **select:** add shouldSearch prop ([9f49099](https://github.com/Availity/availity-react/commit/9f490992f4d32a514a95d10367ebd072f963eb8d))





## [0.8.7](https://github.com/Availity/availity-react/compare/@availity/select@0.8.6...@availity/select@0.8.7) (2020-01-31)


### Bug Fixes

* **select:** fixes case where validation messages do not appear due to inputId being different than name. Closes [#434](https://github.com/Availity/availity-react/issues/434) ([ea332fc](https://github.com/Availity/availity-react/commit/ea332fcb19bb37acbb558d6edda4c402b90e253c))





## [0.8.6](https://github.com/Availity/availity-react/compare/@availity/select@0.8.5...@availity/select@0.8.6) (2020-01-15)


### Bug Fixes

* **select:** fix props as parameters not being used ([13c5ab5](https://github.com/Availity/availity-react/commit/13c5ab5a7df1bd038f96c0b2fa4643e890515cfa))





## [0.8.5](https://github.com/Availity/availity-react/compare/@availity/select@0.8.4...@availity/select@0.8.5) (2020-01-13)

**Note:** Version bump only for package @availity/select





## [0.8.4](https://github.com/Availity/availity-react/compare/@availity/select@0.8.3...@availity/select@0.8.4) (2020-01-10)

**Note:** Version bump only for package @availity/select





## [0.8.3](https://github.com/Availity/availity-react/compare/@availity/select@0.8.2...@availity/select@0.8.3) (2020-01-08)

**Note:** Version bump only for package @availity/select





## [0.8.2](https://github.com/Availity/availity-react/compare/@availity/select@0.8.1...@availity/select@0.8.2) (2019-12-31)

**Note:** Version bump only for package @availity/select





## [0.8.1](https://github.com/Availity/availity-react/compare/@availity/select@0.8.0...@availity/select@0.8.1) (2019-12-20)

**Note:** Version bump only for package @availity/select





# [0.8.0](https://github.com/Availity/availity-react/compare/@availity/select@0.7.0...@availity/select@0.8.0) (2019-12-17)


### Features

* **select:** add defaultToOnlyOption prop ([a39d7de](https://github.com/Availity/availity-react/commit/a39d7de018437c51f41b3e3373af41d45db3c760))





# [0.7.0](https://github.com/Availity/availity-react/compare/@availity/select@0.6.2...@availity/select@0.7.0) (2019-11-21)


### Features

* **select:** add waitUntilFocused prop ([4d70c12](https://github.com/Availity/availity-react/commit/4d70c12bd10dea36cd2ed9333555661f1514b735))





## [0.6.2](https://github.com/Availity/availity-react/compare/@availity/select@0.6.1...@availity/select@0.6.2) (2019-11-20)

**Note:** Version bump only for package @availity/select





## [0.6.1](https://github.com/Availity/availity-react/compare/@availity/select@0.6.0...@availity/select@0.6.1) (2019-10-23)

**Note:** Version bump only for package @availity/select





# [0.6.0](https://github.com/Availity/availity-react/compare/@availity/select@0.5.0...@availity/select@0.6.0) (2019-10-22)


### Features

* **select:** make disabled state match availity/form components and 508 compliant ([c4e8b25](https://github.com/Availity/availity-react/commit/c4e8b25))





# [0.5.0](https://github.com/Availity/availity-react/compare/@availity/select@0.4.15...@availity/select@0.5.0) (2019-10-11)


### Features

* **select:** handle AutoFillType function values ([c9d5540](https://github.com/Availity/availity-react/commit/c9d5540))





## [0.4.15](https://github.com/Availity/availity-react/compare/@availity/select@0.4.14...@availity/select@0.4.15) (2019-10-11)

**Note:** Version bump only for package @availity/select





## [0.4.14](https://github.com/Availity/availity-react/compare/@availity/select@0.4.13...@availity/select@0.4.14) (2019-10-11)

**Note:** Version bump only for package @availity/select





## [0.4.13](https://github.com/Availity/availity-react/compare/@availity/select@0.4.12...@availity/select@0.4.13) (2019-10-11)


### Bug Fixes

* eslint issues ([bc4d8e9](https://github.com/Availity/availity-react/commit/bc4d8e9))





## [0.4.12](https://github.com/Availity/availity-react/compare/@availity/select@0.4.11...@availity/select@0.4.12) (2019-10-09)

**Note:** Version bump only for package @availity/select





## [0.4.11](https://github.com/Availity/availity-react/compare/@availity/select@0.4.10...@availity/select@0.4.11) (2019-10-04)


### Bug Fixes

* **select:** prevents the provided styles from react-select from being overridden by the styles applied in an error condition ([9ad49db](https://github.com/Availity/availity-react/commit/9ad49db))





## [0.4.10](https://github.com/Availity/availity-react/compare/@availity/select@0.4.9...@availity/select@0.4.10) (2019-10-01)

**Note:** Version bump only for package @availity/select





## [0.4.9](https://github.com/Availity/availity-react/compare/@availity/select@0.4.8...@availity/select@0.4.9) (2019-09-25)

**Note:** Version bump only for package @availity/select





## [0.4.8](https://github.com/Availity/availity-react/compare/@availity/select@0.4.7...@availity/select@0.4.8) (2019-09-23)

**Note:** Version bump only for package @availity/select





## [0.4.7](https://github.com/Availity/availity-react/compare/@availity/select@0.4.6...@availity/select@0.4.7) (2019-09-19)


### Bug Fixes

* **select:** fixes multiple API calls on component mount ([fd45b4a](https://github.com/Availity/availity-react/commit/fd45b4a))





## [0.4.6](https://github.com/Availity/availity-react/compare/@availity/select@0.4.5...@availity/select@0.4.6) (2019-09-19)

**Note:** Version bump only for package @availity/select





## [0.4.5](https://github.com/Availity/availity-react/compare/@availity/select@0.4.4...@availity/select@0.4.5) (2019-09-13)

**Note:** Version bump only for package @availity/select





## [0.4.4](https://github.com/Availity/availity-react/compare/@availity/select@0.4.3...@availity/select@0.4.4) (2019-09-13)


### Bug Fixes

* **select:** use valueKey when creating new options ([6d5c113](https://github.com/Availity/availity-react/commit/6d5c113))





## [0.4.3](https://github.com/Availity/availity-react/compare/@availity/select@0.4.2...@availity/select@0.4.3) (2019-09-06)

**Note:** Version bump only for package @availity/select





## [0.4.2](https://github.com/Availity/availity-react/compare/@availity/select@0.4.1...@availity/select@0.4.2) (2019-09-06)

**Note:** Version bump only for package @availity/select





## [0.4.1](https://github.com/Availity/availity-react/compare/@availity/select@0.4.0...@availity/select@0.4.1) (2019-09-05)

**Note:** Version bump only for package @availity/select





# [0.4.0](https://github.com/Availity/availity-react/compare/@availity/select@0.3.5...@availity/select@0.4.0) (2019-09-04)


### Features

* **docs:** updated to use yarn and added readmes ([3b94748](https://github.com/Availity/availity-react/commit/3b94748))





## [0.3.5](https://github.com/Availity/availity-react/compare/@availity/select@0.3.4...@availity/select@0.3.5) (2019-08-21)

**Note:** Version bump only for package @availity/select





## [0.3.4](https://github.com/Availity/availity-react/compare/@availity/select@0.3.3...@availity/select@0.3.4) (2019-08-19)


### Bug Fixes

* **select:** changed menu item color to black ([8e42914](https://github.com/Availity/availity-react/commit/8e42914))





## [0.3.3](https://github.com/Availity/availity-react/compare/@availity/select@0.3.2...@availity/select@0.3.3) (2019-08-19)

**Note:** Version bump only for package @availity/select





## [0.3.2](https://github.com/Availity/availity-react/compare/@availity/select@0.3.1...@availity/select@0.3.2) (2019-08-15)

**Note:** Version bump only for package @availity/select





## [0.3.1](https://github.com/Availity/availity-react/compare/@availity/select@0.3.0...@availity/select@0.3.1) (2019-08-15)


### Bug Fixes

* **select:** set field value to initial value on autofill when new value undefined ([19cda81](https://github.com/Availity/availity-react/commit/19cda81))





# [0.3.0](https://github.com/Availity/availity-react/compare/@availity/select@0.2.1...@availity/select@0.3.0) (2019-08-14)


### Bug Fixes

* **select:** fix incorrect limit/offset passed into query parameters ([1f46c5b](https://github.com/Availity/availity-react/commit/1f46c5b))


### Features

* **select:** add minCharsToSearch prop ([4a7e7fa](https://github.com/Availity/availity-react/commit/4a7e7fa))





## [0.2.1](https://github.com/Availity/availity-react/compare/@availity/select@0.2.0...@availity/select@0.2.1) (2019-08-13)

**Note:** Version bump only for package @availity/select





# 0.2.0 (2019-08-13)


### Bug Fixes

* **select:** add paging info to patients query ([27269a7](https://github.com/Availity/availity-react/commit/27269a7))
* **select:** prevent values from being set to undefined ([393447d](https://github.com/Availity/availity-react/commit/393447d))
* **select:** sanitize values when isMulti true ([f4aad12](https://github.com/Availity/availity-react/commit/f4aad12))


### Features

* **select:** add autofill prop ([37d3fba](https://github.com/Availity/availity-react/commit/37d3fba))
* **select:** add patient dropdown ([4f8d67c](https://github.com/Availity/availity-react/commit/4f8d67c))
* **select:** added select package using formik ([770d9c1](https://github.com/Availity/availity-react/commit/770d9c1))
