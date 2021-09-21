import { useState, useCallback } from "react";
import { getTerraSwapContract, TerraSwapContractHoldings } from "scripts/Terra/Terraswap";
import Panel, { WidgetProps } from "components/panels/Panel";
import {nativeTokens, cw20Tokens, contracts, getTokenIcon} from 'scripts/Terra/TokensAndContracts';
import { Settings, defaults, SettingsPanel } from "./TerraSwapContractSettings";
import { formatNumber } from "scripts/Helpers";
import { hideImgOnError } from "../common";

function TerraSwapContractPanel(props: WidgetProps) {
    const {name, contractAddr, flipRatio, refreshRate, decimals} = Object.assign({...defaults}, props.settings as Settings);
    const [contractHoldings, setContractHoldings] = useState<TerraSwapContractHoldings>();

    const fetch = useCallback(async () => {
        const data = await getTerraSwapContract(contractAddr);
        return () => {
            setContractHoldings(data);
        }
    }, [contractAddr]);

    const getAssetName = (index: number) => {
        if (contractHoldings?.assets[index].info.native_token !== undefined) {
            const denom = contractHoldings?.assets[index].info.native_token?.denom || '';
            return nativeTokens.get(denom)?.symbol;
        } else if (contractHoldings?.assets[index].info.token?.contract_addr !== undefined) {
            const denom = contractHoldings?.assets[index].info.token?.contract_addr || '';
            return cw20Tokens.get(denom)?.symbol;
        } else {
            return 'Unknown';
        }
    }

    const getAssetIcon = (index: number) => {
        if (contractHoldings?.assets[index].info.native_token !== undefined) {
            const denom = contractHoldings?.assets[index].info.native_token?.denom || '';
            return getTokenIcon(denom);
        } else if (contractHoldings?.assets[index].info.token?.contract_addr !== undefined) {
            const denom = contractHoldings?.assets[index].info.token?.contract_addr || '';
            return getTokenIcon(denom);
        } else {
            return 'Unknown';
        }
    }

    const getAssetLiquidity = (index: number) => {
        return parseInt(contractHoldings?.assets[index].amount || '0')
    }

    interface TotalLiquidity {
        denom: string,
        amount: string
    }

    const getTotalLiquidity = () =>  {
        let total = (getPrice() * getAssetLiquidity(0)) + getAssetLiquidity(1);
        if (flipRatio) {
            total = (getPrice() * getAssetLiquidity(1)) + getAssetLiquidity(0);
        }
        return { 
            denom: getAssetName(flipRatio ? 0 : 1),
            amount: formatNumber(total, true, decimals, true)
        } as TotalLiquidity;
    }

    const getTitle = () => {
        if (name !== undefined) {
            return name;
        } else {
            return contracts.get(contractAddr)?.name || '';
        }
    }

    const getUnit = () => {
        return (flipRatio) ? `${getAssetName(0)} per ${getAssetName(1)}` : `${getAssetName(1)} per ${getAssetName(0)}`;
    }

    const getPrice = () => {
        const amountFirst = getAssetLiquidity(0);
        const amountSecond = getAssetLiquidity(1);
        return (flipRatio)? amountFirst / amountSecond : amountSecond / amountFirst;
    }

    const getIcon = () => {
        return contracts.get(contractAddr)?.icon || '';
    }

    return (
        <Panel
            title={getTitle()}
            img={getIcon()}
            events={props.events}
            fetch={fetch}
            refreshRate={refreshRate}
            content={
                <div className="small-data-list-widget">
                    <div className="data-list space-evenly">
                        <div className="data-item">
                            <div className='title'>{getUnit()}</div>
                            <div className="data">{getPrice().toFixed(decimals)}</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>Total Liquidity ({getTotalLiquidity().denom})</div>
                            <div className="data">
                                <img alt="Total liquidity icon" src={getAssetIcon(Number(!flipRatio))}/>
                                <div>{getTotalLiquidity().amount} </div>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className='title'>{getAssetName(0)} Liquidity</div>
                            <div className="data">
                                <img alt="Asset 1" src={getAssetIcon(0)}/>
                                <div>{formatNumber(getAssetLiquidity(0), true, decimals, true)}</div>
                            </div>
                        </div>
                        <div className="data-item">
                            <div className='title'>{getAssetName(1)} Liquidity</div>
                            <div className="data">
                                <img alt="Asset 2" src={getAssetIcon(1)}/>
                                <div>{formatNumber(getAssetLiquidity(1), true, decimals, true)}</div>
                            </div>
                        </div>
                    </div>
                    <img className="background-img" alt="Contract Icon" src={getIcon()} onError={hideImgOnError}/>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default TerraSwapContractPanel;