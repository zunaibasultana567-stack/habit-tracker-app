import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Habit } from '../types';
import { useHabitContext } from '../context/HabitContext';
import { HabitList } from '../components/habits/HabitList';
import { HabitFormModal } from '../components/habits/HabitFormModal';
import { CompletionRing } from '../components/analytics/CompletionRing';
import { computeTodayOverallRate } from '../utils/analyticsUtils';
import { Button } from '../components/ui/Button';

export function TodayPage() {
  const { state, todayString } = useHabitContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const totalRate = computeTodayOverallRate(state.logs, state.habits.map(h => h.id));
  const completedCount = state.habits.filter(h =>
    state.logs.some(l => l.habitId === h.id && l.date === todayString && l.completed)
  ).length;

  function openEdit(habit: Habit) {
    setEditingHabit(habit);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingHabit(undefined);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Summary bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Today's Habits</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {state.habits.length === 0
              ? 'No habits tracked yet'
              : `${completedCount} of ${state.habits.length} completed`}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {state.habits.length > 0 && (
            <CompletionRing percentage={totalRate} size={72} strokeWidth={7} label="Today" />
          )}
          <Button onClick={() => setModalOpen(true)} size="sm">
            <Plus size={15} />
            Add habit
          </Button>
        </div>
      </div>

      <HabitList onAddHabit={() => setModalOpen(true)} onEditHabit={openEdit} />

      <HabitFormModal
        open={modalOpen}
        onClose={handleClose}
        habitToEdit={editingHabit}
      />
    </div>
  );
}
