# Changelog

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
