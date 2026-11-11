# -*- coding: utf-8 -*-
"""Проверка собранного курса 30/70: страницы, битые ссылки, остатки markdown."""
import os
import re

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sorted(f for f in os.listdir(OUT) if f.endswith(".html"))

print("files:", len(files))
for f in files:
    h = open(os.path.join(OUT, f), encoding="utf-8").read()
    print("%-22s %7db  tables=%2d  pre=%2d  tasks=%3d  h2=%2d  md_links=%d" % (
        f, len(h), h.count("<table>"), h.count("<pre>"),
        h.count('class="task'), h.count("<h2"),
        len(re.findall(r'\.md"', h)),
    ))

# все относительные ссылки ведут на существующие файлы
bad = []
for f in files:
    h = open(os.path.join(OUT, f), encoding="utf-8").read()
    for href in re.findall(r'(?:href|src)="([^"]+)"', h):
        if href.startswith(("http://", "https://", "#", "mailto:", "data:")):
            continue
        target = href.split("#", 1)[0]
        if not target:
            continue
        if not os.path.exists(os.path.normpath(os.path.join(OUT, target))):
            bad.append((f, href))
print("broken links:", bad if bad else "нет")

# остатки markdown
for f in files:
    h = open(os.path.join(OUT, f), encoding="utf-8").read()
    left = re.findall(r"<p>[^<]*(\*\*|\|)[^<]*</p>", h)
    if left:
        print("остатки markdown в", f, ":", left[:3])
