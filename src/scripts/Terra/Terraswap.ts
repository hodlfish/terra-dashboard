import axios from 'axios';
import { sources } from 'scripts/Settings';

export interface TerraSwapNativeToken {
    denom: string
}

export interface TerraSwapToken {
    contract_addr: string
}

export interface TerraSwapDemon {
    token?: TerraSwapToken,
    native_token?: TerraSwapNativeToken
}

export interface TerraSwapAsset {
    amount: string,
    info: TerraSwapDemon
}

export interface TerraSwapContractHoldings {
    assets: TerraSwapAsset[],
    total_share:  string
}

export function getTerraSwapContract(address: string): Promise<TerraSwapContractHoldings> {
    const query = encodeURI(JSON.stringify({
        pool: {}
    }));
    return axios.get(`${sources.terraFCD.dataUrl}/wasm/contracts/${address}/store?query_msg=${query}`).then(response => {
        return response.data.result as TerraSwapContractHoldings;
    });
}
