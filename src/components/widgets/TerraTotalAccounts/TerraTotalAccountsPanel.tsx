import { useState, useCallback } from "react";
import { getTerraAccounts } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel, GraphFormats, GraphFilters } from './TerraTotalAccountsSettings';
import { Line } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function TerraTotalAccountsPanel(props: WidgetProps) {
    const {name, filter, format, timeSpan} = Object.assign({...defaults}, props.settings as Settings);
    const [total, setTotal] = useState<number>();
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        const data = await getTerraAccounts();
        return () => {
            let dataSet = [];
            if (format === GraphFormats.cumulative) {
                dataSet = data.cumulativeTotal;
                setTotal(data.total);
            } else if (format === GraphFormats.periodic && filter === GraphFilters.active) {
                dataSet = data.periodicActive;
                setTotal(data.totalActive);
            } else {
                dataSet = data.periodicTotal;
                setTotal(data.total);
            }
            const limitedData = dataSet.slice(
                Math.max(0, dataSet.length - timeSpan - 1),
                dataSet.length - 1
            )
            generateGraph(limitedData);
        }
    }, [filter, format, timeSpan]);

    const generateGraph = (data: any) => {
        const newData = {
            labels: data.map((d: any) => formatTimestamp(d.datetime, TimestampFormats.monthDay)),
            datasets: [
                {
                    label: 'Total Accounts',
                    data: data.map((d: any) => (parseInt(d.value))),
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
                    <div className="graph-label">Total: {total}</div>
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

export default TerraTotalAccountsPanel;
