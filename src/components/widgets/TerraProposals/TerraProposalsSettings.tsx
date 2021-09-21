import { TerraProposalStatus } from "scripts/Terra/Terra";
import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Terra Proposals (Voting)',
    filter: TerraProposalStatus.voting,
}

export interface Settings {
    name?: string,
    filter?: string
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

const dataSources = [
    sources.terraLCD
]

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, filter} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.filter = form.filter.value;
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Proposal Status</label>
            <select name="filter" defaultValue={filter.toString()}>
                {Object.values(TerraProposalStatus).map(status => 
                    <option key={status} value={status}>{status}</option>
                )}
            </select>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
