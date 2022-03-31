import { useState, useCallback } from 'react';
import Panel, { WidgetProps } from 'components/panels/Panel';
import { Settings, defaults, SettingsPanel } from './TerraProposalsSettings';
import { Chart } from 'react-chartjs-2';
import { defaultPieChartOptions } from '../common';
import useTerraLCDClient from 'hooks/useTerraLCDClient';
import { Proposal } from '@terra-money/terra.js';

function TerraProposals(props: WidgetProps) {
    const {name, filter} = Object.assign({...defaults}, props.settings as Settings);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const {MIN_PROPOSAL_DEPOSIT, getProposals} = useTerraLCDClient();

    const refresh = useCallback(async () => {
        const proposals = await getProposals(filter);
        return () => {
            setProposals(proposals);
        }
    }, [filter]);

    const generateDepositData = (proposal: Proposal) => {
        const depositedLunaCoin = proposal.total_deposit.get('uluna');
        const depositedLuna = (depositedLunaCoin) ? depositedLunaCoin.amount.toNumber() / 1000000 : 0;
        const requiredLuna = MIN_PROPOSAL_DEPOSIT / 1000000;
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
        const votes = proposal.final_tally_result;
        const data = [Number(votes.yes), Number(votes.abstain), Number(votes.no), Number(votes.no_with_veto)];
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
        let endTime = new Date(proposal.voting_end_time);
        if (proposal.status === Proposal.Status.PROPOSAL_STATUS_DEPOSIT_PERIOD) {
            endTime = new Date(proposal.deposit_end_time);
        }
        const graphData = (proposal.status === Proposal.Status.PROPOSAL_STATUS_DEPOSIT_PERIOD) ? generateDepositData(proposal) : generateVoteData(proposal);
        return (
            <div key={proposal.id} className="proposal" onClick={() => onOpenProposal(proposal)}>
                <div className="proposal-title">#{proposal.id}: {proposal.content.title}</div>
                <div className="proposal-graph-container">
                    <Chart type="pie" data={graphData} options={defaultPieChartOptions}/>
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
            refresh={refresh}
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
