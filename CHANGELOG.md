# [2.5.0](https://github.com/klaascuvelier/nx-additions/compare/v2.4.2...v2.5.0) (2023-09-13)


### Bug Fixes

* 🐛 various fixes for rsync deployed ([ad07eda](https://github.com/klaascuvelier/nx-additions/commit/ad07eda38b0e3efa5f4b07b50885638fa6ad2ccc))


### Features

* 🎸 add correct detailed info to package.json ([859b443](https://github.com/klaascuvelier/nx-additions/commit/859b443f47ef49a5eea46544e6e9a4b84cd59739))



## [2.4.2](https://github.com/klaascuvelier/nx-additions/compare/v2.4.1...v2.4.2) (2023-04-14)


### Bug Fixes

* move deno.json file to project root, not source root ([dfd4892](https://github.com/klaascuvelier/nx-additions/commit/dfd4892300df0abc2fd3d75cebce7e7ba8812328))



## [2.4.1](https://github.com/klaascuvelier/nx-additions/compare/v2.4.0...v2.4.1) (2023-04-13)


### Bug Fixes

* add import-map arg to deploy ([b2c8fe7](https://github.com/klaascuvelier/nx-additions/commit/b2c8fe740cbc62266966020bbe8fd3fc1bc8b9e7))



# [2.4.0](https://github.com/klaascuvelier/nx-additions/compare/v2.3.0...v2.4.0) (2023-04-13)


### Features

* add fmt defaults ([140384e](https://github.com/klaascuvelier/nx-additions/commit/140384ef145c69252c00df3992e3e91c2dec7541))
* add watch flag for serve command ([376c1b2](https://github.com/klaascuvelier/nx-additions/commit/376c1b275d3109ee2c5ecb5695217b8b510ddbbc))
* update default project files ([c38d478](https://github.com/klaascuvelier/nx-additions/commit/c38d478fad795a110bff7dc846837b0978fa45e4))



# [2.3.0](https://github.com/klaascuvelier/nx-additions/compare/v2.2.0...v2.3.0) (2023-04-12)


### Features

* deno updates ([efe981d](https://github.com/klaascuvelier/nx-additions/commit/efe981d0aa0ac03efb74a031dc303cebd62a5d8f))



# [2.2.0](https://github.com/klaascuvelier/nx-additions/compare/v2.1.0...v2.2.0) (2023-04-12)


### Features

* add tslib dependency ([fb8b2fe](https://github.com/klaascuvelier/nx-additions/commit/fb8b2fee1e889521cfd8f3231b561aea95d79b49))



# [2.1.0](https://github.com/klaascuvelier/nx-additions/compare/v2.0.0...v2.1.0) (2023-03-04)


### Features

* **all:** bump nrwl supported packages ([f2d8921](https://github.com/klaascuvelier/nx-additions/commit/f2d892132838d1cdc249a24fc3e9632facf2dd94))
* upgrade peerDeps ([7b7deee](https://github.com/klaascuvelier/nx-additions/commit/7b7deee00314f65643e2c055b09aac0d8394f8e7))



# [2.0.0](https://github.com/klaascuvelier/nx-additions/compare/v1.7.0...v2.0.0) (2023-01-26)


### Bug Fixes

* **nx-cloudflare-wrangler:** custom dist path should be relative to project root ([65ca05f](https://github.com/klaascuvelier/nx-additions/commit/65ca05fb5591c5c3d9d9a71794fd9c0f39b924df))


### BREAKING CHANGES

* **nx-cloudflare-wrangler:** options.dist in "serve-page" and "deploy-page" executors are now relative to workspace root



# [1.7.0](https://github.com/klaascuvelier/nx-additions/compare/v1.6.0...v1.7.0) (2023-01-25)


### Features

* **nx-cloudflare-wrangler:** add pages serve executor ([2f65c8f](https://github.com/klaascuvelier/nx-additions/commit/2f65c8fc50bd442bafdec5c54b42ada827a3bf25))



# [1.6.0](https://github.com/klaascuvelier/nx-additions/compare/v1.5.4...v1.6.0) (2022-12-09)


### Features

* sst upgrade ([8580777](https://github.com/klaascuvelier/nx-additions/commit/858077791e58b0b6c8123c26a0c6233c7ba9cb49))



## [1.5.4](https://github.com/klaascuvelier/nx-additions/compare/v1.5.3...v1.5.4) (2022-06-17)


### Bug Fixes

* 🐛 add main file in dev command ([bc6c627](https://github.com/klaascuvelier/nx-additions/commit/bc6c6276c64d09ea150afc7bfde61b2fcdfcdee4))



## [1.5.3](https://github.com/klaascuvelier/nx-additions/compare/v1.5.2...v1.5.3) (2022-06-09)


### Bug Fixes

* 🐛 fix netlify-cli peerDep ([da89408](https://github.com/klaascuvelier/nx-additions/commit/da894082d04ff12b1620ee7de6712e90169068cb))



## [1.5.2](https://github.com/klaascuvelier/nx-additions/compare/v1.5.1...v1.5.2) (2022-06-09)


### Bug Fixes

* 🐛 update peerDeps ([38863f9](https://github.com/klaascuvelier/nx-additions/commit/38863f9e8a34f0e6e1be0e01067c77415a403ae8))



## [1.5.1](https://github.com/klaascuvelier/nx-additions/compare/v1.5.0...v1.5.1) (2022-06-08)


### Bug Fixes

* 🐛 a ton of fixes ([6be63cc](https://github.com/klaascuvelier/nx-additions/commit/6be63cc508076d8daac899c6b8c32394c2b4dd02))
* 🐛 dont generate new app for pages ([65e6b12](https://github.com/klaascuvelier/nx-additions/commit/65e6b12f27d83016b44500de3da8401e79861f5c))
* 🐛 Fix generators ([0bb575f](https://github.com/klaascuvelier/nx-additions/commit/0bb575f29f869ae55484b3520104075aca84015e))
* 🐛 rename generators and add missing ones ([a3534a5](https://github.com/klaascuvelier/nx-additions/commit/a3534a511e6a86c2a68ea122fca611d43b7ed201))
* 🐛 update assets for correct build ([109a2cd](https://github.com/klaascuvelier/nx-additions/commit/109a2cd6dd2edbe3f7356913c9a729b53564218e))
* 🐛 update default toml files ([3de928d](https://github.com/klaascuvelier/nx-additions/commit/3de928d104dcabeb52f8f2471a127116d6cd4431))



# [1.5.0](https://github.com/klaascuvelier/nx-additions/compare/v1.4.1...v1.5.0) (2022-06-08)


### Features

* 🎸 create nx-cloudflare-wrangler project ([7a5c392](https://github.com/klaascuvelier/nx-additions/commit/7a5c392cce849e5b25e310191491074e624b0c6b))
* 🎸 work on wrangler2 generator ([6f37d2e](https://github.com/klaascuvelier/nx-additions/commit/6f37d2efe9aeca9c2155901ed924e72747fcd729))



## [1.4.1](https://github.com/klaascuvelier/nx-additions/compare/v1.4.0...v1.4.1) (2022-05-06)


### Bug Fixes

* not an actual fix, just testing releases ([244026e](https://github.com/klaascuvelier/nx-additions/commit/244026e916ca266426753d4ee2fcb402f2490096))



# [1.4.0](https://github.com/klaascuvelier/nx-additions/compare/v1.3.0...v1.4.0) (2022-05-06)


### Features

* no new feature, just testing release 3 ([01a952d](https://github.com/klaascuvelier/nx-additions/commit/01a952de6fafbbe9df9176b4d9667824a1231a33))
* no new feature, just testing release 4 ([a18e64c](https://github.com/klaascuvelier/nx-additions/commit/a18e64c628c78750f400b43228bec9b05fb332f9))



# [1.3.0](https://github.com/klaascuvelier/nx-additions/compare/v1.2.0...v1.3.0) (2022-05-06)


### Features

* no new feature, just testing release 2 ([9f627bd](https://github.com/klaascuvelier/nx-additions/commit/9f627bdf052e181ef437760ce8f86c29383d1513))



# [1.1.0](https://github.com/klaascuvelier/nx-additions/compare/v1.0.0...v1.1.0) (2022-05-06)


### Features

* new sst options ([52f3d9c](https://github.com/klaascuvelier/nx-additions/commit/52f3d9cf8ae7327376bfdda15fc8fa5fc3ed7753))



# 1.0.0 (2022-04-29)


### Bug Fixes

* fixes after update ([db5bc15](https://github.com/klaascuvelier/nx-additions/commit/db5bc15bae33f53685ab506826e602febb0a0e63))


### Features

* 🎸 finish first deno implementation ([c6d02e4](https://github.com/klaascuvelier/nx-additions/commit/c6d02e49cf0dea50c688e1c1a30f8270e688fbc7))
* 🎸 work on deno ([06982d9](https://github.com/klaascuvelier/nx-additions/commit/06982d98d397c34bfde2cf80556b8058e66ae782))
* add nx deploy ([8f47241](https://github.com/klaascuvelier/nx-additions/commit/8f4724146303ba918685003acd2a38560fdf268a))
* sst ([a041015](https://github.com/klaascuvelier/nx-additions/commit/a041015c6d0bae3c47485a0b90d83c90a1eab73f))
* upgrade to latest NX ([ac6027b](https://github.com/klaascuvelier/nx-additions/commit/ac6027b769b78d946f30616b5fd66cbd468759dc))

