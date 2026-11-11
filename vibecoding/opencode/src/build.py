# -*- coding: utf-8 -*-
"""Сборка сайта курса «Вайбкодинг с OpenCode» из Markdown-исходников.

Запуск (из папки src/):
    python build.py

Исходники:
    ./README.md, ./modules/*/README.md, ./modules/*/practice.md,
    ./templates/*.md, ./labs/README.md, ./rubric.md, ./glossary.md,
    ./resources.md, ./progress.md, ./BUILD.md      — русская версия
    ./en/<то же самое>                              — английская версия

Результат:
    ../index.html, ../modules/*.html, ...           — русская версия
    ../en/index.html, ../en/modules/*.html, ...     — английская версия

Зависимость: markdown  (pip install markdown)
"""
import os
import posixpath
import re

import markdown

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(SRC)  # папка opencode/

LANGS = ["ru", "en", "fr"]
DEFAULT_LANG = "ru"


# ---------------------------------------------------------------- контент

# slug -> {lang: (название, подпись)}
MODULES = [
    ("00-orientation", {
        "ru": ("Ориентация", "роли, границы, первая сессия"),
        "en": ("Orientation", "roles, boundaries, first session"),
        "fr": ("Orientation", "rôles, limites, première session"),
    }),
    ("01-llm-basics", {
        "ru": ("Как работают LLM", "токены, контекст, сэмплинг"),
        "en": ("How LLMs work", "tokens, context, sampling"),
        "fr": ("Comment fonctionnent les LLM", "tokens, contexte, échantillonnage"),
    }),
    ("02-context", {
        "ru": ("Контекст-инжиниринг", "окно, AGENTS.md, гигиена"),
        "en": ("Context engineering", "window, AGENTS.md, hygiene"),
        "fr": ("Ingénierie du contexte", "fenêtre, AGENTS.md, hygiène"),
    }),
    ("03-spec", {
        "ru": ("Спека и промпт", "спека-first, критерии, план"),
        "en": ("Spec and prompt", "spec-first, criteria, plan"),
        "fr": ("Spécification et prompt", "spec-first, critères, plan"),
    }),
    ("04-oracles", {
        "ru": ("Оракулы и проверка", "тесты, типы, линтеры, CI"),
        "en": ("Oracles and checks", "tests, types, linters, CI"),
        "fr": ("Oracles et vérification", "tests, types, linters, CI"),
    }),
    ("05-agent-loop", {
        "ru": ("Агентный цикл и права", "tool calling, permissions"),
        "en": ("Agent loop and permissions", "tool calling, permissions"),
        "fr": ("Boucle d'agent et permissions", "tool calling, permissions"),
    }),
    ("06-economics", {
        "ru": ("Экономика и выбор модели", "цена, кэш, латентность"),
        "en": ("Economics and model choice", "price, cache, latency"),
        "fr": ("Économie et choix du modèle", "prix, cache, latence"),
    }),
    ("07-refactor", {
        "ru": ("Рефакторинг в масштабе", "многофайловые изменения"),
        "en": ("Refactoring at scale", "multi-file changes"),
        "fr": ("Refactoring à grande échelle", "modifications multi-fichiers"),
    }),
    ("08-review", {
        "ru": ("Ревью и quality gates", "диффы, красные флаги"),
        "en": ("Review and quality gates", "diffs, red flags"),
        "fr": ("Revue et quality gates", "diffs, signaux d'alerte"),
    }),
    ("09-custom", {
        "ru": ("Кастомизация", "skills, commands, subagents"),
        "en": ("Customization", "skills, commands, subagents"),
        "fr": ("Personnalisation", "skills, commandes, subagents"),
    }),
    ("10-capstone", {
        "ru": ("Капстоун", "фича от спеки до CI"),
        "en": ("Capstone", "feature from spec to CI"),
        "fr": ("Projet final", "une fonctionnalité de la spec à la CI"),
    }),
]

