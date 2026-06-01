import { format, subDays, startOfWeek, addDays, parseISO } from 'date-fns';
import type { DateString } from '../types';

export function getTodayString(): DateString {
  return format(new Date(), 'yyyy-MM-dd');
}

export function formatDisplayDate(dateStr: DateString): string {
  return format(parseISO(dateStr), 'EEEE, MMMM d');
}

export function formatShortDate(dateStr: DateString): string {
  return format(parseISO(dateStr), 'MMM d');
}

export function formatDayLabel(dateStr: DateString): string {
  return format(parseISO(dateStr), 'EEE');
}

export function getWeekDates(referenceDate?: Date): DateString[] {
  const start = startOfWeek(referenceDate ?? new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) =>
    format(addDays(start, i), 'yyyy-MM-dd')
  );
}

export function getLast30Days(): DateString[] {
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) =>
    format(subDays(today, 29 - i), 'yyyy-MM-dd')
  );
}

export function isToday(dateStr: DateString): boolean {
  return dateStr === getTodayString();
}
