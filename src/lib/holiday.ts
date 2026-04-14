import holidaySource from "../../config/holidayAPI.json";

export interface HolidayItem {
  Name: string;
  StartDate: string;
  EndDate: string;
  Duration: number;
  CompDays: string[];
  URL: string;
  Memo: string;
}

interface HolidayConfig {
  Name: string;
  Version: string;
  Generated: string;
  Timezone: string;
  Author: string;
  URL: string;
  Years: Record<string, HolidayItem[]>;
}

export type DayStatus = "放假" | "上班";

const holidayConfig = holidaySource as HolidayConfig;

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isDateInRange(target: Date, start: string, end: string): boolean {
  const normalizedTarget = normalizeDate(target).getTime();
  const normalizedStart = parseDateString(start).getTime();
  const normalizedEnd = parseDateString(end).getTime();
  return normalizedTarget >= normalizedStart && normalizedTarget <= normalizedEnd;
}

export function getYearHolidays(year: number): HolidayItem[] {
  return holidayConfig.Years[String(year)] ?? [];
}

export function getMonthHolidays(year: number, month: number): HolidayItem[] {
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);

  return getYearHolidays(year).filter((holiday) => {
    const holidayStart = parseDateString(holiday.StartDate);
    const holidayEnd = parseDateString(holiday.EndDate);
    return holidayEnd >= monthStart && holidayStart <= monthEnd;
  });
}

export function getDayStatus(date: Date): {
  status: DayStatus;
  reason: string;
  holiday?: HolidayItem;
} {
  const holidays = getYearHolidays(date.getFullYear());
  const currentDateString = toDateString(date);

  // 规则 1：如果在节假日放假期间，则为放假
  for (const holiday of holidays) {
    if (isDateInRange(date, holiday.StartDate, holiday.EndDate)) {
      return {
        status: "放假",
        reason: `${holiday.Name}假期`,
        holiday,
      };
    }
  }

  // 规则 2：如果在调休（CompDays）中，则为上班
  for (const holiday of holidays) {
    if (holiday.CompDays.includes(currentDateString)) {
      return {
        status: "上班",
        reason: `${holiday.Name}调休`,
        holiday,
      };
    }
  }

  // 规则 3：其他情况下双休日放假，周一到周五上班
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return {
      status: "放假",
      reason: "周末",
    };
  }

  return {
    status: "上班",
    reason: "工作日",
  };
}

export function formatDateCN(dateString: string): string {
  const date = parseDateString(dateString);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
