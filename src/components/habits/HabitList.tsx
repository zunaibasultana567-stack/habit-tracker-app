import type { Habit } from '../../types';
import { useHabitContext } from '../../context/HabitContext';
import { HabitCard } from './HabitCard';
import { EmptyState } from '../ui/EmptyState';

interface HabitListProps {
  onAddHabit: () => void;
  onEditHabit: (habit: Habit) => void;
}

export function HabitList({ onAddHabit, onEditHabit }: HabitListProps) {
  const { state, todayString } = useHabitContext();

  const todayCompleted = new Set(
    state.logs
      .filter(l => l.date === todayString && l.completed)
      .map(l => l.habitId)
  );

  if (state.habits.length === 0) {
    return (
      <EmptyState
        message="No habits yet. Create your first habit and start building streaks!"
        ctaLabel="Add your first habit"
        onCta={onAddHabit}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {state.habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isCompleted={todayCompleted.has(habit.id)}
          onEdit={onEditHabit}
        />
      ))}
    </div>
  );
}
