import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";
import { LunaPriceIntervals } from 'scripts/Terra/Terra';

import { MAX_REFRESH_RATE, MIN_REFRESH_RATE } from "../common";

export const defaults = {
    name: 'Luna Price',
    interval: LunaPriceIntervals.oneDay,
    refreshRate: 30,
    decimals: 2
}

export interface Settings {
    name?: string,
    interval: string,
    refreshRate?: number,
    decimals?: number
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

const dataSources = [
    sources.terraFCD
]

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, interval, refreshRate, decimals} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.interval = form.interval.value;
        newSettings.refreshRate = parseInt(form.refreshRate.value);
        newSettings.decimals = parseInt(form.decimals.value)
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Interval</label>
            <select name="interval" defaultValue={interval}>
                {Object.values(LunaPriceIntervals).map(option => 
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
            <label>Refresh Rate (seconds)</label>
            <input type="number" name="refreshRate" min={MIN_REFRESH_RATE} max={MAX_REFRESH_RATE} defaultValue={refreshRate}/>
            <label>Decimals</label>
            <input required type="number" name="decimals" min="0" max="10" defaultValue={decimals}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
