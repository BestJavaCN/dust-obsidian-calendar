import {WeekEnum} from "../base/enum";
import {DateTime} from "luxon";

export default class DayListOfMonthView {

    private _year: number;
    private _month: number;
    private _totalDaysOfCurrentMonthView: number;
    private _totalWeeks: number;
    private _dayList: DateTime[];

    constructor(year: number, month: number) {
        this._year = year;
        this._month = month;

        let firstDayOfMonth = DateTime.local(year, month);
        let firstDayOfMonthView = firstDayOfMonth.minus({days: firstDayOfMonth.weekday - 1});

        this._totalDaysOfCurrentMonthView = 42;
        this._totalWeeks = 6;

        this._dayList = [];
        for (let i = 0; i < this._totalDaysOfCurrentMonthView; i++) {
            this._dayList.push(firstDayOfMonthView.plus({days: i}));
        }
    }

    get year(): number {
        return this._year;
    }

    get month(): number {
        return this._month;
    }

    get totalDaysOfCurrentMonthView(): number {
        return this._totalDaysOfCurrentMonthView;
    }

    get totalWeeks(): number {
        return this._totalWeeks;
    }

    getDayByIndex(dayIndexInCurrentMonth: number): DateTime {
        return this._dayList[dayIndexInCurrentMonth];
    }

    getDayByWeek(weekIndexInCurrentMonth: number, weekEnum: WeekEnum): DateTime {
        let dayIndex = weekIndexInCurrentMonth * 7 + weekEnum.valueOf() - 1;
        return this._dayList[dayIndex];
    }


}