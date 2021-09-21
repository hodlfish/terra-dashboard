import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Anchor Price',
    decimals: 2
}

export interface Settings {
    name?: string,
    decimals?: number
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel: any
}

const dataSources = [
    sources.anchorAPI, sources.anchorMantle
]

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, decimals} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.decimals = parseInt(form.decimals.value)
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Decimals</label>
            <input required type="number" name="decimals" min="0" max="10" defaultValue={decimals}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
