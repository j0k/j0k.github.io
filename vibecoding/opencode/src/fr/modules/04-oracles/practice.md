# Module 04 — Pratique : la boucle TDD avec un agent

**Temps :** 210 minutes · **Artefact :** `labs/04-oracles/`

---

## Tâche 1. Une seule commande de vérification (30 min)

Assemblez `scripts/check.sh` (ou `make check`) :

```bash
#!/usr/bin/env bash
set -e
ruff check . --output-format=concise
mypy . --no-error-summary
pytest -q
```

Ajoutez dans `AGENTS.md` :

```markdown
## Vérifications
- tout : `./scripts/check.sh`
- si ça échoue : corriger la cause, ne pas désactiver la vérification
```

**Acceptation :** `./scripts/check.sh` passe sur un projet propre en < 60 s.

---

## Tâche 2. Test qui échoue → code qui marche (50 min)

1. Choisissez une fonction qui n'existe pas encore : `normalize_phone(s: str) -> str`.
2. Écrivez les tests **vous-même** (5 cas, cas limites inclus) :

```python
def test_normalize_phone():
    assert normalize_phone("+7 (912) 345-67-89") == "+79123456789"
    assert normalize_phone("89123456789") == "+79123456789"
    assert normalize_phone("") == ""
    assert normalize_phone("abc") == ""
    assert normalize_phone("+1 222 333") == "+1222333"
```

3. Vérifiez que les tests échouent (`ImportError` est aussi un échec).
4. Donnez à l'agent :

```
Les tests dans tests/test_phone.py échouent. Implémente normalize_phone dans src/utils/phone.py.
Code minimal qui fait passer tous les tests. Ne modifie pas les tests.
```

**Acceptation :** les tests sont verts, les tests sont inchangés (`git diff tests/` est vide).

---

## Tâche 3. L'agent écrit les tests à partir de votre liste (40 min)

Prenez une fonction existante sans couverture. Écrivez vous-même la **liste des cas** :

```
- entrée None
- liste vide
- nombres négatifs
- doublons
- un très grand nombre
```

Puis :

```
Écris des tests pour src/x.py::func à partir de la liste de cas ci-dessous. Les tests doivent
échouer si le comportement change. N'utilise pas de mocks sauf si c'est nécessaire.
```

**Acceptation :** les tests détectent vraiment une mutation — modifiez une ligne de code,
vérifiez que le test échoue, revenez en arrière.

---

## Tâche 4. La boucle « erreur → correction » (40 min)

Cassez le code exprès (par exemple, changez une condition). Lancez la vérification et donnez à l'agent
la **sortie complète** :

```
./scripts/check.sh échoue. Voici la sortie :

<collez-la en entier>

Trouve la cause et corrige. Explique en deux lignes ce qui n'allait pas.
```

Répétez 2 fois avec des cassures différentes.

**Acceptation :** le rapport contient la sortie d'erreur, le diff de correction, l'explication. Notez si la sortie complète
a aidé par rapport à un résumé.

---

## Tâche 5. Test golden (50 min)

Pour une fonction qui génère du texte/du JSON/un rapport :

1. Créez la référence `tests/golden/expected.json`.
2. Le test :

```python
def test_report_golden():
    assert generate_report(SAMPLE_INPUT) == json.loads(
        open("tests/golden/expected.json").read()
    )
```

3. Demandez à l'agent de changer le format du rapport — le golden va échouer — faites-lui mettre à jour la référence délibérément.

**Acceptation :** le rapport contient le diff de la référence et une explication de pourquoi le changement est correct.

---

## Critères de soumission

- [ ] `check.sh` fonctionne comme une commande unique, temps < 60 s.
- [ ] Les tests de la tâche 2 sont inchangés, le code est minimal.
- [ ] Il y a une preuve que les tests détectent une mutation.
- [ ] Un rapport de la boucle « erreur → correction » avec la sortie complète.
- [ ] Un test golden + une mise à jour délibérée de la référence.
