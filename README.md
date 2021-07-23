# L'application **agenda** environnement DEV :

Sommaire :

- Installation
  - Application : la boite
  - Application : Agenda
  - Paramètres
- Lancer le projet
  - Dans un terminal **la boite**
  - Lancer un autre terminal **agenda**
  - Ajouter des groupes à votre utilisateur
    - Via l'interface utilisateur **localhost:3000**

## Installation

### Application : la boite

Procédure d'nstallation :

```
git clone https://gitlab.mim-libre.fr/alphabet/laboite
cd laboite
cp config/settings.development.json.sample config/settings.development.json
cd app
npm install
```

### Application : Agenda

Procédure d'nstallation :

```
git clone https://gitlab.mim-libre.fr/alphabet/apps-agenda.git
cd apps-agenda
cd agenda
npm install
```

### Paramètres

Pour le fonctionnement de l'**agenda** en local, il faut configurer une instance locale de **LaBoite**' avec authentification sur un serveur Keycloak. Ajouter au moins une clé d'API dans la variable private:apiKeys.

## Lancer le projet

### Dans un terminal **la boite**

```
cd laboite/app
npm start
```

Il est possible de vérifier le fonctionnement de la boite en tapant la ligne suivante à partir d'un navigateur

```
http://localhost:3000
```

### lancer un autre terminal **agenda**

```
cd agenda
npm start
```

copier le fichier config/settings.development.sample.json sur config/settings.development.json et le remplir de cette façon :

- public:"agendaUrl": "http://localhost:3030",
- public:"laboiteUrl": "http://localhost:3000"
- public:"enableKeycloak": true

Reprendre les paramètre de l'instance LaBoite pour les variables suivantes :

- public:"keycloakUrl"
- public:"keycloakRealm"
- keycloak:"pubkey"
- keycloak:"client"
- private:"apiKeys" (nécessaire pour tester l'envoi de notification à LaBoite)

A partir du navigateur, tapez ceci :

```
http://localhost:3030
```

### Ajouter des groupes à votre utilisateur

#### Via l'interface utilisateur **localhost:3000**

A partir de l'appliation `laboite`que vous accédez à partir du navigateur

```
http://localhost:3000
```

Aller dans le fichier de config de la boîte ./config/settings.development.json

Modifier l'attribut : "whiteDomains" en fonction de votre mail user

Exemple :

Pour un mailUser = 'toto@gmail.com', il faudra ajouter "^gmail.com"

Ce qui donnerait :

    "whiteDomains": [
      "^ac-[a-z-]\\.fr",
      "^[a-z-]\\.gouv.fr",
      "^gmail.com"
    ]

Relancer la boite

Naviguez sur `http://localhost:3000` (créez vôtre utilisateur dans keycloak en suivant le lien proposé sur la page d'authentification).

En allant dans l'onglet "Groupes", vous pouvez "Rejoindre le groupe" automatiquement pour tous les groupes en bleu

Raffraichir la page **Agenda** du navigateur

```
http://localhost:3030
```