TEMPLATES = [
    ("spec", {
        "ru": ("Спека задачи", "Каркас постановки задачи"),
        "en": ("Task spec", "Skeleton for stating a task"),
        "fr": ("Spécification de tâche", "Squelette de formulation d'une tâche"),
    }, "spec.md"),
    ("agents", {
        "ru": ("AGENTS.md", "Инструкции для агента в репозитории"),
        "en": ("AGENTS.md", "Agent instructions in the repo"),
        "fr": ("AGENTS.md", "Instructions pour l'agent dans le dépôt"),
    }, "AGENTS.md"),
    ("review-checklist", {
        "ru": ("Чек-лист ревью", "Что проверять в диффе"),
        "en": ("Review checklist", "What to check in a diff"),
        "fr": ("Checklist de revue", "Ce qu'il faut vérifier dans un diff"),
    }, "review-checklist.md"),
    ("retro", {
        "ru": ("Ретро", "Ретроспектива модуля или итерации"),
        "en": ("Retro", "Module or iteration retrospective"),
        "fr": ("Rétro", "Rétrospective d'un module ou d'une itération"),
    }, "retro.md"),
]

DOCS = [
    ("rubric", {"ru": "Критерии оценки", "en": "Grading rubric",
               "fr": "Grille d'évaluation"}, "rubric.md"),
    ("glossary", {"ru": "Глоссарий", "en": "Glossary",
                 "fr": "Glossaire"}, "glossary.md"),
    ("resources", {"ru": "Что читать дальше", "en": "Further reading",
                  "fr": "À lire ensuite"}, "resources.md"),
    ("progress", {"ru": "Трекер прогресса", "en": "Progress tracker",
                 "fr": "Suivi de progression"}, "progress.md"),
    ("labs", {"ru": "Labs", "en": "Labs", "fr": "Labs"}, "labs/README.md"),
    ("templates", {"ru": "Шаблоны", "en": "Templates", "fr": "Modèles"}, None),
    ("build", {"ru": "Как собрать сайт", "en": "How to build the site",
               "fr": "Comment construire le site"}, "BUILD.md"),
]

# интерфейсные строки
UI = {
    "ru": {
        "title": "Обзор курса",
        "site": "Вайбкодинг с OpenCode",
        "brand_b": "Вайбкодинг",
        "brand_span": "с OpenCode · 50 часов",
        "ratio": "40% теории · 60% практики",
        "group_course": "Курс",
        "group_modules": "Модули",
        "group_docs": "Материалы",
        "overview": "Обзор",
        "overview_sub": "Программа и правила",
        "practice": "практика",
        "practice_suffix": " — практика",
        "cross_practice": "Практика →",
        "cross_theory": "← Теория",
        "topbar_home": "← Вайбкодинг",
        "topbar_switch": "Курс 30/70 →",
        "share": "Поделиться",
        "copied": "Ссылка скопирована",
        "foot_marathon": "← Марафон по вайбкодингу",
        "foot_other": "Курс 30/70",
        "tpl_title": "Шаблоны артефактов",
        "tpl_intro": "Каркасы, которые копируются в рабочий проект. "
                     "Те же файлы лежат в Markdown: <code>src/templates/</code>.",
        "lang_label": "EN",
        "lang_title": "Switch to English",
    },
    "en": {
        "title": "Course overview",
        "site": "Vibecoding with OpenCode",
        "brand_b": "Vibecoding",
        "brand_span": "with OpenCode · 50 hours",
        "ratio": "40% theory · 60% practice",
        "group_course": "Course",
        "group_modules": "Modules",
        "group_docs": "Materials",
        "overview": "Overview",
        "overview_sub": "Program and rules",
        "practice": "practice",
        "practice_suffix": " — practice",
        "cross_practice": "Practice →",
        "cross_theory": "← Theory",
        "topbar_home": "← Vibecoding",
        "topbar_switch": "Course 30/70 →",
        "share": "Share",
        "copied": "Link copied",
        "foot_marathon": "← Vibecoding marathon",
        "foot_other": "Course 30/70",
        "tpl_title": "Artifact templates",
        "tpl_intro": "Skeletons to copy into a working project. "
                     "The same files live as Markdown in <code>src/templates/</code>.",
        "lang_label": "RU",
        "lang_title": "Switch to Russian",
    },
    "fr": {
        "title": "Aperçu du cours",
        "site": "Vibecoding avec OpenCode",
        "brand_b": "Vibecoding",
        "brand_span": "avec OpenCode · 50 heures",
        "ratio": "40 % de théorie · 60 % de pratique",
        "group_course": "Cours",
        "group_modules": "Modules",
        "group_docs": "Ressources",
        "overview": "Aperçu",
        "overview_sub": "Programme et règles",
        "practice": "pratique",
        "practice_suffix": " — pratique",
        "cross_practice": "Pratique →",
        "cross_theory": "← Théorie",
        "topbar_home": "← Vibecoding",
        "topbar_switch": "Cours 30/70 →",
        "share": "Partager",
        "copied": "Lien copié",
        "foot_marathon": "← Marathon Vibecoding",
        "foot_other": "Cours 30/70",
        "tpl_title": "Modèles de livrables",
        "tpl_intro": "Des squelettes à copier dans un projet réel. "
                     "Les mêmes fichiers existent en Markdown : <code>src/templates/</code>.",
        "lang_label": "FR",
        "lang_title": "Passer au français",
    },
}

