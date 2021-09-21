import axios from 'axios';

export interface NativeData {
    symbol: string,
    icon: string
}

export interface ContractData {
    icon: string,
    name: string,
    protocol: string
}

export interface TokenData {
    icon: string,
    protocol: string,
    symbol: string,
    token: string
}

export var cw20Tokens: Map<string, TokenData>;
export var nativeTokens: Map<string, NativeData>;
export var contracts: Map<string, ContractData>;

export async function getTokensAndContracts(): Promise<any> {
    try {
        const tokens = (await axios.get('/data/tokens.json')).data;
        const natives = (await axios.get('/data/natives.json')).data;
        const namedContracts = (await axios.get('/data/contracts.json')).data;
        cw20Tokens = new Map(Object.entries(tokens));
        nativeTokens = new Map(Object.entries(natives));
        contracts = new Map(Object.entries(namedContracts));
        return true;
    } catch(error) {
        return false;
    }
}

export function getToken(token: string) {
    const contractToken = cw20Tokens.get(token);
    if (contractToken) {
        return contractToken;
    }
    const nativeToken = nativeTokens.get(token);
    if (nativeToken) {
        return nativeToken;
    }
    return null;
}

export function getTokenSymbol(token: string): string {
    return getToken(token)?.symbol || token;
}

export function getTokenIcon(token: string): string {
    return getToken(token)?.icon || token;
}

export interface ContractDataAddress {
    icon: string,
    contract: string,
    name: string,
    protocol: string
}

export function displayContracts(protocolFilter: string = '', nameFilter: string = ''): ContractDataAddress[] {
    let contractList = Array.from(contracts.entries()).map(([key, value]) => {
        return {...value, contract: key} as ContractDataAddress;
    });
    if (protocolFilter) {
        contractList = contractList.filter(c => c.protocol.includes(protocolFilter));
    }
    if (nameFilter) {
        contractList = contractList.filter(c => c.name.includes(nameFilter));
    }
    contractList = contractList.sort((a, b) => a.name.localeCompare(b.name));
    return contractList;
}
