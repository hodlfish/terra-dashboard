import axios from 'axios';
import { sources } from 'scripts/Settings';

export const TerraProposalStatus = {
    passed: 'Passed',
    rejected: 'Rejected',
    voting: 'Voting',
    deposit: 'Deposit',
    failed: 'Failed'
}

interface ProposalDeposit {
    depositEndTime: string,
    totalDeposit: any[],
    minDeposit: any[]
}

interface ProposalProducer {
    accountAddress: string
}

interface ProposalVoteGroups {
    Abstain: string,
    No: string,
    NoWithVeto: string,
    Yes: string
}

interface ProposalVote {
    count: ProposalVoteGroups,
    distribution: ProposalVoteGroups,
    stakedLuna: number,
    total: number
    voters: any,
    votingEndTime: string
}

export interface Proposal {
    id: string,
    deposit: ProposalDeposit
    description: string,
    proposer: ProposalProducer
    status: string
    submitTime: string
    title: string
    type: string
    vote: ProposalVote
}

interface ProposalsResponse {
    maxDepositPeriod: string,
    minDeposit: any[],
    proposals: Proposal[],
    votingPeriod: string
}

export function getTerraProposals(status: string | undefined = undefined): Promise<Proposal[]> {
    const query: {[k: string]: any} = {};
    if (status) {
        query.status = status;
    }
    return axios.get(`${sources.terraFCD.dataUrl}/v1/gov/proposals`, {params: query}).then(response => {
        return (response.data as ProposalsResponse).proposals.sort((a: any, b: any) => (parseInt(b.id) - parseInt(a.id)));
    });
}

export interface LunaPricePoint {
    denom: string,
    price: number,
    datetime: number
}

export interface LunaPriceResponse {
    lastPrice: number,
    oneDayVariation: string,
    oneDayVariationRate: string,
    prices: LunaPricePoint[]
}

export const LunaPriceIntervals = {
    oneMinute: '1m',
    fiveMinutes: '5m',
    fifteenMinutes: '15m',
    thirtyMinutes: '30m',
    oneHour: '1h',
    oneDay: '1d'
}

export function getLunaPrice(interval: string = LunaPriceIntervals.oneDay): Promise<any> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/market/price?denom=uusd&interval=${interval}`).then(response => {
        return response.data as LunaPriceResponse;
    });
}

interface TransactionAttribute {
    key: string,
    value: string
}

interface TransactionEvent {
    type: string,
    attributes: TransactionAttribute[]
}

interface TransactionLog {
    log: any,
    events: TransactionEvent[]
}

export interface TransactionData {
    id: number,
    chainId: string,
    tx: any,
    timestamp: string,
    txhash: string,
    logs: TransactionLog[],
    memo: string
}

export interface TransactionsResponse {
    next?: number,
    limit: number,
    txs: TransactionData[]
}

export function getTransactions(address: string, limit = 100, offset = 0): Promise<TransactionsResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/txs?offset=${offset}&limit=${limit}&account=${address}`).then(response => {
        return response.data as TransactionsResponse;
    });
}

export interface WalletNativeToken {
    denom: string,
    balance: number
}

export interface WalletContractToken {
    contract: string,
    balance: number
}

export interface WalletContents {
    native: WalletNativeToken[],
    cw20: WalletContractToken[]
}

export async function getWalletContents(wallet: string, cw20TokenAddresses: string[]): Promise<WalletContents> {
    // Native wallet contents
    const nativeTokens = await axios.get(`${sources.terraFCD.dataUrl}/v1/bank/${wallet}`);
    const nativeBalances = [];
    for(const item in nativeTokens.data.balance) {
        nativeBalances.push({
            denom: nativeTokens.data.balance[item].denom,
            balance: nativeTokens.data.balance[item].available
        })
    }

    // CW20 wallet contents
    let query = '{';
    cw20TokenAddresses.forEach(contract => {
        query += `
            ${contract}: WasmContractsContractAddressStore(
                ContractAddress: "${contract}",
                QueryMsg: "{\\"balance\\":{\\"address\\":\\"${wallet}\\"}}"
            ) {
                Height
                Result
                __typename
            }
        `
    });
    query += '}'
    const body = {
        variables: {},
        query: query
    }

    const cw20Tokens = await axios.post(`${sources.terraMantle.dataUrl}/`, body);

    const cw20Balances = []
    for(const item in cw20Tokens.data.data) {
        const cw20TokenData = cw20Tokens.data.data[item];
        if (cw20TokenData) {
            cw20Balances.push({
                contract: item,
                balance: parseInt(JSON.parse(cw20Tokens.data.data[item].Result).balance)
            })
        }
    }

    return {
        native: nativeBalances,
        cw20: cw20Balances
    } as WalletContents;
}

export interface TransactionVolumeDataPoint {
    datetime: string,
    txVolume: string
}

export interface DenomTransactionVolume {
    denom: string,
    data: TransactionVolumeDataPoint[]
}

export interface TerraTransactionVolumeResponse {
    periodic: DenomTransactionVolume[],
    cumulative: DenomTransactionVolume[]
}

