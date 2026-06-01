interface BadgeProps {
  label: string;
  colorHex?: string;
}

export function Badge({ label, colorHex }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: colorHex ?? '#6366f1' }}
    >
      {label}
    </span>
  );
}
