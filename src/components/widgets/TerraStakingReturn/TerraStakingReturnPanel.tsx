import { useState, useCallback } from "react";
import { getTerraStakingReturn } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel, GraphFormats } from './TerraStakingReturnSettings';
import { Line } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function TerraStakingReturnsPanel(props: WidgetProps) {
    const {name, format, timeSpan} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        const data = await getTerraStakingReturn();
        return () => {
            const dataPoints = [] as any[];
            const limitedData = data.slice(
                Math.max(0, data.length - timeSpan - 1),
                data.length - 1
            )
            limitedData.forEach(d => {
                dataPoints.push({
                    label: new Date(d.datetime).toLocaleDateString(),
                    value: parseFloat((format === GraphFormats.annualized) ? d.annualizedReturn : d.dailyReturn) * 100
                });
            })
            generateGraph(dataPoints);
        }
    }, [format, timeSpan]);

    const generateGraph = (data: any[]) => {
        const newData = {
            labels: data.map((d: any) => formatTimestamp(d.label, TimestampFormats.monthDay)),
            datasets: [
                {
                    label: 'Staking Return',
                    data: data.map((d: any) => d.value),
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
                    <div className="graph-label">{format}</div>
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

export default TerraStakingReturnsPanel;