export function getTerraTransactionVolume(): Promise<TerraTransactionVolumeResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/dashboard/tx_volume`).then(response => {
        return response.data as TerraTransactionVolumeResponse;
    });
}

export interface TerraStakingReturnDataPoint {
    datetime: number,
    dailyReturn: string,
    annualizedReturn: string
}

export function getTerraStakingReturn(): Promise<TerraStakingReturnDataPoint[]> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/dashboard/staking_return`).then(response => {
        return response.data as TerraStakingReturnDataPoint[];
    });
}

export interface TerraBlockRewardsDataPoint {
    datetime: string,
    blockReward: string
}

export interface TerraBlockRewardsResponse {
    periodic: TerraBlockRewardsDataPoint[],
    cumulative: TerraBlockRewardsDataPoint[]
}

export function getTerraBlockRewards(): Promise<TerraBlockRewardsResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/dashboard/block_rewards`).then(response => {
        return response.data as TerraBlockRewardsResponse;
    });
}

export interface TerraAccountDataPoint {
    datetime: string,
    value: number
}

export interface TerraTotalAccountsResponse {
    total: number,
    periodic: TerraAccountDataPoint[],
    cumulative: TerraAccountDataPoint[]
}

export function getTotalTerraAccounts(): Promise<TerraTotalAccountsResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/dashboard/registered_accounts`).then(response => {
        return response.data as TerraTotalAccountsResponse;
    });
}

export interface TerraActiveAccountsResponse {
    total: number,
    periodic: TerraAccountDataPoint[]
}

export function getTerraActiveAccounts(): Promise<TerraActiveAccountsResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/dashboard/active_accounts`).then(response => {
        return response.data as TerraActiveAccountsResponse;
    });
}

export interface TerraAccounts {
    total: number,
    totalActive: number,
    periodicTotal: TerraAccountDataPoint[],
    cumulativeTotal: TerraAccountDataPoint[],
    periodicActive: TerraAccountDataPoint[]
}

export async function getTerraAccounts(): Promise<TerraAccounts> {
    const totalAccounts = await getTotalTerraAccounts();
    const activeAccounts = await getTerraActiveAccounts();
    return {
        total: totalAccounts.total,
        totalActive: activeAccounts.total,
        periodicTotal: totalAccounts.periodic,
        cumulativeTotal: totalAccounts.cumulative,
        periodicActive: activeAccounts.periodic
    }
}

export interface ExchangeRate {
    denom: string,
    amount: string
}

export interface ExchangeRatesResponse {
    height: string,
    result: ExchangeRate[]
}

export function getExchangeRates(): Promise<ExchangeRatesResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/oracle/denoms/exchange_rates`).then(response => {
        return response.data as ExchangeRatesResponse;
    });
}

export interface TerraStationDashboardStakingPool {
    stakingRatio: string,
    bondedTokens: string,
    notBondedTokens: string
}

export interface TerraStationDashboardResponse {
    prices: any,
    taxRate: string,
    taxCaps: any[],
    issuances: any,
    stakingPool: TerraStationDashboardStakingPool,
    communityPool: any
}

export function getTerraStationDashboard(): Promise<TerraStationDashboardResponse> {
    return axios.get(`${sources.terraFCD.dataUrl}/v1/dashboard`).then(response => {
        return response.data as TerraStationDashboardResponse;
    });
}

export interface ValidatorCommissionRates {
    rate: string,
    max_rate: string,
    max_change_rate: string
}

export interface ValidatorCommission {
    commission_rates: ValidatorCommissionRates,
    update_time: string
}

export interface ValidatorDescription {
    moniker: string,
    identity: string,
    website: string,
    security_contract: string,
    details: string
}

export interface Validator {
    operator_address: string,
    consensus_pubkey: string,
    jailed: boolean,
    status: number,
    tokens: string,
    delegator_shares: string,
    description: ValidatorDescription,
    unbonding_height: string,
    unbonding_time: string,
    commission: ValidatorCommission,
    min_self_delegation: string
}

export function getWalletValidators(address: string): Promise<Validator[]> {
    return axios.get(`${sources.terraFCD.dataUrl}/staking/delegators/${address}/validators`).then(response => {
        return response.data.result as Validator[];
    });
}

export interface ValidatorDelegation {
    delegator_address: string,
    validator_address: string,
    shares: string;
}

export interface WalletDelegation {
    delegation: ValidatorDelegation,
    balance: any
}

export function getWalletDelegations(address: string): Promise<WalletDelegation[]> {
    return axios.get(`${sources.terraFCD.dataUrl}/staking/delegators/${address}/delegations`).then(response => {
        return response.data.result as WalletDelegation[];
    });
}

export interface ValidatorDelegation {
    validator: Validator,
    delegation: WalletDelegation
}

export async function getWalletStakingBalances(address: string): Promise<ValidatorDelegation[]> {
    const validators = await getWalletValidators(address);
    const delegations = await getWalletDelegations(address);
    return validators.map(v => {
        return {
            validator: v,
            delegation: delegations.find(d => d.delegation.validator_address === v.operator_address)
        } as ValidatorDelegation;
    })
}
