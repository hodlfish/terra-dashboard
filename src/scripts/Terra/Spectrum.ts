import axios from 'axios';
import { sources } from 'scripts/Settings';

export interface VaultStats {
    poolApr: number,
    poolApy: number,
    farmApr: number,
    tvl: string,
    multiplier: number,
    vaultFee: number,
    specApr: number,
    dpr: number
}

export interface SpectrumLPVaultResponseStats {
    pairs: Map<string, VaultStats>,
    vaultFee: number,
    tvl: string,
    pairTvl: string,
    govStaked: string,
    govTvl: string,
    govApr: string
}

interface SpectrumLPVaultResponse {
    coinInfos: any,
    stat: SpectrumLPVaultResponseStats,
    pairInfos: any,
    poolInfos: any,
    poolResponses: any
}

export function getVaults(): Promise<SpectrumLPVaultResponse> {
    return axios.get(`${sources.spectrumAPI.dataUrl}/api/data?type=lpVault`).then(response => {
        return response.data as SpectrumLPVaultResponse;
    });
}
