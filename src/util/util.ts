import {DateTime} from "luxon";
import {HolidayEntry} from "../entity/HolidayEntry";

/**
 * 根据给定的范围 [start, end) 和步长 step 创建一个纯数值数组，注意这个范围是前闭后开区间，步长默认值是 1
 */
export function range(start: number, end: number, step: number = 1): number[] {
    let arr: number[] = [];
    for (let i = start; i < end; i += step) {
        arr.push(i);
    }
    return arr;
}

export interface CustomHolidayResult {
    isRest: boolean;
    isWork: boolean;
}

export function parseCustomHolidayDates(restDaysStr: string, workDaysStr: string): { restDays: Set<string>, workDays: Set<string> } {
    const restDays = new Set<string>();
    const workDays = new Set<string>();

    if (restDaysStr) {
        restDaysStr.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && /^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
                restDays.add(trimmed);
            }
        });
    }

    if (workDaysStr) {
        workDaysStr.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && /^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
                workDays.add(trimmed);
            }
        });
    }

    return { restDays, workDays };
}

export function checkCustomHoliday(year: number, month: number, day: number, restDays: Set<string>, workDays: Set<string>): CustomHolidayResult | null {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    if (restDays.has(dateStr)) {
        return { isRest: true, isWork: false };
    }
    if (workDays.has(dateStr)) {
        return { isRest: false, isWork: true };
    }

    return null;
}

export function expandCustomHolidays(entries: HolidayEntry[]): { restDays: string[], workDays: string[] } {
    const restDays: string[] = [];
    const workDays: string[] = [];
    const seenRest = new Set<string>();
    const seenWork = new Set<string>();

    for (const entry of entries) {
        if (entry.startDate && entry.endDate) {
            let current = DateTime.fromFormat(entry.startDate, "yyyy-MM-dd");
            const end = DateTime.fromFormat(entry.endDate, "yyyy-MM-dd");
            while (current <= end) {
                const dateStr = current.toFormat("yyyy-MM-dd");
                if (!seenRest.has(dateStr)) {
                    restDays.push(dateStr);
                    seenRest.add(dateStr);
                }
                current = current.plus({day: 1});
            }
        }
        if (entry.workDays) {
            for (const wd of entry.workDays) {
                const trimmed = wd.trim();
                if (trimmed && /^\d{4}-\d{2}-\d{2}$/.test(trimmed) && !seenWork.has(trimmed)) {
                    workDays.push(trimmed);
                    seenWork.add(trimmed);
                }
            }
        }
    }

    return { restDays, workDays };
}
