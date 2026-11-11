# Projects for the capstone

Choosing by the criterion "value for you / unknown to the agent."
Difficulty rating: ● low, ●● medium, ●●● high.
All options are scoped to 126 minutes of practice, that is, to an MVP.

---

## 1. Expense tracking from a bank CSV — ●●●

**The gist.** You upload a bank statement, the app groups spending by category
according to rules (keywords in the description) and shows the month's totals.

**Why it's good.** Real data, clear value, verifiable by hand.
Unknown: parsing a specific CSV format — solved with a single
`fixtures/sample.csv`.

**Main scenario.** Upload a CSV → see a "category: amount" table for the month.

**What to cut.** Auth, charts, rule editing in the UI (rules live in a
JSON file).

**Stack.** Node + Fastify + vanilla HTML, or Python + FastAPI.

---

## 2. Habit tracker on localStorage — ●

**The gist.** "Done" marks by day, current streak, a weekly grid.

**Why it's good.** No backend and no database — half the risks disappear. Ideal if
time is tight.

**Main scenario.** Mark today → the streak grows → after reloading the
page everything is still there.

**What to cut.** Accounts, sync, reminders.

**Stack.** A single HTML + JS file, or React + Vite.

---

## 3. Markdown → HTML converter with a CLI — ●●

**The gist.** The utility reads .md, outputs .html with basic styles; support for
headings, lists, links, code.

**Why it's good.** Perfect for TDD: each syntax element = one test.
Plenty of edge cases (empty file, nested lists, unclosed code).

**Main scenario.** `convert input.md -o out.html` → valid HTML with the required tags.

**What to cut.** Tables, footnotes, custom extensions, watch mode.

**Stack.** Python (no dependencies) or Node (no dependencies).

---

## 4. Weather dashboard by city — ●●

**The gist.** A list of cities, current temperature and wind from a public API,
refreshed by a button.

**Why it's good.** Exercises module 7 end to end: a real API, caching, network errors,
response validation. open-meteo has a keyless API.

**Main scenario.** Enter a city → see the temperature; if the API is unavailable — a
clear error instead of a blank screen.

**What to cut.** Charts, a 7-day forecast, geolocation.

**Stack.** Node + Express + a static frontend, deploy to Vercel.

---

## 5. Job listings parser with filters — ●●●

**The gist.** A script pulls vacancies for a query, filters by keywords and
salary, exports to CSV.

**Why it's good.** Real value when job hunting; it teaches you to validate other people's data.
Unknown: API availability — check before you start, there may be no public
keyless one (then use fixtures).

**Main scenario.** Run the command → a CSV with 10 filtered vacancies.

**What to cut.** The web interface, scheduling, deduplication.

**Stack.** Python + requests.

---

## 6. Mini-CRM on a single table — ●●●

**The gist.** A client list: name, status (new/active/lost), note, next
contact date. CRUD + filter by status.

**Why it's good.** Exercises the full cycle: data model, API, UI, tests, deploy.
Unknown: the database — use SQLite locally and Vercel Postgres/Supabase if
you want production.

**Main scenario.** Add a client → change status → filter by status
after a reload.

**What to cut.** Auth, roles, change history, attachments.

**Stack.** Node + Fastify + SQLite, or Next.js + Supabase.

---

## 7. README generator for a repository — ●●

**The gist.** A CLI reads `package.json`/`pyproject.toml` and the folder structure, generates
a README with sections: install, run, tests, structure.

**Why it's good.** A utility you'll use on every project in the course.
Lots of string edge cases — good unit tests.

**Main scenario.** `readme-gen .` → a README file with the correct commands.

**What to cut.** Templates, customization, GitHub API integration.

**Stack.** Node or Python, no dependencies.

---

## 8. Broken link checker for a site — ●●

**The gist.** A script walks a page, collects links, checks status codes,
and outputs a report.

**Why it's good.** Teaches timeouts, concurrency, network handling — the richest
set of errors per line of code.

**Main scenario.** `check-links https://example.com` → a report listing 4xx/5xx.

**What to cut.** Recursive crawling, caching, HTML reports.

**Stack.** Python + httpx.

---

## 9. Telegram reminder bot — ●●●

**The gist.** The bot accepts "remind me tomorrow at 10 to call", stores it and messages you on time.

**Why it's good.** Real value; teaches external APIs and secrets in production.
Unknown: the token and hosting with a long-running process (Railway/Fly), Vercel
won't do for polling.

**Main scenario.** Send a message → get a confirmation → get the
reminder.

**What to cut.** Recurring reminders, time zones (other than your own), commands.

**Stack.** Python + aiogram, SQLite.

---

## 10. Price comparison by saved URLs — ●●●

**The gist.** A list of product URLs, a script pulls the price by selector, writes history to
CSV, shows the change.

**Why it's good.** The highest learning density: HTML parsing, selectors,
history, errors from changed markup.

**Unknown.** Sites block bots; pick one site, check it with curl before you
start. If it blocks you — work against saved HTML fixtures.

**Main scenario.** Run → for each URL the price and the delta from last time.

**What to cut.** Notifications, a scheduler, anti-bot evasion.

**Stack.** Python + httpx + selectolax (or cheerio in Node).

---

## How to choose in 5 minutes

1. Do you need the result after the course? If yes — take 1, 5 or 7.
2. Want minimum risk and a guaranteed submission — take 2 or 3.
3. Want to practice APIs and deploy — take 4 or 6.

What not to take for a capstone: anything with more than one auth screen, anything that needs a
payment provider, anything that needs a native mobile build. That's not a 126-minute job.
