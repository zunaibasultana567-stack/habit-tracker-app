import { useState } from 'react';
import { Pencil, Trash2, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Habit } from '../../types';
import { useHabitContext } from '../../context/HabitContext';
import { StreakBadge } from '../analytics/StreakBadge';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  onEdit: (habit: Habit) => void;
}

export function HabitCard({ habit, isCompleted, onEdit }: HabitCardProps) {
  const { dispatch, getAnalytics, todayString } = useHabitContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const analytics = getAnalytics(habit.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (Icons as any)[habit.iconName] as React.FC<{ size?: number }> | undefined;

  function handleToggle() {
    dispatch({ type: 'TOGGLE_LOG', payload: { habitId: habit.id, date: todayString } });
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_HABIT', payload: { id: habit.id } });
  }

  return (
    <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all">
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          isCompleted
            ? 'border-transparent text-white'
            : 'border-gray-300 dark:border-gray-600 hover:border-brand-400'
        }`}
        style={isCompleted ? { backgroundColor: habit.colorHex } : {}}
      >
        {isCompleted && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: habit.colorHex + '22' }}
      >
        {Icon ? (
          <Icon size={18} />
        ) : (
          <span className="text-xs font-bold" style={{ color: habit.colorHex }}>
            {habit.name[0]}
          </span>
        )}
      </div>

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
          {habit.name}
        </p>
        {habit.description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{habit.description}</p>
        )}
      </div>

      {/* Streak badge */}
      <StreakBadge streak={analytics.currentStreak} colorHex={habit.colorHex} />

      {/* Actions (hover) */}
      {!showConfirm && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(habit)}
            aria-label="Edit habit"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            aria-label="Delete habit"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Delete confirm */}
      {showConfirm && (
        <div className="flex items-center gap-2 text-sm">
          <button onClick={handleDelete} className="text-red-500 font-medium hover:underline">Delete</button>
          <button onClick={() => setShowConfirm(false)} className="text-gray-400 hover:underline">Cancel</button>
        </div>
      )}
    </div>
  );
}
