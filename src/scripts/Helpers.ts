export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function reduceNumber(value: number, decimals = 6) {
    if (value >= 1e3) {
        const units = ["k", "M", "B", "T"];
    
        const order = Math.floor(Math.log(value) / Math.log(1000));
    
        const unitname = units[(order - 1)];
        const num = (value / 1000 ** order).toFixed(decimals);
    
        return num + unitname;
    }
    return value.toFixed(decimals);
}

export function formatNumber(value: number, fromMicro = true, decimals = 6, reduce = false) {
    if (fromMicro) {
        value = value / 1000000;
    }
    if(reduce) {
        return reduceNumber(value, decimals);
    } else {
        const strValue = value.toFixed(decimals);
        const splitDecimal = strValue.split('.');
        let formatted = splitDecimal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (splitDecimal.length > 1) {
            formatted += `.${splitDecimal[1]}`
        }
        return formatted;
    }
}

export function getStyleColor(variable: string) {
    return getComputedStyle(
        document.getElementById("app-component") || document.documentElement
    ).getPropertyValue(`--${variable}`);
}

export function pad(num: number, size: number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

// Formats denote required granularity of timestamp
export enum TimestampFormats {
    hoursMinutes, hours, monthDay
}

export function formatTimestamp(timestamp: any, format: TimestampFormats = TimestampFormats.hours) {
    const d =  new Date(timestamp);
    if (format === TimestampFormats.hoursMinutes) {
        return `${(d.getHours() + 11) % 12 + 1}: ${pad(d.getMinutes(), 2)} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
    } else if (format === TimestampFormats.hours) {
        return `${(d.getHours() + 11) % 12 + 1} ${d.getHours() >= 12 ? 'PM' : 'AM'}`;
    } else if ( format === TimestampFormats.monthDay) {
        return `${monthNames[d.getMonth()].slice(0, 3)} ${d.getDate()}`
    } else {
        return d.toLocaleTimeString();
    }
}

export function generateId(prefix ?: string) {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
    return prefix ? `${prefix}-${id}` : id;
}
