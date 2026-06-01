export const STORAGE_KEYS = {
  HABITS: 'ht_habits',
  LOGS: 'ht_logs',
  SCHEMA_VERSION: 'ht_schema_v',
  DARK_MODE: 'ht_dark_mode',
} as const;

export const SCHEMA_VERSION = 1;

export const COLOR_OPTIONS = [
  { label: 'Indigo',  hex: '#6366f1' },
  { label: 'Purple',  hex: '#a855f7' },
  { label: 'Pink',    hex: '#ec4899' },
  { label: 'Rose',    hex: '#f43f5e' },
  { label: 'Orange',  hex: '#f97316' },
  { label: 'Amber',   hex: '#f59e0b' },
  { label: 'Emerald', hex: '#10b981' },
  { label: 'Teal',    hex: '#14b8a6' },
  { label: 'Sky',     hex: '#0ea5e9' },
  { label: 'Blue',    hex: '#3b82f6' },
  { label: 'Slate',   hex: '#64748b' },
  { label: 'Stone',   hex: '#78716c' },
] as const;

export const ICON_OPTIONS = [
  'Dumbbell', 'Running', 'Book', 'Brain', 'Coffee', 'Music',
  'Droplets', 'Apple', 'Bike', 'Heart', 'Moon', 'Sun',
  'Pencil', 'Code2', 'Leaf', 'Star',
] as const;

export const HEATMAP_INTENSITY_CLASSES = [
  'bg-gray-100 dark:bg-gray-800',
  'bg-indigo-200 dark:bg-indigo-900',
  'bg-indigo-300 dark:bg-indigo-700',
  'bg-indigo-400 dark:bg-indigo-500',
  'bg-indigo-600 dark:bg-indigo-400',
];
