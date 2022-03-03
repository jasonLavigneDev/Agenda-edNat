# Changelog

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
