import { CheckSquare, BarChart2 } from 'lucide-react';
import type { Page } from '../../types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDark: () => void;
  children: React.ReactNode;
}

const mobileNavItems: { page: Page; icon: React.ReactNode; label: string }[] = [
  { page: 'today',     icon: <CheckSquare size={22} />, label: 'Today' },
  { page: 'analytics', icon: <BarChart2 size={22} />,   label: 'Analytics' },
];

export function AppShell({ activePage, onNavigate, darkMode, onToggleDark, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <div className="flex flex-col flex-1 min-h-screen">
        <Header darkMode={darkMode} onToggleDark={onToggleDark} />
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex z-40">
          {mobileNavItems.map(({ page, icon, label }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                activePage === page
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