LANG_LABEL = {"ru": "RU", "en": "EN", "fr": "FR"}
LANG_TITLE = {"ru": "Русский", "en": "English", "fr": "Français"}


# ---------------------------------------------------------------- ключи и пути

def resolve_key(key):
    """Ключ страницы -> путь относительно корня своей языковой версии."""
    if key == "index":
        return "index.html"
    if key.startswith("mod-"):
        rest = key[4:]
        if rest.endswith("-practice"):
            return "modules/%s-practice.html" % rest[:-9]
        return "modules/%s.html" % rest
    if key.startswith("tpl-"):
        return "templates/%s.html" % key[4:]
    return "%s.html" % key


def out_path(key, lang):
    """Ключ + язык -> путь относительно папки opencode/."""
    rel = resolve_key(key)
    return rel if lang == "ru" else lang + "/" + rel


def prefix_for(target):
    return "../" * target.count("/")


def src_dir(lang):
    return SRC if lang == "ru" else os.path.join(SRC, lang)


def read(path, lang):
    with open(os.path.join(src_dir(lang), path), encoding="utf-8") as f:
        return f.read()


def has_source(path, lang):
    return os.path.exists(os.path.join(src_dir(lang), path))


# ---------------------------------------------------------------- markdown

LINK_MAP = []
for _slug, _names in MODULES:
    LINK_MAP.append((r"\]\(modules/%s/README\.md\)" % re.escape(_slug), "](page:mod-%s)" % _slug))
    LINK_MAP.append((r"\]\(modules/%s/practice\.md\)" % re.escape(_slug), "](page:mod-%s-practice)" % _slug))
for _name, _names, _file in TEMPLATES:
    LINK_MAP.append((r"\]\(templates/%s(?:\.md)?\)" % re.escape(_file), "](page:tpl-%s)" % _name))
LINK_MAP += [
    (r"\]\(labs/README\.md\)", "](page:labs)"),
    (r"\]\(README\.md\)", "](page:index)"),
    (r"\]\(BUILD\.md\)", "](page:build)"),
    (r"\]\(rubric\.md\)", "](page:rubric)"),
    (r"\]\(glossary\.md\)", "](page:glossary)"),
    (r"\]\(resources\.md\)", "](page:resources)"),
    (r"\]\(progress\.md\)", "](page:progress)"),
]


def rewrite_links(text, module_slug=None):
    for pattern, repl in LINK_MAP:
        text = re.sub(pattern, repl, text)
    if module_slug:
        text = re.sub(r"\]\(practice\.md\)", "](page:mod-%s-practice)" % module_slug, text)
    return text


def escape_placeholders(text):
    """Экранировать < и > в обычном тексте, чтобы <плейсхолдеры> не стали тегами."""
    out = []
    in_fence = False
    for line in text.splitlines(keepends=True):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue
        parts = re.split(r"(`[^`]*`)", line)
        for i, part in enumerate(parts):
            if part.startswith("`") and part.endswith("`") and len(part) > 1:
                continue
            parts[i] = part.replace("<", "&lt;").replace(">", "&gt;")
        out.append("".join(parts))
    return "".join(out)


