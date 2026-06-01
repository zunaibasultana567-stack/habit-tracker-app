import { Moon, Sun, Zap } from 'lucide-react';
import { useDate } from '../../hooks/useDate';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Header({ darkMode, onToggleDark }: HeaderProps) {
  const { displayDate } = useDate();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2 md:hidden">
        <Zap className="text-brand-600" size={20} />
        <span className="font-bold text-gray-900 dark:text-white">HabitFlow</span>
      </div>
      <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">{displayDate}</p>
      <button
        onClick={onToggleDark}
        aria-label="Toggle dark mode"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
