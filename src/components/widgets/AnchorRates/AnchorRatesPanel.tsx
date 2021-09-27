import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import { getAPYs, getMarketStableCoin, getBorrowMarketState, getBorrowMarket } from "scripts/Terra/Anchor";
import { defaults, Settings, SettingsPanel } from './AnchorRatesSettings';

interface AnchorRatesData {
    distributionAPY: string,
    governanceAPY: string,
    lpRewards: string,
    borrowAPR: string,
    netBorrowAPR: string,
    depositAPY: string
}

function AnchorRatesPanel(props: WidgetProps) {
    const {name, decimals} = Object.assign({...defaults}, props.settings as Settings);
    const [rateData, setRateData] = useState<AnchorRatesData>();

    const refresh = useCallback(async () => {
        const anchorAPYs = await getAPYs();
        const anchorRates = await getMarketStableCoin();
        const borrowMarketState = await getBorrowMarketState();
        const borrowAPR = await getBorrowMarket(borrowMarketState.marketBalance, borrowMarketState.totalLiabilities, borrowMarketState.totalReserves);
        return () => {
            setRateData({
                distributionAPY: (anchorAPYs.distributionAPY * 100).toFixed(decimals),
                governanceAPY: (anchorAPYs.governanceAPY * 100).toFixed(decimals),
                lpRewards: (anchorAPYs.lpRewards * 100).toFixed(decimals),
                borrowAPR: (borrowAPR * 100).toFixed(decimals),
                depositAPY: (anchorRates.depositAPY * 100).toFixed(decimals),
                netBorrowAPR: ((anchorAPYs.distributionAPY - borrowAPR) * 100).toFixed(decimals)
            });
        }
    }, [decimals]);

    return (
        <Panel
            title={name}
            svg={'anchor'}
            size={'small'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="small-data-list-widget">
                    <div className="data-list space-evenly">
                        <div className="data-item">
                            <div className="title">Deposit APY</div>
                            <div className="data">{rateData?.depositAPY}%</div>
                        </div>
                        <div className="data-item">
                            <div className="title">Net Borrow APR</div>
                            <div className="data">{rateData?.netBorrowAPR}%</div>
                        </div>
                        <div className="data-item">
                            <div className="title">ANC Staking APY</div>
                            <div className="data">{rateData?.governanceAPY}%</div>
                        </div>
                        <div className="data-item">
                            <div className="title">ANC-UST LP APY</div>
                            <div className="data">{rateData?.lpRewards}%</div>
                        </div>
                    </div>
                    <svg>
                        <use href="#anchor"/>
                    </svg>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default AnchorRatesPanel;