def mark_tasks(html):
    html = re.sub(r"<li>\[ \]\s*", '<li class="task"><span class="cb"></span>', html)
    html = re.sub(r"<li>\[[xX]\]\s*", '<li class="task done"><span class="cb"></span>', html)

    def cell(m):
        parts = re.split(r"(<code>.*?</code>)", m.group(1), flags=re.S)
        for i, part in enumerate(parts):
            if part.startswith("<code>"):
                continue
            part = part.replace("[ ]", '<span class="cb" data-task></span>')
            part = part.replace("[x]", '<span class="cb done" data-task></span>')
            parts[i] = part
        return "<td>%s</td>" % "".join(parts)

    return re.sub(r"<td>(.*?)</td>", cell, html, flags=re.S)


def demote_extra_h1(html):
    seen = []

    def repl(m):
        if not seen:
            seen.append(True)
            return m.group(0)
        return '<h2 class="section"%s>%s</h2>' % (m.group(1), m.group(2))

    return re.sub(r"<h1([^>]*)>(.*?)</h1>", repl, html, flags=re.S)


def md_to_html(text, lang, module_slug=None):
    text = rewrite_links(text, module_slug)
    text = escape_placeholders(text)
    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "toc", "sane_lists", "attr_list"],
        extension_configs={"toc": {"permalink": False}, "html": {"lang": lang}},
    )
    html = md.convert(text)
    html = mark_tasks(html)
    html = demote_extra_h1(html)
    html = html.replace("<table>", '<div class="table-wrap"><table>')
    html = html.replace("</table>", "</table></div>")
    return html


def first_h1(text, fallback=""):
    m = re.search(r"^#\s+(.+)$", text, re.M)
    return m.group(1).strip() if m else fallback


def expand_page_links(html, target, lang):
    """page:KEY -> относительная ссылка на страницу того же языка."""
    page_dir = posixpath.dirname(target) or "."
    return re.sub(
        r"page:([A-Za-z0-9_-]+)",
        lambda m: posixpath.relpath(out_path(m.group(1), lang), page_dir),
        html,
    )


def lang_links_html(key, lang, target):
    """Ссылки-таблетки на эту же страницу в остальных языках."""
    here = posixpath.dirname(target) or "."
    out = []
    for other in LANGS:
        if other == lang:
            continue
        out.append('<a class="switch" href="%s" title="%s">%s</a>'
                   % (posixpath.relpath(out_path(key, other), here),
                      LANG_TITLE[other], LANG_LABEL[other]))
    return "\n  ".join(out)


# ---------------------------------------------------------------- шаблон

TEMPLATE = """<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · {site}</title>
<meta property="og:title" content="{title} · {site}">
<meta property="og:type" content="article">
<link rel="stylesheet" href="{prefix}assets/style.css">
</head>
<body>
<div class="layout">
  <aside class="side">
    <a class="brand" href="{prefix}index.html"><b>{brand_b}</b><span>{brand_span}</span></a>
    <div class="ratio">{ratio}</div>
    <div class="group-title">{group_course}</div>
    <a class="nav{cls_index}" href="{prefix}index.html">{overview}<small>{overview_sub}</small></a>
    <div class="group-title">{group_modules}</div>
    {nav_modules}
    <div class="group-title">{group_docs}</div>
    {nav_docs}
    <div class="foot">
      <a href="{sibling}index.html">{foot_marathon}</a><br>
      <a href="{sibling}course-30-70/index.html">{foot_other}</a>
    </div>
  </aside>
  <main>
<div class="topbar">
  <a class="home" href="{sibling}index.html">{topbar_home}</a>
  <span class="sep">·</span>
  <span class="here">{here}</span>
  <span class="spacer"></span>
  <button type="button" class="share" data-share="{share_path}" data-copied="{copied}" title="{share}">{share}</button>
  {lang_links}
  <a class="switch" href="{sibling}course-30-70/index.html">{topbar_switch}</a>
</div>
    <article>
{cross}{body}
    </article>
    <div class="pager">{pager}</div>
  </main>
</div>
{script}
</body>
</html>
"""

