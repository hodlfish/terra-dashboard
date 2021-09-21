import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Recent Transactions'
}

export interface Settings {
    name?: string,
    addr: string
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
    const {name, addr} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.addr = form.addr.value;
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Wallet Address</label>
            <input required type="text" name="addr" defaultValue={addr}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
