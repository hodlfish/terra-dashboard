import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Anchor Collateral',
    timeSpan: 30
}

export interface Settings {
    name?: string,
    timeSpan: number
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

const dataSources = [
    sources.anchorAPI
]

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, timeSpan} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.timeSpan = parseInt(form.timeSpan.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Time Span (Days)</label>
            <input type="number" name="timeSpan" min="0" max="365" defaultValue={timeSpan}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
