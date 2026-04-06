# Finance Dashboard UI

A single-page **finance overview** built with **React 19**, **Vite 8**, **Material UI (MUI) v7**, and **Recharts**. It shows income, expenses, net balance, charts, derived insights, and a filterable, sortable transaction table. Data lives in the browser: mock data seeds the app, and changes persist in **localStorage** (no backend).

# Vercel Deployment Link
 
  https://financial-pratik-zorvyn.vercel.app/

---

## Table of contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Getting started](#getting-started)
4. [Project structure](#project-structure)
5. [How the app works (architecture)](#how-the-app-works-architecture)
6. [State, persistence, and roles](#state-persistence-and-roles)
7. [Data model](#data-model)
8. [Finance utilities](#finance-utilities)
9. [UI surface area](#ui-surface-area)
10. [Scripts](#scripts)
11. [Customization ideas](#customization-ideas)

---

## Features

- **Summary cards**: Net balance (income − expenses), total income, total expenses — computed from the **full** transaction list (not filtered).
- **Balance trend chart**: End-of-day **running balance** over time (chronological), using all transactions.
- **Spending by category**: Horizontal bar chart of **expense** totals per category (full dataset).
- **Insights panel**: Text summaries — top spending category, month-over-month expense comparison (when ≥2 months exist), average expense size, and a “savings rate” style quick read.
- **Filters** (sidebar): Search (ID, category, description), category, type (income/expense), status, date range. **Only the transaction table** is filtered; charts and summary intentionally use all data (as noted in the Filters UI).
- **Sortable table**: Click column headers for date, category, type, amount; toggles asc/desc (default date desc).
- **Roles**:
  - **Viewer**: Read-only — no add/edit/delete, no export.
  - **Admin**: Add/edit/delete transactions; export **CSV** or **JSON** of the full list.
- **Theme**: Light/dark toggle; MUI theme (colors, backgrounds) updates with mode.
- **Persistence**: Transactions, role, and color mode saved under `localStorage` key `finance-dashboard-v1`.

---

## Tech stack

| Layer        | Choice |
|-------------|--------|
| Build       | Vite (`@vitejs/plugin-react`) |
| UI          | React 19, React DOM 19 |
| Components  | MUI Material + Emotion, MUI Icons |
| Charts      | Recharts 3 |
| Linting     | ESLint 9 + React plugins |

---

## Getting started

### Prerequisites

- **Node.js** (LTS recommended) with **npm** (or use your preferred package manager consistently).

### Install and run

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

`preview` serves the contents of `dist/` locally for smoke-testing the production bundle.

---

## Project structure

```
├── index.html              # HTML shell, mounts #root
├── vite.config.js          # Vite + React plugin
├── eslint.config.js
├── package.json
├── public/                 # Static assets (e.g. favicon)
└── src/
    ├── main.jsx            # React root: StrictMode + AppProvider + App
    ├── App.jsx             # Theme from context + Dashboard
    ├── index.css           # Global styles, DM Sans import
    ├── pages/
    │   └── Dashboard.jsx   # Page layout: navbar, cards, charts, insights, filters + table
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Filters.jsx
    │   ├── SummaryCards.jsx
    │   ├── ChartsSection.jsx
    │   ├── InsightsPanel.jsx
    │   ├── TransactionTable.jsx
    │   └── TransactionDialog.jsx
    ├── context/
    │   ├── appContext.js   # createContext(null)
    │   ├── AppContext.jsx  # AppProvider: state, derived data, actions
    │   └── useAppContext.js
    ├── data/
    │   └── mockData.js     # Default transactions + CATEGORY_OPTIONS
    └── utils/
        └── finance.js      # filter, sort, summary, charts, insights helpers
```

---

## How the app works (architecture)

### Boot sequence

1. **`main.jsx`** renders the tree:

   `StrictMode` → **`AppProvider`** (from `AppContext.jsx`) → **`App`**.

2. **`AppProvider`** initializes state from **localStorage** if valid; otherwise it uses **`mockData.js`** for transactions and defaults for role (`viewer`) and `colorMode` (`light`).

3. **`App.jsx`** reads `colorMode` from context and builds an MUI **`createTheme`** (palette, typography **DM Sans**, shape). It wraps **`Dashboard`** with **`ThemeProvider`** and **`CssBaseline`**.

4. **`Dashboard.jsx`** composes all major sections in a **`Container`** with responsive **`Grid`** (MUI Grid v2 `size` API): sticky filter column on `md+`, table on the right.

### Data flow

- **Single source of truth**: `transactions` array in `AppProvider`.
- **Derived values** (memoized with `useMemo`):
  - `filtered` → `filterTransactions(transactions, filters)`
  - `visibleTransactions` → `sortTransactions(filtered, sortBy, sortDir)`
  - `summary` → `computeSummary(transactions)`
  - `trend` → `balanceTrendByDay(transactions)`
  - `categorySpend` → `spendingByCategory(transactions)`
  - `insights` → `buildInsights(transactions)`
  - `categories` → `uniqueCategories(transactions)` for filter dropdown
- **Mutations** (admin): `addTransaction`, `updateTransaction`, `deleteTransaction` — all update `transactions` immutably.
- **Persistence**: A `useEffect` writes `{ transactions, role, colorMode }` to localStorage whenever those change. Quota errors are swallowed.

### Context API

- **`appContext.js`**: exports `AppContext`.
- **`useAppContext.js`**: hook that throws if used outside `AppProvider`.
- **`AppContext.jsx`**: implements provider and the full `value` object passed to consumers.

---

## State, persistence, and roles

### localStorage

- **Key**: `finance-dashboard-v1`
- **Payload**: JSON with (at least) `transactions`, `role`, `colorMode`
- **Not persisted**: Filter fields, sort column, or sort direction — they reset on full page reload.

### Viewer vs admin

| Capability        | Viewer | Admin |
|------------------|--------|-------|
| View dashboard   | Yes    | Yes   |
| Add/edit/delete  | No     | Yes   |
| Export CSV/JSON  | No     | Yes (navbar download menu) |

`isAdmin` is `role === "admin"`.

---

## Data model

Each **transaction** is a plain object:

| Field         | Type   | Notes |
|---------------|--------|--------|
| `id`          | string | Unique; auto `TXN{timestamp}` on add if missing |
| `amount`      | number | Positive; income vs expense determined by `type` |
| `category`    | string | Must align with add/edit options from `CATEGORY_OPTIONS` in UI |
| `type`        | string | `"income"` or `"expense"` |
| `date`        | string | ISO date `YYYY-MM-DD` (string compare used for sorting/filtering) |
| `status`      | string | `"success"`, `"pending"`, or `"failed"` |
| `description` | string | Optional |

**Mock data** (`src/data/mockData.js`) includes multiple months, mixed categories, and varied statuses for realistic charts and insights.

---

## Finance utilities

All in **`src/utils/finance.js`**:

- **`filterTransactions`**: Case-insensitive search on `id`, `category`, `description`; exact match filters for category, type, status (or `all`); inclusive date range `dateFrom` / `dateTo` (string comparison on `YYYY-MM-DD`).
- **`sortTransactions`**: Copies array; sorts by `date`, `amount`, `category`, or `type` with `asc`/`desc`.
- **`computeSummary`**: Sums income and expenses separately; `balance = income - expenses`.
- **`balanceTrendByDay`**: Sorts by date, walks transactions in order, maintains running balance; **last transaction of a given date** wins for that day’s end balance in the map.
- **`spendingByCategory`**: Sums amounts where `type === "expense"` per category.
- **`buildInsights`**: Top expense category; compares **last two calendar months** by `YYYY-MM` for expense totals; average expense amount; hands `summary` through for savings-rate style copy.
- **`uniqueCategories`**: Sorted distinct categories from current transactions.

---

## UI surface area

### Navbar (`Navbar.jsx`)

- Title, **light/dark** toggle, **role** select.
- **Export** icon + menu (admin only): download `transactions.csv` or `transactions.json`.

### Summary cards (`SummaryCards.jsx`)

- Three outlined papers with left accent border and icons (wallet, trending up/down).
- Currency formatted with `Intl.NumberFormat` (USD, 0 fraction digits on cards).

### Charts (`ChartsSection.jsx`)

- **LineChart**: `trend` — `date` vs `balance`.
- **BarChart** (vertical layout): `categorySpend` sorted descending.
- Empty states when there is no data.

### Insights (`InsightsPanel.jsx`)

- Renders three insight blocks from `buildInsights` + transaction count; chip labels data as mock-derived.

### Filters (`Filters.jsx`)

- Updates `filters` in context; **Reset filters** restores defaults.
- Category options are **dynamic** from `uniqueCategories(transactions)`.

### Transaction table (`TransactionTable.jsx`)

- Header shows count: “N shown” vs total when filtered.
- Empty states: no data at all vs no rows matching filters (with **Clear filters**).
- Sortable columns; status chips colored by mapping (`success` / `pending` / `failed`).
- Admin: **Add**, row **Edit** / **Delete**; delete uses a confirmation dialog.

### Transaction dialog (`TransactionDialog.jsx`)

- Add vs edit; form fields: amount, category (from `CATEGORY_OPTIONS`), type, date, status, description.
- Save validates amount is finite and **> 0**; trims description (empty → `undefined`).
- When dialog opens, inner form uses a **`key`** so add vs edit resets state correctly.

---

## Scripts

| Command        | Purpose |
|----------------|---------|
| `npm run dev`  | Start Vite dev server (HMR) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint on the project |

---

## Customization ideas

- **Backend**: Replace mock + localStorage with API calls; keep the same context shape for minimal UI churn.
- **Currency**: Today formatting assumes **USD** in components; centralize locale/currency in context or env.
- **Auth**: Wire `role` to real auth instead of a navbar dropdown.
- **Filters on charts**: Optionally pipe `filtered` into summary/charts if product needs “what-if” views.

---
