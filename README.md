# Demo Git + Jenkins

Ce projet montre un exemple simple de pipeline CI avec Git et Jenkins.

## Idee generale

1. On cree le projet et on versionne le code sur Git.
2. Jenkins recupere le depot.
3. Le fichier `Jenkinsfile` decrit les etapes du pipeline.
4. Jenkins installe le projet, lance les tests et verifie les dependances.
5. Jenkins renvoie un resultat final.

## Structure

- `src/index.js` : petit code d'exemple
- `test/run-tests.js` : tests automatiques
- `Jenkinsfile` : pipeline Jenkins

## Pipeline Jenkins

Le pipeline execute les etapes suivantes :

1. `Checkout` : Jenkins recupere le code depuis Git.
2. `Install` : installation du projet avec `npm install`.
3. `Tests` : execution des tests avec `npm test`.
4. `Dependency Audit` : verification de securite avec `npm audit`.

## Ce que veut dire "tester les librairies"

Ici, "librairies" veut dire dependances du projet.

- Une dependance saine n'a pas de vulnerabilite connue au moment de l'analyse.
- Une dependance risquee peut contenir une faille connue ou une version obsolete.

## Lancer le projet en local

```bash
npm install
npm test
npm start
```

## Formule courte pour les notes

Jenkins automatise les tests du code et des dependances apres un push Git, a l'aide d'un pipeline defini dans un `Jenkinsfile`.
