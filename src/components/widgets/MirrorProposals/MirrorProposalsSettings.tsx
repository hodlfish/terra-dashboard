import { MirrorProposalStatus } from "scripts/Terra/Mirror";
import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Mirror Proposals (Voting)',
    filter: MirrorProposalStatus.voting,
    limit: 30
}

export interface Settings {
    name?: string,
    filter?: string,
    limit?: number
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
    const {name, filter, limit} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.filter = form.filter.value;
        newSettings.limit = parseInt(form.limit.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Proposal Status</label>
            <select name="filter" defaultValue={filter.toString()}>
                {Object.values(MirrorProposalStatus).map(status => 
                    <option key={status} value={status}>{status}</option>
                )}
            </select>
            <label>Limit</label>
            <input type="number" name="limit" min="10" max="100" defaultValue={limit}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
