import { useState, useCallback } from 'react';
import Panel, { WidgetProps } from 'components/panels/Panel';
import { getProposals } from 'scripts/Terra/Anchor';
import { defaults, Settings, SettingsPanel } from './AnchorProposalsSettings';
import { Pie } from 'react-chartjs-2';
import { defaultPieChartOptions } from '../common';

function AnchorProposalsPanel(props: WidgetProps) {
    const {name, filter, limit} = Object.assign({...defaults}, props.settings as Settings);
    const [proposals, setProposals] = useState<any[]>([]);

    const fetch = useCallback(async () => {
        const proposals = await getProposals(filter, limit);
        return () => {
            setProposals(proposals);
        }
    }, [filter, limit]);

    const onOpenProposal = (proposal: any) => {
        window.open(`https://app.anchorprotocol.com/poll/${proposal.id}`, "_blank");
    }

    const generateVoteData = (proposal: any) => {
        return {
            labels: ['Yes', 'Abstain', 'No'],
            datasets: [
                {
                    data: [
                        parseInt(proposal.yes_votes) / 1000000,
                        parseInt(proposal.abstain_votes) / 1000000,
                        parseInt(proposal.no_votes) / 1000000
                    ],
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)'
                    ],
                    borderWidth: 0
                }
            ]
        };
    }

    const renderProposal = (proposal: any) => {
        return (
            <div key={proposal.id} className="proposal" onClick={() => onOpenProposal(proposal)}>
                <div className="proposal-title">#{proposal.id}: {proposal.title}</div>
                <div className="proposal-graph-container">
                    <Pie data={generateVoteData(proposal)} options={defaultPieChartOptions}/>
                </div>
                <div className="proposal-end-date">End Height: {proposal.end_height}</div>
            </div>
        )
    }

    return (
        <Panel
            title={name}
            size={'medium'}
            svg={'anchor'}
            events={props.events}
            fetch={fetch}
            content={
                <div className="proposal-widget">
                    {proposals.length > 0 ?
                        proposals.map(p => renderProposal(p))
                        :
                        <div className="no-proposals">No Proposals</div>
                    }
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default AnchorProposalsPanel;
