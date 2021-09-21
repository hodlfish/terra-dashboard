import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const MirrorAssetSorts = {
    longAPR: 'Long APR',
    shortAPR: ' Short APR',
    price: 'Price'
}

export const defaults = {
    name: 'Mirror Assets',
    sortBy: MirrorAssetSorts.longAPR
}

export interface Settings {
    name: string,
    sortBy: string
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

const dataSources = [
    sources.mirrorGraphQL
]

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, sortBy} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.sortBy = form.sortBy.value
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Sort By</label>
            <select name="sortBy" defaultValue={sortBy}>
                {Object.values(MirrorAssetSorts).map(value => 
                    <option key={value} value={value}>{value}</option>
                )}
            </select>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
