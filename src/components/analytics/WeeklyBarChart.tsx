import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useHabitContext } from '../../context/HabitContext';
import { getWeeklyChartData } from '../../utils/analyticsUtils';
import { formatDayLabel } from '../../utils/dateUtils';

export function WeeklyBarChart() {
  const { state } = useHabitContext();
  const habitIds = state.habits.map(h => h.id);
  const data = getWeeklyChartData(state.logs, habitIds).map(d => ({
    ...d,
    label: formatDayLabel(d.date),
  }));

  if (state.habits.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">This week</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={28}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            cursor={{ fill: 'rgba(99,102,241,0.08)' }}
            contentStyle={{
              background: 'var(--tt-bg, #fff)',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: 12,
            }}
            formatter={(value) => [`${value} completed`, 'Habits']}
            labelFormatter={(label) => String(label)}
          />
          <Bar dataKey="completedCount" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill="#6366f1" fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
