# Module 01 — Pratique : des expériences qui brisent vos intuitions

**Durée :** 150 minutes · **Artefact :** `labs/01-experiments.md`

Toutes les expériences se font dans `~/edu/sandbox` (ou n'importe quel dépôt d'apprentissage).
Pour chacune, consignez le résultat : ce que vous attendiez, ce que vous avez obtenu, la conclusion.

---

## Expérience 1. Non-déterminisme (20 min)

Posez la même question à l'agent trois fois **dans trois nouvelles sessions** :

```
Écris une fonction Python qui vérifie si une chaîne est un palindrome.
```

Comparez les trois réponses.

**Consignez :** en quoi elles diffèrent (noms, gestion de la casse, espaces, tests).
**Conclusion :** la reproductibilité vient des tests, pas de la température.

---

## Expérience 2. Flou contre précision (30 min)

**Mauvaise requête :**

```
Fais une validation d'email.
```

**Bonne requête :**

```
Ajoute une fonction validate_email(s: str) -> bool à app.py.
Exigences :
- la chaîne contient exactement un '@' ;
- la partie locale est non vide, le domaine contient un point ;
- le cyrillique est interdit ;
- une chaîne vide → False ;
- ne pas lever d'exceptions.
Écris des tests pour : "a@b.co" → True, "a@b" → False, "" → False, "тест@mail.ru" → False.
```

**Consignez** un tableau : | critère | mauvaise requête | bonne requête | — en colonnes
« y a-t-il des tests », « le cyrillique est-il géré », « `''` est-il géré », « nombre d'itérations jusqu'à un résultat qui marche ».

---

## Expérience 3. L'aiguille dans la botte de foin (30 min)

Créez un fichier de 300 lignes de code sans rapport (vous pouvez le faire générer par l'agent),
et au milieu — une ligne :

```python
SECRET_CONSTANT = 42  # important rule
```

Dans une session, demandez :

```
Lis big.py en entier et dis-moi la valeur de SECRET_CONSTANT.
```

Puis dans une nouvelle session :

```
Trouve la constante SECRET_CONSTANT dans big.py et dis-moi sa valeur. Utilise grep.
```

**Consignez :** les deux réponses, le temps, le coût approximatif.
**Conclusion :** un outil (grep) est moins cher et plus fiable que « tout lire ».

---

## Expérience 4. Hallucination d'API (25 min)

Demandez :

```
Écris un exemple d'utilisation de la bibliothèque <choisis une bibliothèque obscure> avec la méthode <invente une méthode>.
```

Vérifiez ensuite dans la documentation officielle si la méthode existe.

Répétez avec votre bibliothèque principale :

```
Comment faire <tâche> avec <votre bibliothèque> <version> ?
```

Comparez avec la documentation.

**Consignez :** combien de fabrications sur 3 requêtes. Quelle formulation a augmenté le risque.

---

## Expérience 5. Dégradation d'une longue session (30 min)

Dans **une seule** session :

1. Demandez-lui d'écrire 3 fonctions.
2. Demandez-lui d'en réécrire deux « autrement » (créez 2 à 3 tours de modifications).
3. Revenez ensuite à la tâche de l'étape 1 : « rappelle-moi quelles étaient les exigences de la première fonction ? »
4. Demandez-lui d'ajouter une nouvelle fonction dans le même style.

Répétez maintenant l'étape 4 dans une **nouvelle** session, en ne donnant que le code final et les exigences.

**Consignez :** dans quel cas le style est plus cohérent, et où il y a le plus d'écarts par rapport aux exigences d'origine.
**Conclusion :** « le modèle est devenu bête » = « le contexte s'est pollué ».

---

## Expérience 6. Le prix du contexte (15 min)

Exécutez une tâche deux fois :

```
A) « Explique ce que fait app.py » (un fichier de 20 lignes)
B) la même chose, mais demandez d'abord de lire 5 gros fichiers du projet
```

Comparez le coût et les tokens affichés pour la session (dans OpenCode, le compteur de coût,
ou `opencode stats`).

**Consignez :** combien de fois la variante B est plus chère, et si l'explication s'est améliorée.

---

## Critères de fin

- [ ] Les 6 expériences sont faites, chacune avec une section « attente / réel / conclusion ».
- [ ] Le rapport contient au moins un tableau comparatif.
- [ ] Trois règles personnelles que vous emportez dans votre travail sont formulées.
- [ ] Les logs/captures du coût de l'expérience 6 sont joints.
