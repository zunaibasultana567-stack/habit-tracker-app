import * as Icons from 'lucide-react';
import { useHabitContext } from '../../context/HabitContext';
import { computeTodayOverallRate, computeStreak, computeWeeklyCompletionRate } from '../../utils/analyticsUtils';
import { CompletionRing } from './CompletionRing';
import { StreakBadge } from './StreakBadge';
import { WeeklyBarChart } from './WeeklyBarChart';
import { HeatmapCalendar } from './HeatmapCalendar';
import { EmptyState } from '../ui/EmptyState';

export function AnalyticsDashboard() {
  const { state } = useHabitContext();
  const habitIds = state.habits.map(h => h.id);

  const todayRate = computeTodayOverallRate(state.logs, habitIds);
  const avgWeeklyRate = habitIds.length === 0 ? 0 :
    Math.round(
      habitIds.reduce((sum, id) => {
        const weekLogs = state.logs.filter(l => l.habitId === id && l.completed);
        return sum + (weekLogs.length / 7) * 100;
      }, 0) / habitIds.length
    );

  if (state.habits.length === 0) {
    return (
      <EmptyState message="Add habits on the Today page to start seeing your analytics." />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Total habits</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{state.habits.length}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Today</span>
          <span className="text-2xl font-bold text-brand-600">{todayRate}%</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Avg. weekly</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{avgWeeklyRate}%</span>
        </div>
      </div>

      {/* Weekly bar chart */}
      <WeeklyBarChart />

      {/* Heatmap */}
      <HeatmapCalendar />

      {/* Per-habit breakdown */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Per-habit progress</h3>
        <div className="flex flex-col gap-4">
          {state.habits.map(habit => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Icon = (Icons as any)[habit.iconName] as React.FC<{ size?: number }> | undefined;
            const streak = computeStreak(state.logs, habit.id);
            const weekRate = computeWeeklyCompletionRate(state.logs, habit.id);

            return (
              <div key={habit.id} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: habit.colorHex + '22' }}
                >
                  {Icon ? <Icon size={18} /> : <span style={{ color: habit.colorHex }} className="font-bold text-xs">{habit.name[0]}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{habit.name}</span>
                    <StreakBadge streak={streak} colorHex={habit.colorHex} />
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${weekRate}%`, backgroundColor: habit.colorHex }}
                    />
                  </div>
                </div>
                <CompletionRing percentage={weekRate} size={40} strokeWidth={4} colorHex={habit.colorHex} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
