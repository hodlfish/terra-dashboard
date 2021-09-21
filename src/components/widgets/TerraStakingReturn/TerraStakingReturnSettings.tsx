import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const GraphFormats = {
    annualized: 'Annualized',
    daily: 'Daily'
}

export const defaults = {
    name: 'Staking Return',
    format: GraphFormats.annualized,
    timeSpan: 14
}

export interface Settings {
    name?: string,
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
    const {name, format, timeSpan} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
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
            <select name="format" defaultValue={format}>
                {Object.values(GraphFormats).map(format => 
                    <option key={format} value={format}>{format}</option>
                )}
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
