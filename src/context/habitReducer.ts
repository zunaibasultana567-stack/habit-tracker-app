import type { AppState, HabitAction } from '../types';

export function habitReducer(state: AppState, action: HabitAction): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'ADD_HABIT':
      return { ...state, habits: [...state.habits, action.payload] };

    case 'EDIT_HABIT':
      return {
        ...state,
        habits: state.habits.map(h =>
          h.id === action.payload.id ? action.payload : h
        ),
      };

    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(h => h.id !== action.payload.id),
        logs: state.logs.filter(l => l.habitId !== action.payload.id),
      };

    case 'TOGGLE_LOG': {
      const { habitId, date } = action.payload;
      const existing = state.logs.find(
        l => l.habitId === habitId && l.date === date
      );
      if (existing) {
        return {
          ...state,
          logs: state.logs.map(l =>
            l.habitId === habitId && l.date === date
              ? { ...l, completed: !l.completed }
              : l
          ),
        };
      }
      return {
        ...state,
        logs: [...state.logs, { habitId, date, completed: true }],
      };
    }

    default:
      return state;
  }
}
