# -*- coding: utf-8 -*-
"""Сборка HTML-версии курса «Вайбкодинг 30/70».

Запуск (из папки src/):
    python build_html.py

Исходники:
    ./*.md       — русская версия
    ./en/*.md    — английская версия

Результат:
    ../*.html        — русская версия
    ../en/*.html     — английская версия

Зависимость: markdown  (pip install markdown)
"""
import os
import posixpath
import re

import markdown

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(SRC)  # курс 30/70: html лежит рядом с src/

LANGS = ["ru", "en", "fr"]

# md-файл, html-файл, {lang: (заголовок, подпись в меню)}
PAGES = [
    ("README.md", "index.html",
     {"ru": ("Обзор курса", "Старт"), "en": ("Course overview", "Start"),
      "fr": ("Aperçu du cours", "Début")}),
    ("01-programma.md", "01-programma.html",
     {"ru": ("Программа", "Модули и тайминг"), "en": ("Program", "Modules and timing"),
      "fr": ("Programme", "Modules et minutage")}),
    ("02-teoriya.md", "02-teoriya.html",
     {"ru": ("Теория", "30% курса"), "en": ("Theory", "30% of the course"),
      "fr": ("Théorie", "30 % du cours")}),
    ("03-praktika.md", "03-praktika.html",
     {"ru": ("Практика", "70% курса"), "en": ("Practice", "70% of the course"),
      "fr": ("Pratique", "70 % du cours")}),
    ("04-promptoteka.md", "04-promptoteka.html",
     {"ru": ("Промптотека", "32 промпта"), "en": ("Prompt library", "32 prompts"),
      "fr": ("Bibliothèque de prompts", "32 prompts")}),
    ("05-proekty.md", "05-proekty.html",
     {"ru": ("Проекты", "Капстоун"), "en": ("Projects", "Capstone"),
      "fr": ("Projets", "Projet final")}),
    ("06-tracker.md", "06-tracker.html",
     {"ru": ("Трекер", "Чек-лист"), "en": ("Tracker", "Checklist"),
      "fr": ("Suivi", "Checklist")}),
]

GANTT = {"ru": ("Гант по неделям", "Навыки и теория"),
         "en": ("Weekly Gantt", "Skills and theory"),
         "fr": ("Gantt par semaine", "Compétences et théorie")}

UI = {
    "ru": {
        "lang": "ru",
        "site": "Вайбкодинг 30/70",
        "brand_b": "Вайбкодинг",
        "brand_span": "курс 30/70 · 23 часа",
        "ratio": "30% теории · 70% практики · 1380 мин",
        "topbar_home": "← Вайбкодинг",
        "topbar_here": "Курс 30/70",
        "topbar_switch": "Курс по OpenCode →",
        "share": "Поделиться",
        "copied": "Ссылка скопирована",
        "lang_label": "EN",
        "lang_title": "Switch to English",
        "foot_local": "Открывается локально, без интернета.",
        "foot_print": "Ctrl+P — версия для печати.",
        "foot_marathon": "← Марафон по вайбкодингу",
        "foot_other": "Курс по OpenCode",
        "count": 'var DIST = { done: "из", crit: "критериев" };',
    },
    "en": {
        "lang": "en",
        "site": "Vibecoding 30/70",
        "brand_b": "Vibecoding",
        "brand_span": "course 30/70 · 23 hours",
        "ratio": "30% theory · 70% practice · 1380 min",
        "topbar_home": "← Vibecoding",
        "topbar_here": "Course 30/70",
        "topbar_switch": "OpenCode course →",
        "share": "Share",
        "copied": "Link copied",
        "lang_label": "RU",
        "lang_title": "Switch to Russian",
        "foot_local": "Opens locally, no internet needed.",
        "foot_print": "Ctrl+P — print version.",
        "foot_marathon": "← Vibecoding marathon",
        "foot_other": "OpenCode course",
        "count": 'var DIST = { done: "of", crit: "criteria" };',
    },
    "fr": {
        "lang": "fr",
        "site": "Vibecoding 30/70",
        "brand_b": "Vibecoding",
        "brand_span": "cours 30/70 · 23 heures",
        "ratio": "30 % de théorie · 70 % de pratique · 1380 min",
        "topbar_home": "← Vibecoding",
        "topbar_here": "Cours 30/70",
        "topbar_switch": "Cours OpenCode →",
        "share": "Partager",
        "copied": "Lien copié",
        "lang_label": "FR",
        "lang_title": "Passer au français",
        "foot_local": "S'ouvre en local, sans connexion.",
        "foot_print": "Ctrl+P — version imprimable.",
        "foot_marathon": "← Marathon Vibecoding",
        "foot_other": "Cours OpenCode",
        "count": 'var DIST = { done: "sur", crit: "critères" };',
    },
}

