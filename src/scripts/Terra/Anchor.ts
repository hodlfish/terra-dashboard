import axios from 'axios';
import { gql } from '@apollo/client';
import { sources } from 'scripts/Settings';

const anchorGovContract: string = 'terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5';

export async function getLastSyncedHeight() {
    const query = gql`
        query {
            LastSyncedHeight
        }
    `;
    const body = {
        variables: {},
        query: (query.loc && query.loc.source.body)
    }
    const lastSyncedHeightData = await axios.post(`${sources.anchorMantle.dataUrl}/?last-synced-height`, body);
    return lastSyncedHeightData.data.data.LastSyncedHeight;
}

export async function getANCPrice() {
    const query = gql`
        {
            ancPrice: WasmContractsContractAddressStore(
                ContractAddress: "terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3"
                QueryMsg: "{\\"pool\\":{}}"
            ) {
                Result
            }
        }
    `;
    const body = {
        variables: {},
        query: (query.loc && query.loc.source.body)
    }
    const anchorPriceData = await axios.post(`${sources.anchorMantle.dataUrl}/?anc--price`, body);
    const assets = JSON.parse(anchorPriceData.data.data.ancPrice.Result).assets;
    return parseFloat(assets[1].amount) / parseFloat(assets[0].amount);
}

export async function getAUSTPrice(height: number) {
    const query = gql`
        {
            moneyMarketEpochState: WasmContractsContractAddressStore(
                ContractAddress: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s"
                QueryMsg: "{\\"epoch_state\\":{\\"block_height\\":${height}}}"
            ) {
                Result
            }
            overseerEpochState: WasmContractsContractAddressStore(
                ContractAddress: "terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8"
                QueryMsg: "{\\"epoch_state\\":{}}"
            ) {
                Result
            }
        }
    `
    const body = {
        variables: {},
        query: (query.loc && query.loc.source.body)
    }
    const aUSTPriceData = await axios.post(`${sources.anchorMantle.dataUrl}/?earn--epoch-states`, body);
    const moneyMarket = JSON.parse(aUSTPriceData.data.data.moneyMarketEpochState.Result);
    return moneyMarket['exchange_rate'];
}

export interface ANCHistoricalDataPoint {
    anc_price: string,
    govern_total_share: string,
    anc_circulating_supply: string,
    investor_team_anc_holding:string,
    shuttle_anc_holding: string,
    airdrop_anc_holding: string,
    timestamp: number,
    gov_share_index: string,
    govern_total_deposit: string,
    staking_contract_lp_balance: string,
    govern_anc_holding: string,
    height:number,
    pool_anc_amount: string,
    pool_ust_amount: string,
    distributor_anc_holding: string,
    community_anc_holding: string,
    lp_total_supply: string
}

export async function getANCHistoricalPrices(days: number = 30): Promise<ANCHistoricalDataPoint[]> {
    const data = (await axios.get(`${sources.anchorAPI.dataUrl}/api/v1/anc/1d`)).data as ANCHistoricalDataPoint[];
    return data.slice(0, days).reverse();
}

export const AnchorProposalStatus = {
    passed: 'passed',
    rejected: 'rejected',
    voting: 'in_progress',
    executed: 'executed'
}

export function getProposals(filter: string | undefined = undefined, limit: number | undefined = undefined, start_after: number | undefined = undefined): Promise<any[]> {
    var query: {[k: string]: any} = {};
    query.polls = {}
    if (filter !== undefined) {
        query.polls.filter = filter;
    }
    if (start_after !== undefined) {
        query.polls.start_after = start_after;
    }
    if (limit !== undefined) {
        query.polls.limit = limit;
    }
    const encodedQuery = encodeURI(JSON.stringify(query));
    return axios.get(`${sources.terraLCD.dataUrl}/wasm/contracts/${anchorGovContract}/store?query_msg=${encodedQuery}`).then(data => {
        return data.data.result.polls as Promise<any[]>;
    });
}

export interface AnchorDepositDataPoint {
    deposit: string,
    timestamp: number
}

export interface AnchorTotalDepositors {
    last_updated: number,
    holders: number,
    height: number,
    timestamp: number
}

export interface AnchorHistoricalDepositsResponse {
    total_ust_deposits: AnchorDepositDataPoint[],
    total_depositors: AnchorTotalDepositors
}

export function getHistoricalDeposits(): Promise<AnchorHistoricalDepositsResponse> {
    return axios.get(`${sources.anchorAPI.dataUrl}/api/v1/deposit/1d`).then(response => {
        return response.data as AnchorHistoricalDepositsResponse;
    });
}

export interface AnchorBorrowDataPoint {
    total_borrowed: string,
    timestamp: number
}

export function getHistoricalBorrows(): Promise<AnchorBorrowDataPoint[]> {
    return axios.get(`${sources.anchorAPI.dataUrl}/api/v1/borrow/1d`).then(response => {
        return response.data as AnchorBorrowDataPoint[];
    });
}

export interface AnchorCollateralDataPointCollateral {
    symbol: string,
    collateral: string,
    price: string
}

export interface AnchorCollateralDataPoint {
    timestamp: string,
    total_value: string,
    collaterals: AnchorCollateralDataPointCollateral[]
}

