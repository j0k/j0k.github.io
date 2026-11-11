# Building the course site "Vibe coding with OpenCode"

The HTML version of the course is built from the Markdown sources in this directory (`src/`).
The site has no external dependencies: only the shared `assets/style.css`.

## Site structure

```
opencode/
├── index.html                  course overview: syllabus, schedule, grading
├── modules/
│   ├── NN-slug.html            module theory
│   └── NN-slug-practice.html   module practice
├── templates/*.html            artifact templates
├── templates.html              table of contents of templates
├── rubric.html                 grading criteria
├── glossary.html               glossary
├── resources.html              what to read next
├── progress.html               progress tracker
├── labs.html                   where to submit artifacts
├── build.html                  this page
├── assets/style.css            shared style
└── src/                        markdown sources and the builder
```

## How to rebuild

Edit the Markdown in `src/`, then:

```bash
cd src
python build.py
```

You need the `markdown` package:

```bash
pip install markdown
```

The builder rewrites `*.md` links into internal `.html` ones, substitutes
the correct relative paths, and assembles the navigation across modules.
You do not need to touch links in the HTML by hand — the next build will overwrite them.

## What is added at build time

- A single sidebar: all modules (theory + practice) and course materials.
- "theory ↔ practice" switches in the module page header and a pager at the bottom.
- `- [ ]` checklists are clickable; progress is stored in `localStorage`
  separately for each page.
- Checkboxes in tables (progress tracker) are clickable too.
- `Ctrl+P` gives a clean version: no sidebar, pager, or progress bar.

## Source files

| File | Page |
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
