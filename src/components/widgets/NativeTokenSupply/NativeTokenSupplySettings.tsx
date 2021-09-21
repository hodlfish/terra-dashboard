import { nativeTokens } from "scripts/Terra/TokensAndContracts";
import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Native Token Supply',
    denom: 'uusd',
    decimals: 2
}

export interface Settings {
    name?: string,
    denom: string,
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
    const { name, denom, decimals } = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.denom = form.denom.value || 'uusd';
        newSettings.decimals = parseInt(form.decimals.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Name</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Top Denom</label>
            <select name="denom" defaultValue={denom}>
                {Array.from(nativeTokens.keys()).map((key) =>  
                    <option key={key} value={key}>{key}</option>
                )}
            </select>
            <label>Decimals</label>
            <input required type="number" name="decimals" min="0" max="6" defaultValue={decimals}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
