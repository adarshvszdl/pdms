import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export class DateUtil {
  static async today(): Promise<Date> {
    return dayjs().utc().toDate();
  }

  static async dateAfter(days: number): Promise<Date> {
    return dayjs.utc().add(days, "day").toDate();
  }

  static afterMinutes(minutes: number, fromDate?: Date): Date {
    const baseDate = fromDate || dayjs.utc().toDate();
    return dayjs(baseDate).add(minutes, "minute").utc().toDate();
  }

  static async afterHours(hours: number, fromDate?: Date): Promise<Date> {
    const baseDate = fromDate || dayjs.utc().toDate();
    return dayjs(baseDate).add(hours, "hour").utc().toDate();
  }

  static async afterDays(days: number, fromDate?: Date): Promise<Date> {
    const baseDate = fromDate || dayjs.utc().toDate();
    return dayjs(baseDate).add(days, "day").utc().toDate();
  }

  static async afterMonths(months: number, fromDate?: Date): Promise<Date> {
    const baseDate = fromDate || dayjs.utc().toDate();
    return dayjs(baseDate).add(months, "month").utc().toDate();
  }

  static async afterYears(years: number, fromDate?: Date): Promise<Date> {
    const baseDate = fromDate || dayjs.utc().toDate();
    return dayjs(baseDate).add(years, "year").utc().toDate();
  }

  static async isAfter(date: Date): Promise<boolean> {
    return dayjs.utc().isAfter(date);
  }
}
