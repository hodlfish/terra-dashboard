import { useState, useCallback } from "react";
import { getTerraTransactionVolume } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel, GraphFormats } from './TerraTransactionVolumeSettings';
import { Line } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { nativeTokens } from "scripts/Terra/TokensAndContracts";
import { defaultLineChartOptions } from "../common";

function TerraTransactionVolumePanel(props: WidgetProps) {
    const {name, denom, format, timeSpan} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        const data = await getTerraTransactionVolume();
        return () => {
            const dataFormat = (format === GraphFormats.periodic ? data.periodic : data.cumulative);
            const denomData = dataFormat.find(p => p.denom === denom);
            if (denomData) {
                const limitedData = denomData.data.slice(
                    Math.max(0, denomData.data.length - timeSpan - 1),
                    denomData.data.length - 1
                )
                generateGraph(limitedData);
            }
        }
    }, [denom, format, timeSpan]);

    const generateGraph = (data: any) => {
        const newData = {
            labels: data.map((d: any) => formatTimestamp(d.datetime, TimestampFormats.monthDay)),
            datasets: [
                {
                    label: 'Transaction Volume',
                    data: data.map((d: any) => (parseInt(d.txVolume) / 1000000)),
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
            refresh={refresh}
            content={
                <div className="labeled-graph-widget">
                    <div className="graph-label">{nativeTokens.get(denom)?.symbol} - {format}</div>
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

export default TerraTransactionVolumePanel;
