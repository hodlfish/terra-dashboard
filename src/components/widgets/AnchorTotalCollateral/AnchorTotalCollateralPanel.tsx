import React, { useState, useCallback } from "react";
import { getHistoricalCollaterals } from "scripts/Terra/Anchor";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './AnchorTotalCollateralSettings';
import { Line } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function AnchorTotalCollateralPanel(props: WidgetProps) {
    const {name, timeSpan} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        let data = await getHistoricalCollaterals();
        return () => {
            data = data.slice(0, Math.min(data.length, timeSpan)).reverse();
            const newData = {
                labels: data.map(d => formatTimestamp(d.timestamp, TimestampFormats.monthDay)),
                datasets: [
                    {
                        label: 'Collateral',
                        data: data.map(d => (parseInt(d.total_value) / 1000000)),
                        backgroundColor: `${getStyleColor('icon-1')}44`,
                        borderColor: getStyleColor('icon-2'),
                        fill: true
                    }
                ]
            }
            setGraphData(newData);
        }
    }, [timeSpan]);

    return (
        <Panel
            title={name}
            svg={'anchor'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="labeled-graph-widget">
                    {graphData &&
                    <React.Fragment>
                        <div className="graph-label">Collateral in UST ({graphData.labels.length} days)</div>
                        <div className="graph-container">
                            <Line data={graphData} options={defaultLineChartOptions}/>
                        </div>
                    </React.Fragment>
                    }
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default AnchorTotalCollateralPanel;
