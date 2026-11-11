# Projets pour le projet final

On choisit selon le critère « valeur pour vous / inconnu pour l'agent ».
Notation de difficulté : ● faible, ●● moyenne, ●●● élevée.
Toutes les options tiennent dans 126 minutes de pratique, c'est-à-dire dans un MVP.

---

## 1. Suivi des dépenses depuis un CSV bancaire — ●●●

**L'essentiel.** Vous téléversez un relevé bancaire, l'application regroupe les dépenses par catégorie
selon des règles (mots-clés dans le libellé) et affiche les totaux du mois.

**Pourquoi c'est un bon choix.** Des données réelles, un bénéfice évident, vérifiable à la main.
L'inconnu : le parsing d'un format CSV précis — résolu avec un seul
`fixtures/sample.csv`.

**Scénario principal.** Téléverser un CSV → voir un tableau « catégorie : montant » pour le mois.

**Ce qu'on coupe.** L'authentification, les graphiques, l'édition des règles dans l'UI (les règles
vivent dans un fichier JSON).

**Stack.** Node + Fastify + HTML vanilla, ou Python + FastAPI.

---

## 2. Suivi d'habitudes sur localStorage — ●

**L'essentiel.** Des marques « fait » par jour, la série en cours, une grille hebdomadaire.

**Pourquoi c'est un bon choix.** Aucun backend ni base de données — la moitié des risques disparaît. Idéal si
le temps est compté.

**Scénario principal.** Marquer aujourd'hui → la série grandit → après rechargement de
la page, tout est toujours là.

**Ce qu'on coupe.** Les comptes, la synchronisation, les rappels.

**Stack.** Un seul fichier HTML + JS, ou React + Vite.

---

## 3. Convertisseur Markdown → HTML en CLI — ●●

**L'essentiel.** L'utilitaire lit un .md, produit un .html avec des styles de base ; prise en charge des
titres, des listes, des liens, du code.

**Pourquoi c'est un bon choix.** Parfait pour le TDD : chaque élément de syntaxe = un test.
Beaucoup de cas limites (fichier vide, listes imbriquées, code non fermé).

**Scénario principal.** `convert input.md -o out.html` → du HTML valide avec les balises attendues.

**Ce qu'on coupe.** Les tableaux, les notes de bas de page, les extensions personnalisées, le mode watch.

**Stack.** Python (sans dépendances) ou Node (sans dépendances).

---

## 4. Tableau de bord météo par ville — ●●

**L'essentiel.** Une liste de villes, la température actuelle et le vent depuis une API publique,
rafraîchis par un bouton.

**Pourquoi c'est un bon choix.** Fait travailler le module 7 de bout en bout : une vraie API, du cache, des erreurs réseau,
la validation des réponses. open-meteo a une API sans clé.

**Scénario principal.** Saisir une ville → voir la température ; si l'API est indisponible — une
erreur claire au lieu d'un écran vide.

**Ce qu'on coupe.** Les graphiques, les prévisions à 7 jours, la géolocalisation.

**Stack.** Node + Express + un frontend statique, déploiement sur Vercel.

---

## 5. Parser d'offres d'emploi avec filtres — ●●●

**L'essentiel.** Un script récupère les offres pour une requête, filtre par mots-clés et par
salaire, exporte en CSV.

**Pourquoi c'est un bon choix.** Un vrai bénéfice quand on cherche un emploi ; ça apprend à valider les données des autres.
Inconnu : la disponibilité de l'API — vérifiez avant de commencer, il n'y a peut-être pas
d'API publique sans clé (utilisez alors des fixtures).

**Scénario principal.** Lancer la commande → un CSV avec 10 offres filtrées.

**Ce qu'on coupe.** L'interface web, la planification, la déduplication.

**Stack.** Python + requests.

---

## 6. Mini-CRM sur une seule table — ●●●

**L'essentiel.** Une liste de clients : nom, statut (nouveau/actif/perdu), note, date du prochain
contact. CRUD + filtre par statut.

