import { LCDClient, Proposal, Tally } from "@terra-money/terra.js";

const lcdClient = new LCDClient({chainID: 'columbus-5', URL: 'https://lcd.terra.dev'});

const MIN_PROPOSAL_DEPOSIT = 50000000; // 50 LUNA

const useTerraLCDClient = () => {
    function getProposals(status = Proposal.Status.PROPOSAL_STATUS_VOTING_PERIOD): Promise<Proposal[]> {
        // Verify valid filter option.
        if (!Object.values(Proposal.Status).includes(status)) {
            console.log('Invalid proposal status: falling back to "voting".');
            status = Proposal.Status.PROPOSAL_STATUS_VOTING_PERIOD;
        }

        const params = {
            proposal_status: status,
            'pagination.limit': '999'
        };

        return lcdClient.gov.proposals(params).then(([proposals,]) => {
            proposals.sort((a: any, b: any) => (parseInt(b.id) - parseInt(a.id)));
            // If in voting, tally needs to be retrieved
            if (status === Proposal.Status.PROPOSAL_STATUS_VOTING_PERIOD) {
                const tallyPromises = proposals.map(proposal => getProposalTally(proposal.id));
                return Promise.all(tallyPromises).then(tallies => {
                    for(let i = 0; i < tallies.length; i++) {
                        proposals[i].final_tally_result = tallies[i];
                    }
                    return proposals;
                })
            } else {
                return proposals;
            }
        });
    }

    function getProposalTally(proposalId: number): Promise<Tally> {
        return lcdClient.gov.tally(proposalId);
    }

    return {
        MIN_PROPOSAL_DEPOSIT,
        getProposals,
        getProposalTally,
        lcdClient
    };
};
  
export default useTerraLCDClient;
