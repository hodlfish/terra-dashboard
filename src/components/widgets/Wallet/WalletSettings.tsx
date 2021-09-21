import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Wallet',
    hideLow: true,
    decimals: 6
}

export interface Settings {
    name?: string,
    addr: string,
    hideLow?: boolean,
    decimals?: number
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

const dataSources = [
    sources.terraFCD, sources.terraMantle
]

export function SettingsPanel(props: SettingsPanelProps) {
    const { name, addr, hideLow, decimals } = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.addr = form.addr.value;
        newSettings.hideLow = form.hideLow.checked;
        newSettings.decimals = parseInt(form.decimals.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Name</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Wallet Address</label>
            <input required type="text" name="addr" defaultValue={addr}/>
            <label>Hide Low Amounts</label>
            <input type="checkbox" name="hideLow" defaultChecked={hideLow}/>
            <label>Decimals</label>
            <input required type="number" name="decimals" min="0" max="6" defaultValue={decimals}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
