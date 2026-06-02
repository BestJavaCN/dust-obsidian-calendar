import {useState} from "react";
import DustCalendarPlugin from "../../main";
import {HolidayEntry} from "../../entity/HolidayEntry";

interface HolidayEntryView {
    uid: string;
    name: string;
    startDate: string;
    endDate: string;
    workDays: string[];
}

let uidCounter = 0;
function generateUid(): string {
    return `he-${++uidCounter}`;
}

const cardStyle: React.CSSProperties = {
    border: "1px solid var(--background-modifier-border)",
    borderRadius: "6px",
    padding: "8px 12px",
    marginBottom: "6px",
    background: "var(--background-secondary)",
};

const rowBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
};

const row1Style: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px",
    gap: "12px",
};

const dateGroupStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
};

const nameInputStyle: React.CSSProperties = {
    background: "var(--background-modifier-form-field)",
    border: "1px solid var(--background-modifier-border)",
    color: "var(--text-normal)",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "13px",
    fontFamily: "inherit",
    width: "120px",
    fontWeight: "bold",
    height: "28px",
};

const dateInputStyle: React.CSSProperties = {
    background: "var(--background-modifier-form-field)",
    border: "1px solid var(--background-modifier-border)",
    color: "var(--text-normal)",
    padding: "4px 8px",
    paddingLeft: "28px",
    borderRadius: "4px",
    fontSize: "13px",
    fontFamily: "inherit",
    width: "120px",
    height: "28px",
};

const labelStyle: React.CSSProperties = {
    color: "var(--text-muted)",
    fontSize: "16px",
    whiteSpace: "nowrap",
};

const btnBase: React.CSSProperties = {
    border: "1px solid var(--background-modifier-border)",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
};

const delBtnStyle: React.CSSProperties = {
    ...btnBase,
    background: "var(--background-modifier-form-field)",
    color: "var(--text-muted)",
    padding: "2px 6px",
    lineHeight: "1.4",
};

const addWorkDayBtnStyle: React.CSSProperties = {
    ...btnBase,
    padding: "2px 8px",
};

const addEntryBtnStyle: React.CSSProperties = {
    ...btnBase,
    background: "var(--interactive-accent)",
    color: "var(--text-on-accent)",
    padding: "6px 16px",
    fontSize: "14px",
    marginTop: "4px",
};

export default function CustomHolidaySetting({plugin}: { plugin: DustCalendarPlugin }) {

    const [entries, setEntries] = useState<HolidayEntryView[]>(() => {
        const saved = plugin.calendarViewController.getCustomHolidays();
        return saved.map(e => ({...e, uid: generateUid()}));
    });

    const persist = (updated: HolidayEntryView[]) => {
        const toSave: HolidayEntry[] = updated.map(({uid, ...rest}) => rest);
        plugin.calendarViewController.setCustomHolidays(toSave);
        setEntries(updated);
    };

    const addEntry = () => {
        const next: HolidayEntryView = {
            uid: generateUid(),
            name: "",
            startDate: "",
            endDate: "",
            workDays: [],
        };
        persist([...entries, next]);
    };

    const removeEntry = (uid: string) => {
        persist(entries.filter(e => e.uid !== uid));
    };

    const updateField = (uid: string, field: "name" | "startDate" | "endDate", value: string) => {
        persist(entries.map(e => e.uid === uid ? {...e, [field]: value} : e));
    };

    const addWorkDay = (uid: string) => {
        persist(entries.map(e => e.uid === uid ? {...e, workDays: [...e.workDays, ""]} : e));
    };

    const updateWorkDay = (uid: string, index: number, value: string) => {
        persist(entries.map(e => {
            if (e.uid !== uid) return e;
            const wd = [...e.workDays];
            wd[index] = value;
            return {...e, workDays: wd};
        }));
    };

    const removeWorkDay = (uid: string, index: number) => {
        persist(entries.map(e => {
            if (e.uid !== uid) return e;
            return {...e, workDays: e.workDays.filter((_, i) => i !== index)};
        }));
    };

    return <>
        <div className="setting-item-info">
            <div className="setting-item-name">自定义节假日</div>
            <div className="setting-item-description">
                在此设置本年的节假日和调休安排。每个假期可设置名称、起止日期，以及需要调休上班的工作日。
            </div>
        </div>
        <div className="setting-item-control" style={{flexDirection: "column", alignItems: "stretch", width: "100%"}}>
            {entries.length === 0 && (
                <div style={{color: "var(--text-muted)", fontSize: "13px", padding: "8px 4px"}}>
                    暂未添加假期，点击下方按钮添加。
                </div>
            )}
            {entries.map((entry) => (
                <div key={entry.uid} style={cardStyle}>
                    <div style={row1Style}>
                        <input
                            type="text"
                            placeholder="假期名称"
                            value={entry.name}
                            onChange={e => updateField(entry.uid, "name", e.target.value)}
                            style={nameInputStyle}
                        />
                        <div style={dateGroupStyle}>
                            <span style={labelStyle}>开始:</span>
                            <input
                                type="date"
                                value={entry.startDate}
                                onChange={e => updateField(entry.uid, "startDate", e.target.value)}
                                style={{...dateInputStyle, marginRight: "16px"}}
                            />
                            <span style={labelStyle}>结束:</span>
                            <input
                                type="date"
                                value={entry.endDate}
                                onChange={e => updateField(entry.uid, "endDate", e.target.value)}
                                style={dateInputStyle}
                            />
                        </div>
                        <button
                            onClick={() => removeEntry(entry.uid)}
                            style={{...delBtnStyle}}
                            title="删除此假期"
                        >
                            删除
                        </button>
                    </div>
    
                    <div style={rowBase}>
                        <span style={labelStyle}>调休工作日:</span>
                        {entry.workDays.map((wd, wi) => (
                            <span key={wi} style={{display: "inline-flex", alignItems: "center", gap: "2px", marginRight: "8px"}}>
                                <input
                                    type="date"
                                    value={wd}
                                    onChange={e => updateWorkDay(entry.uid, wi, e.target.value)}
                                    style={dateInputStyle}  
                                />
                                <span
                                    onClick={() => removeWorkDay(entry.uid, wi)}
                                    title="移除"
                                    style={{...labelStyle, cursor: "pointer"}}
                                >
                                    ✕
                                </span>
                            </span>
                        ))}
                        <button
                            onClick={() => addWorkDay(entry.uid)}
                            style={addWorkDayBtnStyle}
                        >
                            ＋
                        </button>
                    </div>
                </div>
            ))}
            <button onClick={addEntry} style={addEntryBtnStyle}>
                ＋ 添加假期
            </button>
        </div>
    </>
}
