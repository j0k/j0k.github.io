# Construire le site du cours « Vibe coding avec OpenCode »

La version HTML du cours est construite à partir des sources Markdown de ce répertoire (`src/`).
Le site n'a aucune dépendance externe : seulement la feuille de style partagée `assets/style.css`.

## Structure du site

```
opencode/
├── index.html                  vue d'ensemble du cours : programme, calendrier, évaluation
├── modules/
│   ├── NN-slug.html            théorie du module
│   └── NN-slug-practice.html   pratique du module
├── templates/*.html            modèles d'artefacts
├── templates.html              table des matières des modèles
├── rubric.html                 critères d'évaluation
├── glossary.html               glossaire
├── resources.html              ce qu'il faut lire ensuite
├── progress.html               suivi de progression
├── labs.html                   où déposer les artefacts
├── build.html                  cette page
├── assets/style.css            style partagé
└── src/                        sources markdown et le générateur
```

## Comment reconstruire

Modifiez le Markdown dans `src/`, puis :

```bash
cd src
python build.py
```

Le paquet `markdown` est nécessaire :

```bash
pip install markdown
```

Le générateur transforme les liens `*.md` en liens `.html` internes, substitue
les chemins relatifs corrects et assemble la navigation entre les modules.
Vous n'avez pas à modifier les liens dans le HTML à la main — la prochaine construction les écrasera.

## Ce qui est ajouté au moment de la construction

- Une barre latérale unique : tous les modules (théorie + pratique) et les supports de cours.
- Des bascules « théorie ↔ pratique » dans l'en-tête des pages de module et une pagination en bas.
- Les checklists `- [ ]` sont cliquables ; la progression est stockée dans `localStorage`
  séparément pour chaque page.
- Les cases à cocher dans les tableaux (suivi de progression) sont cliquables aussi.
- `Ctrl+P` donne une version propre : sans barre latérale, pagination ni barre de progression.

## Fichiers sources

| Fichier | Page |
| --- | --- |
| `README.md` | `index.html` |
| `modules/NN-slug/README.md` | `modules/NN-slug.html` |
| `modules/NN-slug/practice.md` | `modules/NN-slug-practice.html` |
| `templates/*.md` | `templates/*.html` |
| `rubric.md` | `rubric.html` |
| `glossary.md` | `glossary.html` |
| `resources.md` | `resources.html` |
| `progress.md` | `progress.html` |
| `labs/README.md` | `labs.html` |
| `BUILD.md` | `build.html` |
