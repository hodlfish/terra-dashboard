import axios from 'axios';
import { sources } from 'scripts/Settings';

interface MineLiquidityInfo {
    totalShares: number,
    tokenReserve: number,
    ustReserve: number
}

interface MineOverview {
    tokenAddress: string,
    liquidityInfo: MineLiquidityInfo,
    priceInUst: number,
    totalStaked: number,
    circulatingSupply: number,
    totalValueLockedUST: number
}

export function getMineOverview(): Promise<MineOverview> {
    return axios.get(`${sources.pylonAPI.dataUrl}/api/mine/v1/overview`).then(response => {
        return response.data as MineOverview;
    })
}

interface MineGovernanceAPY {
    apy: number,
    totalStaked: number
}

export function getMineGovernanceOverview(): Promise<MineGovernanceAPY> {
    return axios.get(`${sources.pylonAPI.dataUrl}/api/governance/v1/overview`).then(response => {
        return response.data as MineGovernanceAPY;
    })
}

interface MineLiquidity {
    apy: number,
    totalStaked: number,
    totalValueLockedInUst: number
}

export function getMineLiquidityOverview(): Promise<MineLiquidity> {
    return axios.get(`${sources.pylonAPI.dataUrl}/api/liquidity/v1/overview`).then(response => {
        return response.data as MineLiquidity;
    })
}

interface PylonProjectLink {
    name: string,
    href: string
}

interface PylonProjectPool {
    id: number,
    name: string,
    cliffPeriodInDays: number,
    vestingPeriodInDays: number,
    contract: string
}

export interface PylonProject {
    symbol: string,
    name: string,
    summary: string,
    description: string,
    links: PylonProjectLink[],
    tokenContract: string,
    poolContract: string,
    dpTokenContract: string,
    startsAt: string,
    pools: PylonProjectPool[],
    swap?: any,
    fixedSwap?: any
}

export function getPylonProjects(): Promise<PylonProject[]> {
    return axios.get(`${sources.pylonAPI.dataUrl}/api/gateway/v1/projects/`).then(response => {
        return response.data.projects as PylonProject[];
    })
}

interface PylonProjectPoolInfo {
    owner: string,
    share_token: string,
    reward_token: string,
    start_time: number,
    cliff_time: number,
    finish_time: number,
    temp_withdraw_start_time: number,
    temp_withdraw_finish_time: number,
    reward_rate: string
}

export function getPoolInfo(poolAddress: string): Promise<PylonProjectPoolInfo> {
    const query = encodeURIComponent(JSON.stringify({
        config:{}
    }))
    return axios.get(`${sources.terraLCD.dataUrl}/wasm/contracts/${poolAddress}/store?query_msg=${query}`).then(response => {
        return response.data.result as PylonProjectPoolInfo;
    });
}
