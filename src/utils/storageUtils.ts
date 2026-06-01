import { subDays, parseISO, isAfter } from 'date-fns';
import type { AppState, Habit, HabitLog } from '../types';
import { STORAGE_KEYS, SCHEMA_VERSION } from '../constants';

const DEFAULT_STATE: AppState = {
  habits: [],
  logs: [],
  schemaVersion: SCHEMA_VERSION,
};

function pruneLogs(logs: HabitLog[]): HabitLog[] {
  const cutoff = subDays(new Date(), 90);
  return logs.filter(log => isAfter(parseISO(log.date), cutoff));
}

export function loadState(): AppState {
  try {
    const habits: Habit[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.HABITS) ?? '[]'
    );
    const rawLogs: HabitLog[] = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.LOGS) ?? '[]'
    );
    const logs = pruneLogs(rawLogs);
    return { habits, logs, schemaVersion: SCHEMA_VERSION };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(state.habits));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(state.logs));
    localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, String(SCHEMA_VERSION));
  } catch {
    // localStorage unavailable (private browsing quota exceeded etc.)
  }
}
