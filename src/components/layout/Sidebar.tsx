import { CheckSquare, BarChart2, Zap } from 'lucide-react';
import type { Page } from '../../types';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; icon: React.ReactNode; label: string }[] = [
  { page: 'today',     icon: <CheckSquare size={20} />, label: 'Today' },
  { page: 'analytics', icon: <BarChart2 size={20} />,   label: 'Analytics' },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-gray-200 dark:border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
          <Zap className="text-white" size={16} />
        </div>
        <span className="font-bold text-gray-900 dark:text-white tracking-tight">HabitFlow</span>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map(({ page, icon, label }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
              activePage === page
                ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className={activePage === page ? 'text-brand-600 dark:text-brand-400' : ''}>
              {icon}
            </span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