LANG_LABEL = {"ru": "RU", "en": "EN", "fr": "FR"}
LANG_TITLE = {"ru": "Русский", "en": "English", "fr": "Français"}

CSS = """
:root{
  --bg:#fbfaf7; --panel:#ffffff; --ink:#1a1a1a; --muted:#6b6b6b;
  --line:#e6e2da; --accent:#2f5d50; --accent-soft:#eaf1ee; --code:#f4f2ed;
  --warn:#8a4b2f;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0; background:var(--bg); color:var(--ink);
  font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.layout{display:flex; min-height:100vh; align-items:flex-start}

/* --- сайдбар --- */
.side{
  width:268px; flex:0 0 268px; position:sticky; top:0; height:100vh;
  overflow-y:auto; background:var(--panel); border-right:1px solid var(--line);
  padding:26px 18px 40px;
}
.brand{display:block; text-decoration:none; color:var(--ink); margin-bottom:4px}
.brand b{font-size:15px; letter-spacing:.02em; display:block}
.brand span{font-size:12px; color:var(--muted)}
.side .ratio{
  margin:16px 0 22px; font-size:11.5px; color:var(--accent);
  background:var(--accent-soft); border-radius:6px; padding:7px 10px; letter-spacing:.02em;
}
.side nav a{
  display:block; text-decoration:none; color:var(--ink); padding:8px 10px;
  border-radius:6px; font-size:14px; border-left:2px solid transparent;
}
.side nav a small{display:block; color:var(--muted); font-size:11.5px; line-height:1.3}
.side nav a:hover{background:#f6f4f0}
.side nav a.active{background:var(--accent-soft); border-left-color:var(--accent); font-weight:600}
.side nav a.active small{color:var(--accent)}
.side .foot{
  margin-top:26px; padding-top:16px; border-top:1px solid var(--line);
  font-size:11.5px; color:var(--muted); line-height:1.5;
}
.side .foot a{color:var(--accent); text-decoration:none}
.side .foot a:hover{text-decoration:underline}

/* --- контент --- */
main{flex:1 1 auto; min-width:0; padding:52px 56px 90px; max-width:900px}

/* верхняя навигация: выход из курса, share, язык, переключение курсов */
.topbar{
  position:sticky; top:0; z-index:20; display:flex; align-items:center;
  gap:8px; flex-wrap:wrap; margin:-26px 0 24px; padding:11px 0;
  background:var(--bg); border-bottom:1px solid var(--line); font-size:13.5px;
}
.topbar a{color:var(--accent); text-decoration:none; border-bottom:1px solid transparent}
.topbar a:hover{border-bottom-color:var(--accent)}
.topbar .home{font-weight:650}
.topbar .sep{color:#c9c3b8}
.topbar .here{color:var(--muted)}
.topbar .spacer{flex:1 1 auto}
.topbar .switch{
  font-size:12.5px; color:var(--muted); background:var(--panel);
  border:1px solid var(--line); padding:5px 12px; border-radius:999px;
  transition:color .15s, border-color .15s;
}
.topbar .switch:hover{color:var(--accent); border-color:var(--accent)}
.topbar .share{
  font:inherit; font-size:12.5px; color:var(--muted); background:var(--panel);
  border:1px solid var(--line); padding:5px 12px; border-radius:999px; cursor:pointer;
  transition:color .15s, border-color .15s, background .15s;
}
.topbar .share:hover{color:var(--accent); border-color:var(--accent)}
.topbar .share.copied{color:#fff; background:var(--accent); border-color:var(--accent)}

article h1{
  font-size:30px; line-height:1.25; margin:0 0 10px; letter-spacing:-.01em;
  padding-bottom:16px; border-bottom:2px solid var(--accent);
}
article h2{font-size:21px; margin:44px 0 12px; padding-top:8px; letter-spacing:-.005em}
article h3{font-size:16.5px; margin:28px 0 8px; color:var(--accent)}
article h4{font-size:15px; margin:22px 0 6px}
article p{margin:10px 0}
article ul,article ol{margin:10px 0 10px 22px; padding:0}
article li{margin:5px 0}
article li::marker{color:var(--muted)}
article a{color:var(--accent); text-decoration:none; border-bottom:1px solid #c8d8d2}
article a:hover{border-bottom-color:var(--accent)}
article strong{font-weight:650}
article hr{border:0; border-top:1px solid var(--line); margin:38px 0}
article blockquote{
  margin:16px 0; padding:2px 0 2px 16px; border-left:3px solid var(--accent);
  color:#3d3d3d; background:#f7f5f1;
}
article blockquote p{margin:8px 0}

/* таблицы */
article table{
  width:100%; border-collapse:collapse; margin:18px 0; font-size:14px;
  background:var(--panel); border:1px solid var(--line);
}
article th,article td{padding:9px 12px; text-align:left; border-bottom:1px solid var(--line); vertical-align:top}
article th{background:#f4f2ed; font-weight:650; font-size:13px; letter-spacing:.01em}
article tbody tr:last-child td{border-bottom:none}
article tbody tr:hover{background:#fbfaf7}
article td:first-child{white-space:nowrap}

/* код */
article code{
  font-family:"SF Mono",ui-monospace,Consolas,"Liberation Mono",monospace;
  font-size:13px; background:var(--code); padding:2px 5px; border-radius:4px;
}
article pre{
  background:#22201d; color:#eae6df; padding:16px 18px; border-radius:8px;
  overflow-x:auto; font-size:13px; line-height:1.55; margin:16px 0;
}
article pre code{background:none; padding:0; color:inherit; font-size:12.5px}

/* чек-лист */
article li.task{list-style:none; margin-left:-20px; padding-left:26px; position:relative; cursor:pointer}
article li.task .cb{
  position:absolute; left:0; top:4px; width:14px; height:14px;
  border:1.5px solid #b9b3a8; border-radius:3px; display:inline-block;
}
article li.task.done .cb{background:var(--accent); border-color:var(--accent)}
article li.task.done .cb:after{
  content:""; position:absolute; left:4px; top:0.5px; width:4px; height:8px;
  border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg);
}
article li.task.done{color:var(--muted)}
article .cb{
  display:inline-block; width:13px; height:13px; border:1.5px solid #b9b3a8;
  border-radius:3px; position:relative; vertical-align:-2px; cursor:pointer;
}
article .cb.done{background:var(--accent); border-color:var(--accent)}
article .cb.done:after{
  content:""; position:absolute; left:3.5px; top:0; width:4px; height:8px;
  border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg);
}

/* навигация снизу */
.pager{display:flex; justify-content:space-between; gap:16px; margin-top:56px;
  padding-top:22px; border-top:1px solid var(--line); font-size:14px}
.pager a{text-decoration:none; color:var(--accent)}
.pager .next{margin-left:auto; text-align:right}

/* полоса прогресса */
.progress{
  position:relative; background:var(--accent-soft); border-radius:8px;
  padding:10px 14px; margin-bottom:26px; font-size:13px; color:var(--accent);
  overflow:hidden;
}
.progress span{position:relative; z-index:1}
.progress i{
  position:absolute; left:0; top:0; bottom:0; background:#cfe0d8;
  display:block; transition:width .2s ease;
}

@media (max-width:860px){
  .layout{flex-direction:column}
  .side{position:static; width:100%; flex:none; height:auto; border-right:none;
        border-bottom:1px solid var(--line); padding:18px 16px}
  .side nav{display:flex; flex-wrap:wrap; gap:6px}
  .side nav a{flex:1 1 140px; border-left:none; border-bottom:2px solid transparent}
  .side nav a.active{border-left:none; border-bottom-color:var(--accent)}
  .side .foot{display:none}
  main{padding:28px 18px 60px}
  .topbar{margin:-28px 0 20px; font-size:13px}
  .topbar .switch,.topbar .share{font-size:12px; padding:4px 10px}
  article h1{font-size:24px}
  article h2{font-size:19px}
  article td:first-child{white-space:normal}
}
@media print{
  .side,.pager,.topbar{display:none}
  main{padding:0; max-width:none}
  body{background:#fff}
  article pre{background:#f4f2ed; color:#1a1a1a; border:1px solid var(--line)}
}
"""

