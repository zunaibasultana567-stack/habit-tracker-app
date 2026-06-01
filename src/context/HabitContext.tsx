import React, { createContext, useContext, useReducer, useEffect, useMemo, useRef, useCallback } from 'react';
import type { AppState, HabitAction, HabitAnalytics, HabitId, DateString } from '../types';
import { habitReducer } from './habitReducer';
import { loadState, saveState } from '../utils/storageUtils';
import { getHabitAnalytics } from '../utils/analyticsUtils';
import { useDate } from '../hooks/useDate';

const INITIAL_STATE: AppState = { habits: [], logs: [], schemaVersion: 1 };

interface HabitContextValue {
  state: AppState;
  dispatch: React.Dispatch<HabitAction>;
  getAnalytics: (habitId: HabitId) => HabitAnalytics;
  todayString: DateString;
  weekDates: DateString[];
}

const HabitContext = createContext<HabitContextValue | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(habitReducer, INITIAL_STATE);
  const hydrated = useRef(false);
  const { todayString, weekDates } = useDate();

  // Hydrate from localStorage on mount
  useEffect(() => {
    const loaded = loadState();
    dispatch({ type: 'HYDRATE', payload: loaded });
    hydrated.current = true;
  }, []);

  // Persist state to localStorage after hydration
  useEffect(() => {
    if (hydrated.current) {
      saveState(state);
    }
  }, [state]);

  const getAnalytics = useCallback(
    (habitId: HabitId): HabitAnalytics => getHabitAnalytics(state.logs, habitId),
    [state.logs]
  );

  const value = useMemo<HabitContextValue>(
    () => ({ state, dispatch, getAnalytics, todayString, weekDates }),
    [state, dispatch, getAnalytics, todayString, weekDates]
  );

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

export function useHabitContext(): HabitContextValue {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabitContext must be used within HabitProvider');
  return ctx;
}
