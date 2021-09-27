import { useState, useCallback } from "react";
import { getMIRHistoricalPrices, getMIRPrice, MIRHistoricalPricePoint } from "scripts/Terra/Mirror";
import Panel, { WidgetProps } from "components/panels/Panel";
import { Line } from "react-chartjs-2";
import { defaults, Settings, SettingsPanel } from './MirrorPriceSettings';
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function MirrorPricePanel(props: WidgetProps) {
    const {name, decimals} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();
    const [currentPrice, setCurrentPrice] = useState<string>();

    const refresh = useCallback(async () => {
        const currentPrice = await getMIRPrice();
        const historicalData = await getMIRHistoricalPrices();
        return () => {
            generateGraph(historicalData);
            setCurrentPrice(currentPrice.toFixed(decimals));
        };
    }, [decimals]);

    const generateGraph = (historicalData: MIRHistoricalPricePoint[]) => {
        const newData = {
            labels: historicalData.map(d => formatTimestamp(d.timestamp, TimestampFormats.monthDay)),
            datasets: [
                {
                    data: historicalData.map(d => d.price),
                    backgroundColor: `${getStyleColor('icon-1')}44`,
                    borderColor: getStyleColor('icon-2'),
                    fill: true
                }
            ]
        }
        setGraphData(newData);
    }

    return (
        <Panel
            title={name}
            svg={'mirror'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="labeled-graph-widget">
                    <div className="graph-label">$MIR: {currentPrice} UST</div>
                    {graphData &&
                        <div className="graph-container">
                            <Line data={graphData} options={defaultLineChartOptions}/>
                        </div>
                    }
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default MirrorPricePanel;