PAGE_TMPL = """<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — {site}</title>
<meta property="og:title" content="{title} — {site}">
<meta property="og:type" content="article">
<style>{css}</style>
</head>
<body>
<div class="layout">
  <aside class="side">
    <a class="brand" href="index.html"><b>{brand_b}</b><span>{brand_span}</span></a>
    <div class="ratio">{ratio}</div>
    <nav>
      {nav}
    </nav>
    <div class="foot">{foot_local}<br>{foot_print}<br>
      <a href="{up}index.html">{foot_marathon}</a><br>
      <a href="{up}opencode/index.html">{foot_other}</a></div>
  </aside>
  <main>
    <div class="topbar">
      <a class="home" href="{up}index.html">{topbar_home}</a>
      <span class="sep">·</span>
      <span class="here">{topbar_here}</span>
      <span class="spacer"></span>
      <button type="button" class="share" data-share="{share_path}" data-copied="{copied}" title="{share}">{share}</button>
      {lang_links}
      <a class="switch" href="{up}opencode/index.html">{topbar_switch}</a>
    </div>
    <article>
{body}
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
      var url = location.protocol === "file:"
        ? SHARE_ORIGIN + path
        : location.origin + location.pathname + location.search + location.hash;
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
      if (navigator.clipboard && window.isSecureContext) {
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
  var KEY = "vibe-course-progress-v1:" + location.pathname.split("/").pop();
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { state = {}; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var bar = document.createElement("div");
  bar.className = "progress";
  document.querySelector("article").prepend(bar);

  function render() {
    var done = 0;
    boxes.forEach(function (el) { if (el.classList.contains("done")) done++; });
    var pct = Math.round(100 * done / boxes.length);
    bar.innerHTML = "<span><b>" + done + "</b> " + DIST.done + " " + boxes.length +
      " " + DIST.crit + " · " + pct + "%</span><i style=\\"width:" + pct + "%\\"></i>";
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


def md_to_html(text, lang):
    text = escape_placeholders(text)
    md = markdown.Markdown(
        extensions=["tables", "fenced_code", "toc", "sane_lists", "attr_list"],
        extension_configs={"toc": {"permalink": False}},
    )
    html = md.convert(text)
    # ссылки на .md -> .html
    html = re.sub(r'href="([^"]+)\.md"', r'href="\1.html"', html)
    html = html.replace('href="README.html"', 'href="index.html"')
    html = mark_tasks(html)
    return html


def src_path(md_file, lang):
    return os.path.join(SRC, md_file) if lang == "ru" else os.path.join(SRC, lang, md_file)


def out_path(html_file, lang):
    return html_file if lang == "ru" else lang + "/" + html_file


def lang_links_html(html_file, lang):
    """Таблетки-ссылки на эту же страницу в остальных языках."""
    here = "." if lang == "ru" else lang
    out = []
    for other in LANGS:
        if other == lang:
            continue
        out.append('<a class="switch" href="%s" title="%s">%s</a>'
                   % (posixpath.relpath(out_path(html_file, other), here),
                      LANG_TITLE[other], LANG_LABEL[other]))
    return "\n      ".join(out)


def build():
    for lang in LANGS:
        t = UI[lang]
        print("--- %s ---" % lang)

        for i, (md_file, html_file, titles) in enumerate(PAGES):
            with open(src_path(md_file, lang), encoding="utf-8") as f:
                body = md_to_html(f.read(), lang)

            nav_items = []
            for j, (_, o, ts) in enumerate(PAGES):
                cls = ' class="active"' if j == i else ""
                nav_items.append('<a href="%s"%s>%s<small>%s</small></a>'
                                 % (o, cls, ts[lang][0], ts[lang][1]))
            gantt_file = "gantt.html" if lang == "ru" else "gantt.html"
            nav_items.append('<a href="%s">%s<small>%s</small></a>'
                             % (gantt_file, GANTT[lang][0], GANTT[lang][1]))

            pager = []
            if i > 0:
                pager.append('<a class="prev" href="%s">← %s</a>'
                             % (PAGES[i - 1][1], PAGES[i - 1][2][lang][0]))
            if i < len(PAGES) - 1:
                pager.append('<a class="next" href="%s">%s →</a>'
                             % (PAGES[i + 1][1], PAGES[i + 1][2][lang][0]))

            target = out_path(html_file, lang)
            up = "../" if lang == "ru" else "../../"
            share_path = "course-30-70/" + target
            lang_links = lang_links_html(html_file, lang)

            html = PAGE_TMPL.format(
                lang=lang,
                title=titles[lang][0],
                site=t["site"],
                css=CSS,
                up=up,
                brand_b=t["brand_b"],
                brand_span=t["brand_span"],
                ratio=t["ratio"],
                nav="\n      ".join(nav_items),
                foot_local=t["foot_local"],
                foot_print=t["foot_print"],
                foot_marathon=t["foot_marathon"],
                foot_other=t["foot_other"],
                topbar_home=t["topbar_home"],
                topbar_here=t["topbar_here"],
                topbar_switch=t["topbar_switch"],
                share=t["share"],
                copied=t["copied"],
                share_path=share_path,
                lang_links=lang_links,
                body=body,
                pager="\n      ".join(pager),
                script="<script>" + t["count"] + "</script>\n" + SCRIPT,
            )

            path = os.path.join(OUT, target.replace("/", os.sep))
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)
            print("ok  %-28s %7d bytes" % (target, len(html)))


if __name__ == "__main__":
    build()
