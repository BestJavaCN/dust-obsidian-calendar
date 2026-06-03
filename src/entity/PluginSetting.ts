import {CalendarHeaderLayout, FontSizeChangeMode, QuarterNameMode, TemplatePlugin, TodoAnnotationMode} from "../base/enum";
import {HolidayEntry} from "./HolidayEntry";

export default class PluginSetting {

    shouldDisplayLunarInfo: boolean;                        // 是否显示农历信息
    shouldDisplayHolidayInfo: boolean;                      // 是否显示调休信息
    customHolidayRestDays: string;                          // 自定义节假日（休息日），每行一个日期，格式 YYYY-MM-DD（旧格式，保留兼容）
    customHolidayWorkDays: string;                          // 自定义补班日（调休上班），每行一个日期，格式 YYYY-MM-DD（旧格式，保留兼容）
    customHolidays: HolidayEntry[];                         // 自定义节假日结构化数据（新格式，优先级更高）

    fontSizeChangeMode: FontSizeChangeMode;                 // 字体大小调整方式
    immutableFontSizeFactor: number;                        // 固定字体的大小

    quarterNameMode: QuarterNameMode;                       // 季度命名方式
    calendarHeaderLayout: CalendarHeaderLayout;             // 日历头部排布方式

    wordsPerDot: number;                                    // 多少字一个点
    dotUpperLimit: number;                                  // 最多几个点
    todoAnnotationMode: TodoAnnotationMode;                 // 待办呈现方式：不展示、颜色标注、圆孔标注

    shouldConfirmBeforeCreatingNote: boolean;               // 创建新笔记之前是否需要确认
    templatePlugin: TemplatePlugin;                         // 模板插件

    dailyNoteOption: boolean;                               // 每日笔记开关
    dailyNotePattern: string;                               // 每日笔记文件命名规则
    dailyTemplateFilename: string;                          // 每日笔记模板文件名称

    weeklyNoteOption: boolean;                              // 每周笔记开关
    weeklyNotePattern: string;                              // 每周笔记文件命名规则
    weeklyTemplateFilename: string;                         // 每周笔记模板文件名称

    monthlyNoteOption: boolean;                             // 每月笔记开关
    monthlyNotePattern: string;                             // 每月笔记文件命名规则
    monthlyTemplateFilename: string;                        // 每月笔记模板文件名称

    quarterlyNoteOption: boolean;                           // 季度笔记开关
    quarterlyNotePattern: string;                           // 季度笔记文件命名规则
    quarterlyTemplateFilename: string;                      // 季度笔记模板文件名称

    yearlyNoteOption: boolean;                              // 年度笔记开关
    yearlyNotePattern: string;                              // 年度笔记文件命名规则
    yearlyTemplateFilename: string;                         // 年度笔记模板文件名称

    constructor() {

        this.shouldDisplayLunarInfo = true;
        this.shouldDisplayHolidayInfo = true;
        this.customHolidayRestDays = "";
        this.customHolidayWorkDays = "";
        this.customHolidays = [];

        this.fontSizeChangeMode = FontSizeChangeMode.IMMUTABLE;
        this.immutableFontSizeFactor = 1;

        this.quarterNameMode = QuarterNameMode.NUMBER;
        this.calendarHeaderLayout = CalendarHeaderLayout.DOUBLE_ROW;

        this.wordsPerDot = 200;
        this.dotUpperLimit = 3;
        this.todoAnnotationMode = TodoAnnotationMode.HOLE;

        this.shouldConfirmBeforeCreatingNote = true;
        this.templatePlugin = TemplatePlugin.NONE;

        this.dailyNoteOption = false;
        this.dailyNotePattern = "";
        this.dailyTemplateFilename = "";

        this.weeklyNoteOption = false;
        this.weeklyNotePattern = "";
        this.weeklyTemplateFilename = "";

        this.monthlyNoteOption = false;
        this.monthlyNotePattern = "";
        this.monthlyTemplateFilename = "";

        this.quarterlyNoteOption = false;
        this.quarterlyNotePattern = "";
        this.quarterlyTemplateFilename = "";

        this.yearlyNoteOption = false;
        this.yearlyNotePattern = "";
        this.yearlyTemplateFilename = "";
    }

}
