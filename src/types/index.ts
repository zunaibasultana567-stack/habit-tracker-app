export type HabitId = string;
export type DateString = string; // "YYYY-MM-DD"

export interface Habit {
  id: HabitId;
  name: string;
  description?: string;
  frequency: 'daily';
  colorHex: string;
  iconName: string;
  createdAt: DateString;
}

export interface HabitLog {
  habitId: HabitId;
  date: DateString;
  completed: boolean;
}

export interface HabitAnalytics {
  habitId: HabitId;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  completionRateWeek: number;
  completionRateMonth: number;
}

export interface AppState {
  habits: Habit[];
  logs: HabitLog[];
  schemaVersion: number;
}

export type HabitAction =
  | { type: 'ADD_HABIT';    payload: Habit }
  | { type: 'EDIT_HABIT';   payload: Habit }
  | { type: 'DELETE_HABIT'; payload: { id: HabitId } }
  | { type: 'TOGGLE_LOG';   payload: { habitId: HabitId; date: DateString } }
  | { type: 'HYDRATE';      payload: AppState };

export type Page = 'today' | 'analytics';
