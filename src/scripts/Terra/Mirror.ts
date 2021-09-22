import axios from 'axios';
import { gql } from '@apollo/client';
import { sources } from 'scripts/Settings';

const mirUstPoolContract = 'terra1amv303y8kzxuegvurh0gug2xe9wkgj65enq2ux';
const mirTokenContract = 'terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6';
const mirrorGovContract = 'terra1wh39swv7nq36pnefnupttm2nr96kz7jjddyt2x';

interface MIRPriceAsset {
    info: any,
    amount: string
}

interface MIRPriceResult {
    assets: MIRPriceAsset[],
    total_share: string
}

interface MIRPriceResponse {
    height: string,
    result: MIRPriceResult
}

export async function getMIRPrice() {
    const query = encodeURIComponent(JSON.stringify({
        pool:{}
    }))
    const mirUSTLP = (await axios.get(
        `${sources.terraFCD.dataUrl}/wasm/contracts/${mirUstPoolContract}/store?query_msg=${query}`
    )).data as MIRPriceResponse;
    return parseFloat(mirUSTLP.result.assets[0].amount) / parseFloat(mirUSTLP.result.assets[1].amount);

}

export interface MIRHistoricalPricePoint {
    timestamp: number,
    price: number
}

export async function getMIRHistoricalPrices(days = 30): Promise<MIRHistoricalPricePoint[]> {
    const query = gql`
        query asset($token: String!, $from: Float!, $to: Float!, $interval: Float!) {
            asset(token: $token) {
                prices {
                    history(interval: $interval, from: $from, to: $to) {
                        timestamp
                        price
                    }
                }
            }
        }
    `;
    const body = {
        variables: {
            from: Date.now() - days * 24 * 60 * 60 * 1000,
            interval: 1440,
            to: Date.now(),
            token: mirTokenContract
        },
        query: (query.loc && query.loc.source.body)
    }
    const mirHistoricalPrices = await axios.post(`${sources.mirrorGraphQL.dataUrl}/graphql?asset`, body);
    return mirHistoricalPrices.data.data.asset.prices.history;
}

export interface MirrorAssetAPR {
    long: string,
    short: string
}

export interface MirrorAssetStatistic {
    liquidity: string,
    volume: string,
    marketCap: string,
    collateralValue: string,
    minCollateralRatio: string,
    apr: MirrorAssetAPR
}

export interface MirrorAssetPrice {
    oraclePrice?: string,
    oraclePriceAt?: string,
    price: string,
    priceAt: string
}

export interface MirrorAsset {
    token: string,
    price: MirrorAssetPrice,
    description: string,
    statistic: MirrorAssetStatistic
}

export async function getMirrorAssets(): Promise<any> {
    // Get Mirror Assets
    const assetQuery = gql`
        query assets($network: Network) {
            assets {
                token
                description
                statistic {
                    liquidity(network: $network)
                    volume(network: $network)
                    marketCap
                    collateralValue
                    minCollateralRatio
                    apr {
                        long
                        short
                    }
                }
            }
        }
    `;
    const body = {
        variables: {"network": "TERRA"},
        query: (assetQuery.loc && assetQuery.loc.source.body)
    }
    const mirrorAssetData = await axios.post(`${sources.mirrorGraphQL.dataUrl}/graphql`, body);
    const mirrorAssets = mirrorAssetData.data.data.assets as MirrorAsset[];

    // Get Mirror Asset Prices
    const priceQuery = gql`
        query assets($timestamp: Float!) {
            assets {
                token
                prices {
                    price
                    priceAt(timestamp: $timestamp)
                    oraclePrice
                    oraclePriceAt(timestamp: $timestamp)
                }
            }
        }
    `;
    const priceBody = {
        variables: {"timestamp": Date.now()},
        query: (priceQuery.loc && priceQuery.loc.source.body)
    }
    const mirrorPriceData = await axios.post(`${sources.mirrorGraphQL.dataUrl}/graphql?assetsPrices`, priceBody);
    const mirrorPrices = mirrorPriceData.data.data.assets;
    
    // Combine prices with assets
    mirrorAssets.forEach(asset => {
        const assetPrice = mirrorPrices.find((mp: any) => mp.token === asset.token);
        if (assetPrice) {
            asset.price = assetPrice.prices;
        }
    });

    return mirrorAssets as MirrorAsset[];
}

export const MirrorProposalStatus = {
    passed: 'passed',
    rejected: 'rejected',
    voting: 'in_progress',
    executed: 'executed'
}

export function getMirrorProposals(filter: string | undefined = undefined, limit: number | undefined = undefined, start_after: number | undefined = undefined): Promise<any[]> {
    const query: {[k: string]: any} = {};
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
    return axios.get(`${sources.terraFCD.dataUrl}/wasm/contracts/${mirrorGovContract}/store?query_msg=${encodedQuery}`).then(data => {
        return data.data.result.polls as Promise<any[]>;
    });
}
