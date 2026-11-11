# Module 06 — Pratique : calculer et choisir

**Temps :** 120 minutes · **Livrable :** `labs/06-economics/`

---

## Tâche 1. Calcul manuel (20 min)

Données :

```
model A: input $0.25 / 1M, output $1.25 / 1M
model B: input $5.00 / 1M, output $30.00 / 1M
```

La tâche : une boucle d'agent de 8 étapes, chacune avec ~40k tokens d'input
et ~500 tokens d'output.

Calculez :

1. Le coût du modèle A.
2. Le coût du modèle B.
3. Combien de fois B est plus cher.
4. À partir de combien d'étapes B devient moins cher, si B résout la tâche en 3 étapes et A en 12 ?

**Critère d'acceptation :** le calcul, avec les formules, figure dans le rapport.

---

## Tâche 2. Mesurer une vraie session (30 min)

Faites la même tâche de deux façons :

```
A) one big session with 3 tasks
B) three separate sessions
```

Comparez :

```bash
opencode stats
```

ou le compteur de coût dans l'interface.

**À noter :** tokens d'input/output, coût, temps. Tirez une conclusion : quelle approche est la moins chère et pourquoi.

---

## Tâche 3. Le cache en action (25 min)

Faites 5 modifications similaires d'affilée dans une même session (par exemple un renommage
sur 5 fichiers), sans changer les instructions.

Ensuite, faites la même chose, mais en modifiant `AGENTS.md` entre les étapes.

**À noter :** la différence de coût (les hits de cache sont visibles dans les statistiques du fournisseur ou d'OpenCode).
**Conclusion :** comment structurer les requêtes pour que le cache fonctionne.

---

## Tâche 4. Tableau de choix des modèles (30 min)

Construisez un tableau pour votre projet :

| Tâche | Modèle | Pourquoi | Coût attendu |
| --- | --- | --- | --- |
| rename | fast | template | $ |
| new tests | fast/balanced | by example | $ |
| new feature | balanced | needs context | $ |
| architectural refactoring | frontier | needs thinking | $ |
| incident analysis from logs | long-context | 500k tokens | $ |

**Critère d'acceptation :** au moins 5 lignes avec une justification, pas « le plus intelligent ».

---

## Tâche 5. Comparer deux modèles sur la même tâche (15 min)

Prenez une tâche de complexité moyenne. Faites-la sur un modèle bon marché puis sur un modèle cher.
Comparez :

| | bon marché | cher |
| --- | --- | --- |
| itérations jusqu'aux tests verts | | |
| coût | | |
| votre temps de relecture | | |
| qualité du diff (1–5) | | |

**Conclusion :** quel modèle est le plus rentable pour cette classe de tâches.

---

## Critères de rendu

- [ ] Calcul manuel avec formules et réponse à la question des 3 vs 12 étapes.
- [ ] Mesures réelles des deux stratégies de session.
- [ ] Analyse de l'effet du cache.
- [ ] Tableau de choix des modèles avec 5+ lignes.
- [ ] Comparaison de deux modèles avec une conclusion.
