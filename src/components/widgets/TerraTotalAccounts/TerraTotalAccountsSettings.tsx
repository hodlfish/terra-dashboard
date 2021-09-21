import { useState } from 'react';
import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const GraphFormats = {
    periodic: 'Periodic',
    cumulative: 'Cumulative'
}

export const GraphFilters = {
    total: 'Total',
    active: 'Active'
}

export const defaults = {
    name: 'Total Accounts',
    filter: GraphFilters.total,
    format: GraphFormats.cumulative,
    timeSpan: 30
}

export interface Settings {
    name?: string,
    filter: string,
    format: string,
    timeSpan: number
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
    const {name, filter, format, timeSpan} = Object.assign({...defaults}, props.settings);
    const [_format, _setFormat] = useState<string>(format)

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.filter = form.filter.value;
        newSettings.format = form.format.value;
        newSettings.timeSpan = parseInt(form.timeSpan.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Format</label>
            <select name="format" value={_format} onChange={(e) => _setFormat(e.target.value)}>
                {Object.values(GraphFormats).map(format => 
                    <option key={format} value={format}>{format}</option>
                )}
            </select>
            <label>Filter</label>
            <select name="filter" defaultValue={filter}>
                <option key={'Total'} value={'Total'}>{'Total'}</option>
                {_format === GraphFormats.periodic &&
                    <option key={'Active'} value={'Active'}>{'Active'}</option>
                }
            </select>
            <label>Time Span (Days)</label>
            <input type="number" name="timeSpan" min="0" max="365" defaultValue={timeSpan}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
