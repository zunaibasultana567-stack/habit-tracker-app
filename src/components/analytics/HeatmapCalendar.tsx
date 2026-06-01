import { useHabitContext } from '../../context/HabitContext';
import { getHeatmapData } from '../../utils/analyticsUtils';
import { formatShortDate } from '../../utils/dateUtils';
import { HEATMAP_INTENSITY_CLASSES } from '../../constants';

export function HeatmapCalendar() {
  const { state } = useHabitContext();
  const habitIds = state.habits.map(h => h.id);
  const data = getHeatmapData(state.logs, habitIds);

  if (state.habits.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Last 30 days</h3>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
        {data.map(({ date, completedCount, intensity }) => (
          <div
            key={date}
            title={`${formatShortDate(date)}: ${completedCount}/${habitIds.length} completed`}
            className={`aspect-square rounded-md transition-colors ${HEATMAP_INTENSITY_CLASSES[intensity]}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-xs text-gray-400">Less</span>
        {HEATMAP_INTENSITY_CLASSES.map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
        ))}
        <span className="text-xs text-gray-400">More</span>
      </div>
    </div>
  );
}
