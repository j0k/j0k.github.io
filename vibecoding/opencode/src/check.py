# -*- coding: utf-8 -*-
"""Проверка всех локальных ссылок и src в собранном сайте.

Запуск из src/:  python check.py
"""
import os
import re
import sys

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SRC)

LINK_RE = re.compile(r'(?:href|src)="([^"]+)"')


def main():
    problems = []
    checked = 0

    for dirpath, _dirnames, filenames in os.walk(ROOT):
        if os.sep + "src" in dirpath:
            continue
        for name in filenames:
            if not name.endswith(".html"):
                continue
            page = os.path.join(dirpath, name)
            rel_page = os.path.relpath(page, ROOT).replace("\\", "/")
            with open(page, encoding="utf-8") as f:
                html = f.read()

            for href in LINK_RE.findall(html):
                if href.startswith(("http://", "https://", "mailto:", "#", "data:")):
                    continue
                if ":" in href:  # page:..., javascript:...
                    problems.append("%s: неразвёрнутая ссылка %s" % (rel_page, href))
                    continue

                target = href.split("#", 1)[0].split("?", 1)[0]
                if not target:
                    continue

                resolved = os.path.normpath(os.path.join(dirpath, target.replace("/", os.sep)))
                checked += 1
                if not os.path.exists(resolved):
                    problems.append("%s: битая ссылка %s" % (rel_page, href))

    print("проверено ссылок: %d" % checked)
    if problems:
        print("\nПРОБЛЕМЫ (%d):" % len(problems))
        for p in problems:
            print("  -", p)
        return 1
    print("OK: битых ссылок нет")
    return 0


if __name__ == "__main__":
    sys.exit(main())
