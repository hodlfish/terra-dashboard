import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './AnchorLiquidationBidsSettings';
import { Chart } from "react-chartjs-2";
import { useAnchorLiquidationContract } from "hooks/useAnchorLiquidationContract";
import { defaultBarChartOptions, getGraphBorderColor } from "../common";

function AnchorLiquidationBidsPanel(props: WidgetProps) {
    const { getBidPoolsByCollateral } = useAnchorLiquidationContract();
    const {name, collateral} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        const bidPoolResponse = await getBidPoolsByCollateral(collateral);
        return () => {
            const labels = bidPoolResponse.bid_pools.map(pool => formatRate(pool.premium_rate));
            setGraphData({
                labels,
                datasets: [
                    {
                        label: 'Bids',
                        data: bidPoolResponse.bid_pools.map(pool => formatBidAmount(pool.total_bid_amount)),
                        backgroundColor: getGraphBorderColor()
                    },
                ],
            })
        }
    }, [collateral]);

    const formatRate = (rate: string) => {
        return `${(Math.round(parseFloat(rate) * 100)).toString()}%`;
    }

    const formatBidAmount = (bidAmount: string) => {
        return (parseInt(bidAmount) / 1000000).toFixed(6);
    }

    return (
        <Panel
            title={name}
            svg={'anchor'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="graph-widget">
                    {graphData &&
                        <div className="graph-container">
                            <Chart type="bar" data={graphData} options={defaultBarChartOptions}/>
                        </div>
                    }
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default AnchorLiquidationBidsPanel;
