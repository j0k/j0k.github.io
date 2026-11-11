# Ressources

À lire et à regarder au-delà du cours. Pas de « 100 liens » — seulement ce qui a été vérifié.

---

## Documentation officielle

| Sujet | Lien |
| --- | --- |
| OpenCode V2 — documentation | https://opencode.ai/v2/docs/ |
| Configuration | https://opencode.ai/v2/docs/config/ |
| Permissions | https://opencode.ai/v2/docs/permissions/ |
| Fournisseurs et modèles | https://opencode.ai/v2/docs/providers/ |
| Serveurs MCP | https://opencode.ai/v2/docs/mcp-servers/ |
| Skills | https://opencode.ai/v2/docs/skills/ |
| Catalogue des modèles et des prix | https://models.dev |

---

## Fondamentaux des LLM

- **Anthropic, « Building effective agents »** — sur les boucles et les outils, sans magie.
- **OpenAI Cookbook** — recettes pratiques de prompting.
- **« Attention is all you need »** (Vaswani et al.) — si vous voulez comprendre l'architecture.
- **Andrej Karpathy, « Intro to Large Language Models »** (vidéo) — la meilleure explication depuis zéro.

---

## Ingénierie de processus

- **Google, « Code Review Developer Guide »** — le classique de la revue, applicable aux diffs d'agents.
- **« Working Effectively with Legacy Code »** (Michael Feathers) — sur la modification de
  code sans tests ; utile avant les migrations.
- **Trunk-based development** — pourquoi les petits commits comptent.
- **12 Factor App** — configuration et secrets.

---

## Sécurité

- **OWASP Top 10** — le minimum obligatoire lors d'une revue.
- **Attaques de la chaîne d'approvisionnement** (typosquatting, confusion de dépendances) — pourquoi une nouvelle
  dépendance proposée par l'agent exige une vérification.

---

## Pratique

- Votre propre `AGENTS.md` dans chaque projet.
- Une expérience du module 01 une fois par mois : l'intuition sur les modèles se périme vite.
- Tenez `docs/decisions.md` — dans six mois, ce sera la seule source du « pourquoi c'est comme ça ».

---

## Ce qu'il ne faut PAS lire au début

- Les listes de « 100 prompts qui vont tout changer » — elles contredisent le contenu du cours.
- Les articles « nous avons remplacé l'équipe par l'IA » — du marketing, pas de la méthodologie.
- Les guides de « cheat codes » de prompting — ils se périment plus vite que les modèles.
