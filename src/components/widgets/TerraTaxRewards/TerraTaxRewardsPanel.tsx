import { useState, useCallback } from "react";
import { getTerraBlockRewards, getExchangeRates } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel, GraphFormats } from './TerraTaxRewardsSettings';
import { Line } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function TerraTaxRewardsPanel(props: WidgetProps) {
    const {name, format, timeSpan} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();

    const fetch = useCallback(async () => {
        const exchangeRates = await getExchangeRates();
        const data = await getTerraBlockRewards();
        return () => {
            const dataFormat = (format === GraphFormats.periodic ? data.periodic : data.cumulative);
            const limitedData = dataFormat.slice(
                Math.max(0, dataFormat.length - timeSpan - 1),
                dataFormat.length - 1
            )
            const krtRate = parseFloat(exchangeRates.result.find(er => er.denom === 'ukrw')?.amount || '1');
            const ustRate = parseFloat(exchangeRates.result.find(er => er.denom === 'uusd')?.amount || '1');
            limitedData.forEach(d => {
                d.blockReward = (parseFloat(d.blockReward) / krtRate * ustRate / 1000000).toFixed(6);
            })
            generateGraph(limitedData);
        }
    }, [format, timeSpan]);

    const generateGraph = (data: any) => {
        const newData = {
            labels: data.map((d: any) => formatTimestamp(d.datetime, TimestampFormats.monthDay)),
            datasets: [
                {
                    label: 'Tax Rewards',
                    data: data.map((d: any) => (parseFloat(d.blockReward))),
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
            svg={'terra'}
            size={'medium'}
            events={props.events}
            fetch={fetch}
            content={
                <div className="labeled-graph-widget">
                    <div className="graph-label">{format} - {timeSpan} days</div>
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

export default TerraTaxRewardsPanel;