import { Proposal } from "@terra-money/terra.js";
import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const defaults = {
    name: 'Terra Proposals (Voting)',
    filter: Proposal.Status.PROPOSAL_STATUS_VOTING_PERIOD,
}

const ProposalStatusMap = {
    'Deposit': Proposal.Status.PROPOSAL_STATUS_DEPOSIT_PERIOD,
    'Voting': Proposal.Status.PROPOSAL_STATUS_VOTING_PERIOD,
    'Passed': Proposal.Status.PROPOSAL_STATUS_PASSED,
    'Rejected': Proposal.Status.PROPOSAL_STATUS_REJECTED,
    'Failed': Proposal.Status.PROPOSAL_STATUS_FAILED
}

export interface Settings {
    name?: string,
    filter?: number
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
        newSettings.filter = Number(form.filter.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Proposal Status</label>
            <select name="filter" defaultValue={filter.toString()}>
                {Object.entries(ProposalStatusMap).map(([name, value]) => 
                    <option key={name} value={value}>{name}</option>
                )}
            </select>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
