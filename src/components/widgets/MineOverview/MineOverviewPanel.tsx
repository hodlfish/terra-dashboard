import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './MineOverviewSettings';
import { getMineGovernanceOverview, getMineLiquidityOverview, getMineOverview } from "scripts/Terra/Pylon";
import { formatNumber } from "scripts/Helpers";

interface MineData {
    minePrice: string,
    totalStaked: string,
    stakedRatio: string,
    stakingAPY: string,
    mineUstPoolAPY: string
}

function MineOverviewPanel(props: WidgetProps) {
    const {name} = Object.assign({...defaults}, props.settings as Settings);
    const [displayData, setDisplayData] = useState<MineData>();

    const refresh = useCallback(async () => {
        const mineOverview = await getMineOverview();
        const mineGovernance = await getMineGovernanceOverview();
        const mineLiquidity = await getMineLiquidityOverview()
        return () => {
            setDisplayData({
                minePrice: mineOverview.priceInUst.toFixed(2),
                totalStaked: formatNumber(mineOverview.totalStaked, false, 2, true),
                stakedRatio: (mineOverview.totalStaked / mineOverview.circulatingSupply * 100).toFixed(2),
                stakingAPY: (mineGovernance.apy * 100).toFixed(2),
                mineUstPoolAPY: (mineLiquidity.apy * 100).toFixed(2)
            })
        }
    }, []);

    return (
        <Panel
            title={name}
            svg={'pylon'}
            size={'small'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="small-data-list-widget">
                    <div className="data-list">
                        <div className="data-item">
                            <div className='title'>$MINE Price</div>
                            <div className="data">${displayData?.minePrice}</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>Staked</div>
                            <div className="data">{displayData?.totalStaked}</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>Percent Staked</div>
                            <div className="data">{displayData?.stakedRatio}%</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>MINE Staking APY</div>
                            <div className="data">{displayData?.stakingAPY}%</div>
                        </div>
                        <div className="data-item">
                            <div className='title'>MINE-UST Pool APY</div>
                            <div className="data">{displayData?.mineUstPoolAPY}%</div>
                        </div>
                    </div>
                    <svg>
                        <use href="#pylon"/>
                    </svg>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default MineOverviewPanel;