export function getHistoricalCollaterals(): Promise<AnchorCollateralDataPoint[]> {
    return axios.get(`${sources.anchorAPI.dataUrl}/api/v1/collaterals/1d`).then(response => {
        return response.data as AnchorCollateralDataPoint[];
    });
}

interface AnchorAPYs {
    distributionAPY: number,
    governanceAPY: number,
    lpRewards: number
}

export async function getAPYs(): Promise<AnchorAPYs> {
    const query = gql`
        query {
            borrowerDistributionAPYs: AnchorBorrowerDistributionAPYs(
                Order: DESC
                Limit: 1
            ) {
                Height
                Timestamp
                DistributionAPY
            }
            govRewards: AnchorGovRewardRecords(Order: DESC, Limit: 1) {
                CurrentAPY
                Timestamp
                Height
            }
            lpRewards: AnchorLPRewards(Order: DESC, Limit: 1) {
                Height
                Timestamp
                APY
            }
        }
    `;
    const body = {
        query: (query.loc && query.loc.source.body),
        variables: {}
    }
    const response = (await axios.post(`${sources.anchorMantle.dataUrl}/?borrow--apy`, body)).data.data;
    return {
        distributionAPY: response.borrowerDistributionAPYs[0].DistributionAPY,
        governanceAPY: response.govRewards[0].CurrentAPY,
        lpRewards: response.lpRewards[0].APY
    };
}

interface AnchorRates {
    borrowAPR: number,
    depositAPY: number
}

const blocksPerYear = 4656810;

export async function getMarketStableCoin(): Promise<AnchorRates> {
    const query = gql`
        {
            borrowRate: WasmContractsContractAddressStore(
                ContractAddress: "terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n"
                QueryMsg: "{\\"borrow_rate\\":{\\"market_balance\\":\\"637978000190978\\",\\"total_reserves\\":\\"0.127014529524242008\\",\\"total_liabilities\\":\\"841525269253983.627811243232436343\\"}}"
            ) {
                Result
            }
            epochState: WasmContractsContractAddressStore(
                ContractAddress: "terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8"
                QueryMsg: "{\\"epoch_state\\":{}}"
            ) {
                Result
            }
        }
    `;
    const body = {
        query: (query.loc && query.loc.source.body),
        variables: {}
    }
    const {borrowRate, epochState} = (await axios.post(`${sources.anchorMantle.dataUrl}/?market--stable-coin`, body)).data.data;
    const bRate = parseFloat(JSON.parse(borrowRate.Result).rate);
    const dRate = parseFloat(JSON.parse(epochState.Result).deposit_rate);
    return {
        borrowAPR: bRate * blocksPerYear,
        depositAPY: dRate * blocksPerYear
    }
}

const marketContract = 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s';

interface MarketState {
    marketBalance: number,
    totalLiabilities: number,
    totalReserves: number
}

export async function getBorrowMarketState(market: string = marketContract): Promise<MarketState> {
    const query = gql`
        query ($marketContract: String!) {
            marketBalances: BankBalancesAddress(Address: $marketContract) {
                Result {
                    Denom
                    Amount
                }
            }
            marketState: WasmContractsContractAddressStore(
                ContractAddress: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s"
                QueryMsg: "{\\"state\\":{}}"
            ) {
                Result
            }
        }
    `;
    const body = {
        query: (query.loc && query.loc.source.body),
        variables: {marketContract: market}
    }
    const {marketBalances, marketState} = (await axios.post(`${sources.anchorMantle.dataUrl}/?borrow--market`, body)).data.data;
    const marketBalancesResult = marketBalances.Result;
    const marketStateResult = JSON.parse(marketState.Result);
    return {
        marketBalance: parseInt(marketBalancesResult.find((d: any) => d.Denom === 'uusd').Amount),
        totalLiabilities: parseFloat(marketStateResult.total_liabilities),
        totalReserves: parseFloat(marketStateResult.total_reserves)
    } as MarketState;
}

export async function getBorrowMarket(marketBalance: number, totalLiabilities: number, totalReserves: number): Promise<any> {
    const query = gql`
        {
            borrowRate: WasmContractsContractAddressStore(
                ContractAddress: "terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n"
                QueryMsg: "{\\"borrow_rate\\":{\\"market_balance\\":\\"${marketBalance}\\",\\"total_liabilities\\":\\"${totalLiabilities}\\",\\"total_reserves\\":\\"${totalReserves}\\"}}"
            ) {
                Result
            }
            oraclePrices: WasmContractsContractAddressStore(
                ContractAddress: "terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t"
                QueryMsg: "{\\"prices\\":{}}"
            ) {
                Result
            }
            overseerWhitelist: WasmContractsContractAddressStore(
                ContractAddress: "terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8"
                QueryMsg: "{\\"whitelist\\":{}}"
            ) {
                Result
            }
        }
    `;
    const body = {
        query: (query.loc && query.loc.source.body),
        variables: {}
    }
    const {borrowRate} = (await axios.post(`${sources.anchorMantle.dataUrl}/?borrow--market`, body)).data.data;
    const bRate = parseFloat(JSON.parse(borrowRate.Result).rate) * blocksPerYear;
    return bRate;
}
