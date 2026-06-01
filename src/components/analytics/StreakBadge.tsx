import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  colorHex?: string;
}

export function StreakBadge({ streak, colorHex = '#6366f1' }: StreakBadgeProps) {
  if (streak === 0) return null;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: colorHex }}
    >
      <Flame size={11} />
      {streak}
    </span>
  );
}
