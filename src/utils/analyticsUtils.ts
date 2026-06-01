import { subDays, format, parseISO, differenceInDays } from 'date-fns';
import type { HabitLog, HabitAnalytics, DateString, HabitId } from '../types';
import { getTodayString, getLast30Days, getWeekDates } from './dateUtils';

function getCompletedDates(logs: HabitLog[], habitId: HabitId): Set<DateString> {
  return new Set(
    logs
      .filter(l => l.habitId === habitId && l.completed)
      .map(l => l.date)
  );
}

export function computeStreak(logs: HabitLog[], habitId: HabitId): number {
  const completed = getCompletedDates(logs, habitId);
  const today = getTodayString();
  const todayDate = parseISO(today);

  let streak = 0;
  // Allow streak to start from today or yesterday (user hasn't checked in yet today)
  const startOffset = completed.has(today) ? 0 : 1;

  for (let i = startOffset; i < 400; i++) {
    const d = format(subDays(todayDate, i), 'yyyy-MM-dd');
    if (completed.has(d)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function computeLongestStreak(logs: HabitLog[], habitId: HabitId): number {
  const completed = getCompletedDates(logs, habitId);
  if (completed.size === 0) return 0;

  const sorted = Array.from(completed).sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = parseISO(sorted[i - 1]);
    const curr = parseISO(sorted[i]);
    if (differenceInDays(curr, prev) === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

export function computeWeeklyCompletionRate(logs: HabitLog[], habitId: HabitId): number {
  const weekDates = getWeekDates();
  const completed = getCompletedDates(logs, habitId);
  const count = weekDates.filter(d => completed.has(d)).length;
  return Math.round((count / 7) * 100);
}

export function computeMonthlyCompletionRate(logs: HabitLog[], habitId: HabitId): number {
  const last30 = getLast30Days();
  const completed = getCompletedDates(logs, habitId);
  const count = last30.filter(d => completed.has(d)).length;
  return Math.round((count / 30) * 100);
}

export function computeTodayOverallRate(logs: HabitLog[], habitIds: HabitId[]): number {
  if (habitIds.length === 0) return 0;
  const today = getTodayString();
  const completedToday = new Set(
    logs.filter(l => l.date === today && l.completed).map(l => l.habitId)
  );
  return Math.round((completedToday.size / habitIds.length) * 100);
}

export function getHabitAnalytics(logs: HabitLog[], habitId: HabitId): HabitAnalytics {
  const today = getTodayString();
  const completed = getCompletedDates(logs, habitId);

  return {
    habitId,
    currentStreak: computeStreak(logs, habitId),
    longestStreak: computeLongestStreak(logs, habitId),
    completedToday: completed.has(today),
    completionRateWeek: computeWeeklyCompletionRate(logs, habitId),
    completionRateMonth: computeMonthlyCompletionRate(logs, habitId),
  };
}

export function getWeeklyChartData(logs: HabitLog[], habitIds: HabitId[]) {
  const weekDates = getWeekDates();
  return weekDates.map(date => {
    const completedCount = habitIds.filter(id => {
      return logs.some(l => l.habitId === id && l.date === date && l.completed);
    }).length;
    return { date, completedCount, total: habitIds.length };
  });
}

export function getHeatmapData(logs: HabitLog[], habitIds: HabitId[]) {
  const last30 = getLast30Days();
  return last30.map(date => {
    const completedCount = habitIds.filter(id =>
      logs.some(l => l.habitId === id && l.date === date && l.completed)
    ).length;
    const intensity = habitIds.length === 0 ? 0 :
      Math.ceil((completedCount / habitIds.length) * 4);
    return { date, completedCount, intensity };
  });
}
