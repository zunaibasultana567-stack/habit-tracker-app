# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check then build for production (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Serve the production build locally
```

There is no test suite configured.

## Git workflow

After every task that modifies files:

1. Stage the relevant files: `git add <files>`
2. Commit with a clear message describing what changed and why: `git commit -m "..."`
3. Push immediately: `git push origin master`

Commit messages must describe the change and its purpose, not just "update file". Every change must be pushed so the project is always recoverable from GitHub.

## Architecture

This is a **Habit Tracker** SPA built with React 19 + TypeScript + Vite + Tailwind CSS. All data lives in `localStorage` — there is no backend.

### State management

`HabitContext` (`src/context/`) is the single source of truth. It wraps the app in a React context that holds `AppState` (`habits[]` + `logs[]`) and exposes a `dispatch` function backed by `habitReducer`. State is hydrated from `localStorage` on mount and persisted on every change via `saveState` / `loadState` in `src/utils/storageUtils.ts`.

- `TOGGLE_LOG` adds or flips a `HabitLog` entry for a given `habitId + date`.
- `DELETE_HABIT` also removes all logs for that habit.
- Logs older than 90 days are pruned on load.

### Data model (`src/types/index.ts`)

- `Habit` — id, name, description, colorHex, iconName, createdAt
- `HabitLog` — habitId, date (`"YYYY-MM-DD"`), completed
- `HabitAnalytics` — derived on demand via `getHabitAnalytics()`, never stored

### Pages & routing

Navigation is simple component-swap state in `App.tsx` (`activePage: 'today' | 'analytics'`). No router library.

- `TodayPage` — lists habits with toggle checkboxes, shows a `CompletionRing`
- `AnalyticsPage` — shows per-habit analytics cards (`AnalyticsDashboard`) with a `WeeklyBarChart`, `HeatmapCalendar`, `StreakBadge`, and `CompletionRing`

### Analytics (`src/utils/analyticsUtils.ts`)

Pure functions that derive streak, completion rates, and chart data from `HabitLog[]`. Streak logic: counts consecutive completed days backward from today; if today is not yet completed, starts from yesterday.

### Utilities

- `src/utils/dateUtils.ts` — helpers for today's date string, `getLast30Days()`, `getWeekDates()`
- `src/utils/storageUtils.ts` — `loadState` / `saveState` with 90-day log pruning
- `src/hooks/useLocalStorage.ts` — generic typed localStorage hook
- `src/hooks/useDate.ts` — provides `todayString` and `weekDates` with daily refresh

### UI components

Reusable primitives live in `src/components/ui/` (Button, Input, Textarea, Modal, Badge, EmptyState). Habit-specific components are in `src/components/habits/`; analytics visualizations in `src/components/analytics/`. Icons come from `lucide-react`; charts use `recharts`; date logic uses `date-fns`.

### Dark mode

Toggled by adding/removing the `dark` class on `<html>`. Persisted to `localStorage` under `ht_dark_mode`. Tailwind `dark:` variants handle all theming.

### localStorage keys

Defined in `src/constants/index.ts` under `STORAGE_KEYS`: `ht_habits`, `ht_logs`, `ht_schema_v`, `ht_dark_mode`.
