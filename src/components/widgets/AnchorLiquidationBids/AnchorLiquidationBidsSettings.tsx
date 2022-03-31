import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const CollateralTypes = {
    bLuna: 'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp',
    bEth: 'terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun',
    sAVAX: 'terra1z3e2e4jpk4n0xzzwlkgcfvc95pc5ldq0xcny58'
}

export const defaults = {
    name: 'bLUNA Bids',
    collateral: CollateralTypes.bLuna
}

export interface Settings {
    name?: string,
    collateral: string
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
    const {name, collateral } = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.collateral = form.collateral.value;
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Collateral</label>
            <select name="collateral" defaultValue={collateral}>
                {Object.entries(CollateralTypes).map(([key, value]) => 
                    <option key={key} value={value}>{key}</option>
                )}
            </select>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
