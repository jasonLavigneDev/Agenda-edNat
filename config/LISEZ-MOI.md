# Configuration

Copier `settings-development.json.sample` dans `settings-development.json` et mettre à jour les valeurs correspondant à votre configuration.

## public:

| Key                                       | Type    | Default value                                 | Description                  |
| ----------------------------------------- | ------- | --------------------------------------------- | ---------------------------- |
| enableKeycloak                            | boolean | false                                         | Si true, keycloak est activé |
| keycloakUrl                               | string  | ""                                            | Keycloak URL                 |
| keycloakRealm                             | string  | ""                                            | Keycloak Realm               |
| laboiteBlogURL                            | string  | ""                                            | Laboite Blog URL             |
| caldavUrl                                 | string  | ""                                            | url caldav                   |
| packages                                  | object  | {}                                            |                              |
| packages.dynamic-import                   | object  | {}                                            |                              |
| packages.dynamic-import.link              | string  | "https://github.com/meteor/meteor/pull/11105" |                              |
| packages.dynamic-import.useLocationOrigin | boolean | true                                          |                              |

## keycloak:

| Key    | Type   | Default value | Description          |
| ------ | ------ | ------------- | -------------------- |
| pubkey | string | ""            | Keycloak public key  |
| client | string | "sso"         | Keycloak client type |

## private:

| Key            | Type     | Default value                         | Description                                 |
| -------------- | -------- | ------------------------------------- | ------------------------------------------- |
| apiKeys        | [string] | [""]                                  | Clés d’accès API pour les services externes |
| smtp           | object   | {}                                    | Paramètre généraux du SMTP                  |
| smtp.url       | string   | "smtps://USERNAME:PASSWORD@HOST:PORT" | SMTP server URI                             |
| smtp.fromEmail | string   | ""                                    | Valeur par défaut "from" du mail de contact |
| smtp.toEmail   | string   | ""                                    | Valeur par défaut "to" du mail de contact   |
