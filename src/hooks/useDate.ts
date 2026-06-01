import { useMemo } from 'react';
import { getTodayString, getWeekDates, formatDisplayDate } from '../utils/dateUtils';

export function useDate() {
  return useMemo(() => {
    const todayString = getTodayString();
    return {
      todayString,
      weekDates: getWeekDates(),
      displayDate: formatDisplayDate(todayString),
    };
  }, []);
}
