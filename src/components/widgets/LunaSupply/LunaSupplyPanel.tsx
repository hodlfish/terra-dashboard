import { useState, useCallback } from "react";
import { getTerraStationDashboard } from 'scripts/Terra/Terra';
import Panel, { WidgetProps } from "components/panels/Panel";
import {Settings, defaults, SettingsPanel} from "./LunaSupplySettings";
import { formatNumber } from "scripts/Helpers";

interface LunaSupplyDisplayData {
    lunaPrice: string,
    issuance: string,
    bondedLuna: string,
    communityPool: string
}

function LunaSupplyPanel(props: WidgetProps) {
    const { name, decimals } = Object.assign({...defaults}, props.settings as Settings);
    const [displayData, setDisplayData] = useState<LunaSupplyDisplayData>();

    const fetch = useCallback(async () => {
        const data = await getTerraStationDashboard();
        return () => {
            setDisplayData({
                lunaPrice: formatNumber(parseFloat(data.prices.uusd || '0'), false, decimals),
                issuance:  formatNumber(parseFloat(data.issuances.uluna || '0'), true, decimals),
                bondedLuna: formatNumber(parseFloat(data.stakingPool.bondedTokens), true, decimals),
                communityPool: formatNumber(parseFloat(data.communityPool.uluna || '0'), true, decimals)
            });
        }
    }, [decimals]);

    return (
        <Panel
            title={name}
            svg={'luna'}
            size={'small'}
            events={props.events}
            fetch={fetch}
            content={
                <div className="small-data-list-widget">
                    <div className="data-list space-evenly">
                        <div className="data-item">
                            <div className='title'>Luna Price (USD)</div>
                            <div className="data">{displayData?.lunaPrice}</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>Issuance</div>
                            <div className="data">{displayData?.issuance}</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>Staked</div>
                            <div className="data">{displayData?.bondedLuna}</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>Community Pool</div>
                            <div className="data">{displayData?.communityPool}</div>
                        </div>
                    </div>
                    <svg>
                        <use href="#luna"/>
                    </svg>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default LunaSupplyPanel;