SCRIPT = """<script>
(function () {
  /* --- кнопка «Поделиться» --- */
  var SHARE_ORIGIN = "https://j0k.github.io/vibecoding/";
  document.querySelectorAll(".share").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var path = btn.getAttribute("data-share") || "";
      var url;
      if (location.protocol === "file:") {
        url = SHARE_ORIGIN + path;
      } else {
        url = location.origin + location.pathname + location.search + location.hash;
      }
      var done = function () {
        var old = btn.textContent;
        btn.textContent = btn.getAttribute("data-copied") || "OK";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove("copied");
        }, 1600);
      };
      var fail = function () {
        window.prompt(btn.getAttribute("data-copied") || "", url);
      };
      if (navigator.clipboard && location.protocol !== "file:") {
        navigator.clipboard.writeText(url).then(done, fail);
      } else if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(done, fail);
      } else {
        var ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        ok ? done() : fail();
      }
    });
  });

  /* --- чек-листы с сохранением прогресса --- */
  var boxes = document.querySelectorAll("li.task, .cb[data-task]");
  if (!boxes.length) return;
  var KEY = "opencode-course:" + location.pathname.split("/").pop();
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { state = {}; }

  var bar = document.createElement("div");
  bar.className = "progress";
  document.querySelector("article").prepend(bar);

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function render() {
    var done = 0;
    boxes.forEach(function (el) { if (el.classList.contains("done")) done++; });
    var pct = Math.round(100 * done / boxes.length);
    bar.innerHTML = "<span><b>" + done + "</b> " + DIST.done + " " + boxes.length +
      " · " + pct + "%</span><i style=\\"width:" + pct + "%\\"></i>";
  }

  boxes.forEach(function (el, i) {
    var id = "t" + i;
    if (state[id]) el.classList.add("done");
    el.addEventListener("click", function (e) {
      if (e.target.tagName === "A") return;
      el.classList.toggle("done");
      state[id] = el.classList.contains("done");
      save();
      render();
    });
  });
  render();
})();
</script>"""

COUNT_LABEL = {
    "ru": 'var DIST = { done: "из" };',
    "en": 'var DIST = { done: "of" };',
    "fr": 'var DIST = { done: "sur" };',
}


def build_nav(active_key, prefix, lang, target):
    t = UI[lang]
    page_dir = posixpath.dirname(target) or "."
    mods = []
    for slug, names in MODULES:
        num, label = slug.split("-")[0], names[lang][0]
        theory = "mod-%s" % slug
        practice = "%s-practice" % theory
        mods.append(
            '<div class="mod">'
            '<a class="mod-theory%s" href="%s"><span class="num">%s</span>%s</a>'
            '<a class="mod-practice%s" href="%s">%s</a>'
            "</div>"
            % (
                " active" if active_key == theory else "",
                posixpath.relpath(out_path(theory, lang), page_dir), num, label,
                " active" if active_key == practice else "",
                posixpath.relpath(out_path(practice, lang), page_dir), t["practice"],
            )
        )

    docs = [
        '<a class="nav%s" href="%s">%s</a>'
        % (
            " active" if active_key == key else "",
            posixpath.relpath(out_path(key, lang), page_dir),
            labels[lang],
        )
        for key, labels, _src in DOCS
    ]
    return "\n    ".join(mods), "\n    ".join(docs)


def build_chain(lang):
    t = UI[lang]
    chain = []
    for slug, names in MODULES:
        chain.append(("mod-%s" % slug, names[lang][0]))
        chain.append(("mod-%s-practice" % slug, names[lang][0] + t["practice_suffix"]))
    return chain


def build_pager(chain, index, lang, target):
    page_dir = posixpath.dirname(target) or "."
    parts = []
    if index > 0:
        key, label = chain[index - 1]
        parts.append('<a class="prev" href="%s">← %s</a>'
                     % (posixpath.relpath(out_path(key, lang), page_dir), label))
    if index < len(chain) - 1:
        key, label = chain[index + 1]
        parts.append('<a class="next" href="%s">%s →</a>'
                     % (posixpath.relpath(out_path(key, lang), page_dir), label))
    return "\n      ".join(parts)


def crosslink(primary_key, primary_label, lang, target, secondary_key=None,
              secondary_label=None, primary=True):
    page_dir = posixpath.dirname(target) or "."
    out = []
    if secondary_key:
        out.append('<a href="%s">%s</a>'
                   % (posixpath.relpath(out_path(secondary_key, lang), page_dir), secondary_label))
    cls = ' class="primary"' if primary else ""
    out.append('<a%s href="%s">%s</a>'
               % (cls, posixpath.relpath(out_path(primary_key, lang), page_dir), primary_label))
    return '<div class="crosslink">%s</div>\n' % "".join(out)


