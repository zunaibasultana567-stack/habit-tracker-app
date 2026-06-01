import { AnalyticsDashboard } from '../components/analytics/AnalyticsDashboard';

export function AnalyticsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h1>
      <AnalyticsDashboard />
    </div>
  );
}
