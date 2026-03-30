# Demo Git + Jenkins

Ce projet montre un petit service Node.js plus realiste avec Git et Jenkins.

## Idee generale

1. On cree le projet et on versionne le code sur Git.
2. Jenkins recupere le depot.
3. Le fichier `Jenkinsfile` decrit les etapes du pipeline.
4. Jenkins installe le projet, lance les tests et verifie les dependances.
5. Jenkins renvoie un resultat final.

## Ce que fait le projet

Le code lit une liste d'utilisateurs, filtre les donnees invalides et produit un rapport.

Le projet utilise de vraies librairies :

- `validator` pour verifier les adresses email
- `dayjs` pour valider et formater les dates
- `lodash` pour regrouper et trier les donnees

## Structure

- `src/index.js` : logique du rapport utilisateur
- `test/run-tests.js` : tests automatiques
- `Jenkinsfile` : pipeline Jenkins

## Pipeline Jenkins

Le pipeline execute les etapes suivantes :

1. `Checkout` : Jenkins recupere le code depuis Git.
2. `Install` : Jenkins choisit un profil de dependances puis lance `npm install`.
3. `Tests` : execution des tests avec `npm test`.
4. `Dependency Audit` : verification de securite avec `npm audit`.

## Profils de dependances

Le depot contient deux profils pour montrer la difference entre dependances fiables et non fiables.

- `package.safe.json` : versions corrigees, le pipeline doit passer
- `package.vulnerable.json` : versions vulnerables, le pipeline doit echouer a l'etape `Dependency Audit`

Dans Jenkins, choisis le parametre `DEPENDENCY_PROFILE` :

- `safe` pour demonstrer un build vert
- `vulnerable` pour demonstrer un build rouge

## Ce que veut dire "tester les librairies"

Ici, "librairies" veut dire dependances du projet comme `lodash`, `validator` et `dayjs`.

- Une dependance saine n'a pas de vulnerabilite connue au moment de l'analyse.
- Une dependance risquee peut contenir une faille connue ou une version obsolete.

## Lancer le projet en local

```bash
npm install
npm test
npm run security
npm start
```

## Formule courte pour les notes

Jenkins automatise les tests du code et des dependances apres un push Git, a l'aide d'un pipeline defini dans un `Jenkinsfile`.
