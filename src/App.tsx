import { useState, useEffect } from 'react';
import type { Page } from './types';
import { HabitProvider } from './context/HabitContext';
import { AppShell } from './components/layout/AppShell';
import { TodayPage } from './pages/TodayPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { STORAGE_KEYS } from './constants';

function App() {
  const [activePage, setActivePage] = useState<Page>('today');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  return (
    <HabitProvider>
      <AppShell
        activePage={activePage}
        onNavigate={setActivePage}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      >
        {activePage === 'today' ? <TodayPage /> : <AnalyticsPage />}
      </AppShell>
    </HabitProvider>
  );
}

export default App;