def write_page(key, title, body, lang, cross="", pager="", active_key=None):
    t = UI[lang]
    target = out_path(key, lang)
    prefix = prefix_for(target)
    sibling = prefix + "../"
    nav_modules, nav_docs = build_nav(active_key or key, prefix, lang, target)

    html = TEMPLATE.format(
        lang=lang,
        title=title,
        site=t["site"],
        prefix=prefix,
        sibling=sibling,
        brand_b=t["brand_b"],
        brand_span=t["brand_span"],
        ratio=t["ratio"],
        group_course=t["group_course"],
        group_modules=t["group_modules"],
        group_docs=t["group_docs"],
        overview=t["overview"],
        overview_sub=t["overview_sub"],
        cls_index=" active" if (active_key or key) == "index" else "",
        nav_modules=nav_modules,
        nav_docs=nav_docs,
        here=t["site"],
        share=t["share"],
        copied=t["copied"],
        share_path="opencode/" + target,
        lang_links=lang_links_html(key, lang, target),
        topbar_home=t["topbar_home"],
        topbar_switch=t["topbar_switch"],
        foot_marathon=t["foot_marathon"],
        foot_other=t["foot_other"],
        cross=cross,
        body=expand_page_links(body, target, lang),
        pager=pager,
        script="<script>" + COUNT_LABEL[lang] + "</script>\n" + SCRIPT,
    )
    path = os.path.join(OUT, target.replace("/", os.sep))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("ok  %-46s %6d bytes" % (target, len(html)))
    return target


# ---------------------------------------------------------------- сборка

def pages_for(lang):
    """Список страниц: (ключ, заголовок, тело, cross, pager)."""
    t = UI[lang]
    chain = build_chain(lang)
    pager_of = {
        key: build_pager(chain, i, lang, out_path(key, lang))
        for i, (key, _label) in enumerate(chain)
    }
    pages = []

    # обзор курса
    pages.append(("index", t["title"], md_to_html(read("README.md", lang), lang), "", ""))

    # модули: теория + практика
    for slug, names in MODULES:
        theory_key = "mod-%s" % slug
        practice_key = "%s-practice" % theory_key

        theory_md = read("modules/%s/README.md" % slug, lang)
        pages.append((
            theory_key,
            first_h1(theory_md, names[lang][0]),
            md_to_html(theory_md, lang, module_slug=slug),
            crosslink(practice_key, t["cross_practice"], lang,
                      out_path(theory_key, lang)),
            pager_of[theory_key],
        ))

        practice_md = read("modules/%s/practice.md" % slug, lang)
        pages.append((
            practice_key,
            first_h1(practice_md, names[lang][0] + t["practice_suffix"]),
            md_to_html(practice_md, lang, module_slug=slug),
            crosslink(theory_key, t["cross_theory"], lang,
                      out_path(practice_key, lang),
                      secondary_key=None, primary=False),
            pager_of[practice_key],
        ))

    # документы курса
    for key, labels, src in DOCS:
        if key == "templates":
            page_dir = posixpath.dirname(out_path(key, lang))
            items = "".join(
                '<li><a href="%s">%s</a> — %s</li>'
                % (posixpath.relpath(out_path("tpl-%s" % name, lang), page_dir),
                   names[lang][0], names[lang][1])
                for name, names, _file in TEMPLATES
            )
            body = ('<h1 id="templates">%s</h1>\n<p>%s</p>\n<ul>%s</ul>'
                    % (t["tpl_title"], t["tpl_intro"], items))
        else:
            body = md_to_html(read(src, lang), lang)
        pages.append((key, labels[lang], body, "", ""))

    # шаблоны
    for name, names, file in TEMPLATES:
        pages.append(("tpl-%s" % name, names[lang][0],
                      md_to_html(read("templates/%s" % file, lang), lang), "", ""))

    return pages


def build():
    for lang in LANGS:
        print("--- %s ---" % lang)
        for key, title, body, cross, pager in pages_for(lang):
            write_page(key, title, body, lang, cross=cross, pager=pager)


if __name__ == "__main__":
    build()
