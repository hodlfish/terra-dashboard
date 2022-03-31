import axios from "axios";

export const apiURL = 'https://specapi.azurefd.net/api';

export interface VaultStats {
    poolApr: number,
    poolApy: number,
    farmApr: number,
    tvl: string,
    multiplier: number,
    vaultFee: number,
    poolAstroApr?: number,
    specApr: number,
    dpr: number
}

export interface SpectrumLPVaultStats {
    pairs: { [name: string]: VaultStats },
    vaultFee: number,
    tvl: string,
    pairTvl: string,
    govStaked: string,
    govTvl: string,
    govApr: string
}

export interface SpectrumLPVaultResponse {
    stat: SpectrumLPVaultStats,
    pairInfos: any,
    poolInfos: any,
    poolResponses: any,
    tokenInfos: any,
    marketCap: number,
    circulation: string,
    infoSchemaVersion: string
}

export const useSpectrumFinance = () => {

    function getVaults(): Promise<SpectrumLPVaultResponse> {
        return axios.get(`${apiURL}/data?type=lpVault`).then(response => {
            return response.data as SpectrumLPVaultResponse;
        })
    }

    return {
        getVaults
    };
};
