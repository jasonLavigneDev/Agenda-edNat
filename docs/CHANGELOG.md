# Changelog

## [3.11.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.10.0...release/3.11.0) (2023-11-07)


### Features

* **libs:** update node docker image ([a0201c3](https://gitlab.mim-libre.fr/alphabet/agenda/commit/a0201c34a74937d8c19e711241bb01a016094442))
* **libs:** update npm libs to wanted version ([066a664](https://gitlab.mim-libre.fr/alphabet/agenda/commit/066a664b5801e8c679b37cc88a4e5625a4949081))
* **libs:** update version number of meteor base ([71f0a6f](https://gitlab.mim-libre.fr/alphabet/agenda/commit/71f0a6f6fb8c4c82cdbb665bc031bcde9bb4925d))
* **matomo:** integrate matomo client ([27fa585](https://gitlab.mim-libre.fr/alphabet/agenda/commit/27fa585874eedb9bb7eb7c6ae9fbafd26cca321e))
* **node:** change node version to previous version ([4cebb92](https://gitlab.mim-libre.fr/alphabet/agenda/commit/4cebb92b8837beadf3be758402ec0a6a776397d5))

## [3.10.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.9.0...release/3.10.0) (2023-08-24)


### Features

* **meteor:** change meteor base version ([4ad997d](https://gitlab.mim-libre.fr/alphabet/agenda/commit/4ad997d2939abf794d74f3eaf25c235aca615f70))


### Bug Fixes

* **emails:** can now create event when guest hasn't a valid mail ([8bf7f5e](https://gitlab.mim-libre.fr/alphabet/agenda/commit/8bf7f5ebfc2d2988842991e7e74056e9ea3d6fbc))
* **notification:** modify call for multigroups notification ([07ab6c8](https://gitlab.mim-libre.fr/alphabet/agenda/commit/07ab6c8b8b845de4fb59c8186f3d87377e7a0cfa))
* **settings:** remove enableKeycloak setting (Keycloak is mandatory) ([7c7ad53](https://gitlab.mim-libre.fr/alphabet/agenda/commit/7c7ad53aee4e497452de39486d8add88abbc1e04))


### Build System

* **meteor:** update meteor to 2.12 and meteor libs ([79a4f08](https://gitlab.mim-libre.fr/alphabet/agenda/commit/79a4f081821f78f71c4aba2840f109a1e4901f7a))

## [3.9.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.8.0...release/3.9.0) (2023-04-18)


### Features

* **input validation:** check content of string inputs ([89a854c](https://gitlab.mim-libre.fr/alphabet/agenda/commit/89a854cd644e649859709a96405743c60123e95b))


### Bug Fixes

* **config:** update laboiteURL to laboiteUrl in code ([8a92449](https://gitlab.mim-libre.fr/alphabet/agenda/commit/8a924499b09008b639053bd6bef07c2a03482079))
* **emails:** sendEmail is now an internal api function ([c773f1a](https://gitlab.mim-libre.fr/alphabet/agenda/commit/c773f1aff80a4ad1fb8ac6b8574bb4c547b0a711))

## [3.8.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.7.0...release/3.8.0) (2023-01-30)


### Features

* **meteor:** update meteor 2.8.1 ([ce48072](https://gitlab.mim-libre.fr/alphabet/agenda/commit/ce48072e0d72e10165fcfddbf664adfa51ae2b7b))
* **packages:** update meteor to 2.8.0 and others packages ([8c75957](https://gitlab.mim-libre.fr/alphabet/agenda/commit/8c75957d46daa911642819c72382019776236185))


### Bug Fixes

* **event:** better validation error messages ([c239427](https://gitlab.mim-libre.fr/alphabet/agenda/commit/c23942738da70626210744f1fa11aee6c1666c34))
* **form:** title and desc fields lag and load ([466c527](https://gitlab.mim-libre.fr/alphabet/agenda/commit/466c527cd714c8f6000934c485cdd63683cbef31))
* **mail:** no more reminder of event start in mail template ([70e64d0](https://gitlab.mim-libre.fr/alphabet/agenda/commit/70e64d082598b158434c5e33a9498477c3755b5c))
* **translation:** missing message when clicking on a past date ([a48d4f0](https://gitlab.mim-libre.fr/alphabet/agenda/commit/a48d4f0dfb3de432616834663b8a90780c444158))


### Performance Improvements

* **form:** resolve lag when user enter a title ([239cbbd](https://gitlab.mim-libre.fr/alphabet/agenda/commit/239cbbd9a7504ab4eb872a0fe374b232e42f671e))

## [3.7.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.6.0...release/3.7.0) (2022-11-22)


### Features

* **groups:** display structure groups correctly ([bf16dbe](https://gitlab.mim-libre.fr/alphabet/agenda/commit/bf16dbe0ce2453c1b99ebd1f7910070594bf0aaf))


### Bug Fixes

* **addEvent:** fix react error when adding event from laboite ([89ceb30](https://gitlab.mim-libre.fr/alphabet/agenda/commit/89ceb308b02a3fd2ecb449cac01efc22a60629de))
* **config:** update laboiteURL to laboiteUrl in sample config ([2bf23c4](https://gitlab.mim-libre.fr/alphabet/agenda/commit/2bf23c45da5b6b6e2dc477bd3a1844fe02ae2203))
* **footer:** set redirection from db and local page ([1688244](https://gitlab.mim-libre.fr/alphabet/agenda/commit/168824486fb55254bf758d8bbb85d2533d5be7c3))
* **groups:** display structure group correctly when adding fom laboite ([fb87b57](https://gitlab.mim-libre.fr/alphabet/agenda/commit/fb87b572e8d26187bed17225e04fd27269659a29))
* **groups:** fix groupId PropType on GroupSelector ([bbdd855](https://gitlab.mim-libre.fr/alphabet/agenda/commit/bbdd855ec716dcb1e7bf64e35067e9a2f1537675))

## [3.6.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.5.0...release/3.6.0) (2022-09-19)


### Features

* **event:** pre-complete formular with info from laboite ([1453790](https://gitlab.mim-libre.fr/alphabet/agenda/commit/14537902f614bdd45bda36cc9de8e425c105d62c))
* **menu:** add copy caldav url option in main menu ([08a2ab8](https://gitlab.mim-libre.fr/alphabet/agenda/commit/08a2ab80e00b1665c9fd83bbaeb38ecf2551d7a8))


### Bug Fixes

* **avatar:** add white background for avatar user in chip ([34b52c0](https://gitlab.mim-libre.fr/alphabet/agenda/commit/34b52c02573d3e3b4967af1636338941e58b9888))
* **calendar:** limit file type to be only .ics ([795c85c](https://gitlab.mim-libre.fr/alphabet/agenda/commit/795c85cadea1bf4029e2383e1f05bf8613b3ce97))
* **global:** prevent loading ([759903a](https://gitlab.mim-libre.fr/alphabet/agenda/commit/759903a13c3f40cbf3c0c4320275ac7db4e61b22))
* **global:** replace meteor.user() by context user ([e573841](https://gitlab.mim-libre.fr/alphabet/agenda/commit/e573841d9522b2db7625f5538231bf3f2fb32b19))
* **global:** replace Meteor.userID() by userid from context ([eb7cd85](https://gitlab.mim-libre.fr/alphabet/agenda/commit/eb7cd857cfe93353184a055b3a9494723c5ab1d7))
* **logout:** refactor logout process ([93179d5](https://gitlab.mim-libre.fr/alphabet/agenda/commit/93179d514bfb2f974771cdd0967914c71f6b56b1))
* **menu:** add / gestion in caldav url ([47c377d](https://gitlab.mim-libre.fr/alphabet/agenda/commit/47c377d17698efcba55ffca64767086fc44a4bf9))
* **ui:** check if user is loading in MainLayout ([60235a6](https://gitlab.mim-libre.fr/alphabet/agenda/commit/60235a6c0e15a873237483d4a5086a4c4fe25758))


### Build System

* **meteor:** update meteor 2.7.3 and node version 14.19.3 ([3e5140b](https://gitlab.mim-libre.fr/alphabet/agenda/commit/3e5140b072de259a2b42385a260443fedb657f6f))
* **npm:** change npm command run start-dev to start ([cbc0b2b](https://gitlab.mim-libre.fr/alphabet/agenda/commit/cbc0b2b7318b2389a099f7d81d1bab37a13c0372))


### Documentation

* **readme:** update and translate readme ([6f8adda](https://gitlab.mim-libre.fr/alphabet/agenda/commit/6f8adda9906b7e2f6fbc205ece191546201aadac))


### Continuous Integration

* **build-docker:** run for `testing` prerelease ([7864043](https://gitlab.mim-libre.fr/alphabet/agenda/commit/7864043848ab9d94b6c3e210c12b7ff26d7acf61))
* **commitlint:** use new standard job `.git:commitlint` ([0bb3fca](https://gitlab.mim-libre.fr/alphabet/agenda/commit/0bb3fcac62fbbde6a008bbc612ca463e908ead2f))
* **merge-to-dev:** use new standard jobs `.git:merge-to` ([8dd555a](https://gitlab.mim-libre.fr/alphabet/agenda/commit/8dd555aa1fa59085e02c7f6c23ea087253925b2d))
* **meteor:** test before generating a new release ([4c65427](https://gitlab.mim-libre.fr/alphabet/agenda/commit/4c65427c902ffed27e6aefe60ba8978e26a0b0dd))
* **semantic-release:** create `testing` prerelease ([b15be7f](https://gitlab.mim-libre.fr/alphabet/agenda/commit/b15be7f11d0001b27a6b1372ef7c9bea5ef5048d))
* **tag docker:** tag `testing` prerelease image ([fdf05a4](https://gitlab.mim-libre.fr/alphabet/agenda/commit/fdf05a4669a852362908f06082e43f23e21063c0))

# [3.5.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.4.0...release/3.5.0) (2022-07-05)


### Bug Fixes

* **accounts:** prevent user creation if laboiteURL is defined ([8840009](https://gitlab.mim-libre.fr/alphabet/agenda/commit/884000905b8b18da3cb0d73553145c27bd2b7494))
* **calendar:** fix hour display in english for events in calendar ([b598742](https://gitlab.mim-libre.fr/alphabet/agenda/commit/b598742e09a267ac391ae96b8b2de322356dfbd2))
* **i18n:** typo in en ("I participate to the event") ([cb6b996](https://gitlab.mim-libre.fr/alphabet/agenda/commit/cb6b996bb895667dbb2c0bf57b9f3c9b59dbf95b))
* **notifications:** typo when new event ([9a00543](https://gitlab.mim-libre.fr/alphabet/agenda/commit/9a0054323d4b5635d547575f1d646de71af13cbb))
* **npm:** fix npm vulnerabilities ([7f51e42](https://gitlab.mim-libre.fr/alphabet/agenda/commit/7f51e42600c47a91b019fe64fecc344c66849ff7))
* **ui:** fix add event console warnings ([d232d18](https://gitlab.mim-libre.fr/alphabet/agenda/commit/d232d18a8ec2a17a6e87b1d7a5b763b0e677311d))
* **ui:** update material ui import for theme ([7165dd7](https://gitlab.mim-libre.fr/alphabet/agenda/commit/7165dd7bb1a3f42283044b1996ad62fc68255ec4))


### Features

* **ui:** use google font localy ([610dec4](https://gitlab.mim-libre.fr/alphabet/agenda/commit/610dec49b3f1790ecc838719070f45eac5efcd81))

# [3.4.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.3.0...release/3.4.0) (2022-05-05)


### Bug Fixes

* **audit:** disable rule on prop types in eslint ([f5312fe](https://gitlab.mim-libre.fr/alphabet/agenda/commit/f5312fe1477d0bbf90766c6e462538706410e8bd))
* **audit:** update Dockerfile and CI ([34dbf05](https://gitlab.mim-libre.fr/alphabet/agenda/commit/34dbf05bd883d9cc4f5b1f14e7836284416c88ae))
* **audit:** update meteor and libraries ([5c997ff](https://gitlab.mim-libre.fr/alphabet/agenda/commit/5c997ff3a0bd5d9083bb124c3b2df2fabbc0085c))
* **audit:** update Meteor to 2.7.1 ([06397c5](https://gitlab.mim-libre.fr/alphabet/agenda/commit/06397c5998be6f1db0f9878507f5cacf33498a76))
* **email:** set moment js locale to french for emails ([7ad6add](https://gitlab.mim-libre.fr/alphabet/agenda/commit/7ad6addd50e438ef525af73f17158ea84ce890b6))


### Code Refactoring

* **ui:** change favicon with new icon ([d56fceb](https://gitlab.mim-libre.fr/alphabet/agenda/commit/d56fceb811d5967f555c523fd1d08f726b9ce59b))
* **ui:** change logo apps to agenda logo ([1d516c9](https://gitlab.mim-libre.fr/alphabet/agenda/commit/1d516c9a9660c471eadfce334b4f2c76deda9548))
* **ui:** change logo for spinner ([518a2c4](https://gitlab.mim-libre.fr/alphabet/agenda/commit/518a2c46dd823d7c5df1d81a5c76eb1cbc1e2224))
* **ui:** refactor maintenance page ([1e3da2f](https://gitlab.mim-libre.fr/alphabet/agenda/commit/1e3da2fdae9f3b08304c6cf0d6b5cbe7175f1270))


### Features

* **maintenance:** lock application if laboite is in maintenance mode ([9e8f38e](https://gitlab.mim-libre.fr/alphabet/agenda/commit/9e8f38edab6278c832f4c34652678a08af9e2abb))

# [3.3.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.2.0...release/3.3.0) (2022-03-03)


### Bug Fixes

* **autologin:** add delay before logging in ([ab7137c](https://gitlab.mim-libre.fr/alphabet/agenda/commit/ab7137cb8c8fad696980998c5ab4d27a53ea1a70))
* **autologin:** try alternate login launch method ([57a6310](https://gitlab.mim-libre.fr/alphabet/agenda/commit/57a6310530939b63d2e9af4eb00fba9fa5379e2e))


### Features

* **login:** automatic login, add logout page ([be3c6eb](https://gitlab.mim-libre.fr/alphabet/agenda/commit/be3c6ebbef1f55476f62679673dd0e1cc822d15e))

# [3.2.0](https://gitlab.mim-libre.fr/alphabet/agenda/compare/release/3.1.0...release/3.2.0) (2022-01-13)


### Bug Fixes

* don't display organizer as separate participant ([829d167](https://gitlab.mim-libre.fr/alphabet/agenda/commit/829d16768e93d03c0f7f027f60bd4b18eee87aca))
* **gitlab-ci:** some globally defined keywords are deprecated ([80fc6bc](https://gitlab.mim-libre.fr/alphabet/agenda/commit/80fc6bc01392df6fe34057de2341c3ba554fc3ac))
* **libs:** switch back to official package for mexar:mdt ([0d8cb72](https://gitlab.mim-libre.fr/alphabet/agenda/commit/0d8cb725799b463caf134eb4ee5af70f949e7741))
* **version:** update version number for testing ([729633d](https://gitlab.mim-libre.fr/alphabet/agenda/commit/729633d4267c9169ace708e32996471ac5b0b919))


### Continuous Integration

* **build:** create the docker image and push it to `${CI_REGISTRY}` ([4adb521](https://gitlab.mim-libre.fr/alphabet/agenda/commit/4adb521c598486b9666053cdee210a05f0e0573a))
* **commitlint:** enforce commit message format ([34898be](https://gitlab.mim-libre.fr/alphabet/agenda/commit/34898befb863f9052ceefa9d935387b4217f5012))
* **release:** avoid regression in `dev` branch ([43e7756](https://gitlab.mim-libre.fr/alphabet/agenda/commit/43e7756977c223b5495de437b3d98308c2c1adbd))
* **release:** create release automatically with `semantic-release` ([9ee543a](https://gitlab.mim-libre.fr/alphabet/agenda/commit/9ee543a17cc41561d1df91b6161b5ed289679a65))
* **release:** tag docker images based on release cycle ([a3a93a8](https://gitlab.mim-libre.fr/alphabet/agenda/commit/a3a93a82809f73b5fe942694611a3e9a8a4118af))
* **rules:** restrict execution to non stable branches by default ([39c7381](https://gitlab.mim-libre.fr/alphabet/agenda/commit/39c73815c0f75fb7ccda8c641eb246e1fe66972a))
* **runners:** use OpenNebula runners with shared cache ([e7c7b82](https://gitlab.mim-libre.fr/alphabet/agenda/commit/e7c7b8237367b38fcb7e5c71c39a8d00f2b0a10a))


### Features

* add the actual user in new event if he chooses so ([b7a7794](https://gitlab.mim-libre.fr/alphabet/agenda/commit/b7a77940220633967cfb2b4ed3349f12b4e46fd5))


### Styles

* **gitlab-ci:** better self explanatory job names ([793db57](https://gitlab.mim-libre.fr/alphabet/agenda/commit/793db5773515ee5b7182bd7e7f917f314aedcb0b))
