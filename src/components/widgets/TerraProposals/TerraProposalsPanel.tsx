import { useState, useCallback } from 'react';
import { getTerraProposals, TerraProposalStatus, Proposal } from 'scripts/Terra/Terra';
import Panel, { WidgetProps } from 'components/panels/Panel';
import { Settings, defaults, SettingsPanel } from './TerraProposalsSettings';
import { Pie } from 'react-chartjs-2';
import { defaultPieChartOptions } from '../common';

function TerraProposals(props: WidgetProps) {
    const {name, filter} = Object.assign({...defaults}, props.settings as Settings);
    const [proposals, setProposals] = useState<Proposal[]>([]);

    const fetch = useCallback(async () => {
        const proposals = await getTerraProposals(filter);
        return () => {
            setProposals(proposals);
        }
    }, [filter]);

    const generateDepositData = (proposal: Proposal) => {
        const depositedLuna = parseInt(proposal.deposit.totalDeposit[0].amount) / 1000000;
        const requiredLuna = parseInt(proposal.deposit.minDeposit[0].amount) / 1000000;
        const data = {
            labels: ['Deposited', 'Required'],
            datasets: [
                {
                    data: [depositedLuna, Math.max(requiredLuna - depositedLuna, 0)],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderWidth: 0
                }
            ],
        };
        return data;
    }

    const generateVoteData = (proposal: Proposal) => {
        const labels = ['Yes', 'Abstain', 'No', 'NoWithVeto'];
        const votes = proposal.vote.distribution;
        const data = [votes.Yes, votes.Abstain,votes.No, votes.NoWithVeto];
        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 206, 86)'
                    ],
                    borderWidth: 0
                }
            ]
        };
    }

    const onOpenProposal = (proposal: any) => {
        window.open(`https://station.terra.money/proposal/${proposal.id}`, "_blank");
    }


    const renderProposal = (proposal: Proposal) => {
        let endTime = new Date(proposal.vote.votingEndTime);
        if (proposal.status === TerraProposalStatus.deposit) {
            endTime = new Date(proposal.deposit.depositEndTime);
        }
        const graphData = (proposal.status === TerraProposalStatus.deposit) ? generateDepositData(proposal) : generateVoteData(proposal);
        return (
            <div key={proposal.id} className="proposal" onClick={() => onOpenProposal(proposal)}>
                <div className="proposal-title">#{proposal.id}: {proposal.title}</div>
                <div className="proposal-graph-container">
                    <Pie options={defaultPieChartOptions} data={graphData}/>
                </div>
                <div className="proposal-end-date">Ends {endTime.toLocaleString()}</div>
            </div>
        )
    }

    return (
        <Panel
            title={name}
            svg={'terra'}
            size={'medium'}
            events={props.events}
            fetch={fetch}
            content={
                <div className="proposal-widget">
                    {proposals.length > 0 ?
                        proposals.map(p =>
                            renderProposal(p)
                        )
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

export default TerraProposals;
