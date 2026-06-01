interface CompletionRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  colorHex?: string;
  label?: string;
}

export function CompletionRing({
  percentage,
  size = 80,
  strokeWidth = 8,
  colorHex = '#4f46e5',
  label,
}: CompletionRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;
  const fontSize = Math.round(size * 0.2);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" style={{ position: 'absolute', inset: 0 }}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-100 dark:text-gray-800"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colorHex}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <span
          className="font-bold text-gray-900 dark:text-gray-100 relative z-10"
          style={{ fontSize }}
        >
          {percentage}%
        </span>
      </div>
      {label && <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>}
    </div>
  );
}
