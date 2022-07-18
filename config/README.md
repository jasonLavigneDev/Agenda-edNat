# Configuration

Copy `settings-development.json.sample` to `settings-development.json` and update values matching your configuration

## public:

| Key                                       | Type    | Default value                                 | Description                  |
| ----------------------------------------- | ------- | --------------------------------------------- | ---------------------------- |
| enableKeycloak                            | boolean | false                                         | If true, keycloak is enabled |
| keycloakUrl                               | string  | ""                                            | Keycloak URL                 |
| keycloakRealm                             | string  | ""                                            | Keycloak Realm               |
| laboiteBlogURL                            | string  | ""                                            | Laboite Blog URL             |
| packages                                  | object  | {}                                            |                              |
| packages.dynamic-import                   | object  | {}                                            |                              |
| packages.dynamic-import.link              | string  | "https://github.com/meteor/meteor/pull/11105" |                              |
| packages.dynamic-import.useLocationOrigin | boolean | true                                          |                              |

## keycloak:

| Key           | Type     | Default value | Description             |
| ------------- | -------- | ------------- | ----------------------- |
| pubkey        | string   | ""            | Keycloak public key     |
| client        | string   | "sso"         | Keycloak client type    |
| adminEmails   | [string] | []            | Keycloak admin emails   |
| adminUser     | string   | ""            | Keycloak admin user     |
| adminPassword | string   | ""            | Keycloak admin password |

## private:

| Key            | Type     | Default value                         | Description                           |
| -------------- | -------- | ------------------------------------- | ------------------------------------- |
| apiKeys        | [string] | [""]                                  | API access keys for external services |
| smtp           | object   | {}                                    | Generic settings for SMTP             |
| smtp.url       | string   | "smtps://USERNAME:PASSWORD@HOST:PORT" | SMTP server URI                       |
| smtp.fromEmail | string   | ""                                    | Contact mail default "from" value     |
| smtp.toEmail   | string   | ""                                    | Contact mail default "to" value       |
