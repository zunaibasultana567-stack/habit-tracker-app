import { ClipboardList } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  message?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({
  message = 'No habits yet. Add one to get started!',
  ctaLabel,
  onCta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
        <ClipboardList className="text-brand-400" size={32} />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">{message}</p>
      {ctaLabel && onCta && (
        <Button onClick={onCta}>{ctaLabel}</Button>
      )}
    </div>
  );
}