**Pourquoi c'est un bon choix.** Fait travailler le cycle complet : modèle de données, API, UI, tests, déploiement.
Inconnu : la base de données — utilisez SQLite en local et Vercel Postgres/Supabase si
vous voulez de la production.

**Scénario principal.** Ajouter un client → changer le statut → filtrer par statut
après un rechargement.

**Ce qu'on coupe.** L'authentification, les rôles, l'historique des modifications, les pièces jointes.

**Stack.** Node + Fastify + SQLite, ou Next.js + Supabase.

---

## 7. Générateur de README pour un dépôt — ●●

**L'essentiel.** Une CLI lit `package.json`/`pyproject.toml` et l'arborescence des dossiers, génère
un README avec les sections : installation, lancement, tests, structure.

**Pourquoi c'est un bon choix.** Un utilitaire que vous utiliserez sur chaque projet du cours.
Beaucoup de cas limites sur les chaînes — de bons tests unitaires.

**Scénario principal.** `readme-gen .` → un fichier README avec les bonnes commandes.

**Ce qu'on coupe.** Les modèles, la personnalisation, l'intégration de l'API GitHub.

**Stack.** Node ou Python, sans dépendances.

---

## 8. Vérificateur de liens morts pour un site — ●●

**L'essentiel.** Un script parcourt une page, collecte les liens, vérifie les codes de statut,
et produit un rapport.

**Pourquoi c'est un bon choix.** Enseigne les timeouts, la concurrence, la gestion du réseau — l'ensemble
d'erreurs le plus riche par ligne de code.

**Scénario principal.** `check-links https://example.com` → un rapport listant les 4xx/5xx.

**Ce qu'on coupe.** Le crawl récursif, le cache, les rapports HTML.

**Stack.** Python + httpx.

---

## 9. Bot de rappels Telegram — ●●●

**L'essentiel.** Le bot accepte « rappelle-moi demain à 10 h d'appeler », le stocke et vous envoie un message à l'heure dite.

**Pourquoi c'est un bon choix.** Un vrai bénéfice ; enseigne les API externes et les secrets en production.
Inconnu : le token et l'hébergement d'un processus de longue durée (Railway/Fly), Vercel
ne convient pas pour du polling.

**Scénario principal.** Envoyer un message → recevoir une confirmation → recevoir le
rappel.

**Ce qu'on coupe.** Les rappels récurrents, les fuseaux horaires (autres que le vôtre), les commandes.

**Stack.** Python + aiogram, SQLite.

---

## 10. Comparaison de prix par URL enregistrées — ●●●

**L'essentiel.** Une liste d'URL de produits, un script extrait le prix par sélecteur, écrit l'historique en
CSV, affiche la variation.

**Pourquoi c'est un bon choix.** La plus forte densité d'apprentissage : parsing HTML, sélecteurs,
historique, erreurs dues au balisage qui change.

**L'inconnu.** Les sites bloquent les bots ; choisissez un seul site, vérifiez-le avec curl avant de
commencer. S'il vous bloque — travaillez sur des fixtures HTML enregistrées.

**Scénario principal.** Lancer → pour chaque URL le prix et l'écart depuis la dernière fois.

**Ce qu'on coupe.** Les notifications, un planificateur, le contournement anti-bot.

**Stack.** Python + httpx + selectolax (ou cheerio en Node).

---

## Comment choisir en 5 minutes

1. Avez-vous besoin du résultat après le cours ? Si oui — prenez 1, 5 ou 7.
2. Vous voulez un risque minimal et un rendu garanti — prenez 2 ou 3.
3. Vous voulez pratiquer les API et le déploiement — prenez 4 ou 6.

Ce qu'il ne faut pas prendre pour un projet final : tout ce qui a plus d'un écran d'authentification, tout ce qui a besoin d'un
prestataire de paiement, tout ce qui a besoin d'un build mobile natif. Ce n'est pas un travail de 126 minutes.
