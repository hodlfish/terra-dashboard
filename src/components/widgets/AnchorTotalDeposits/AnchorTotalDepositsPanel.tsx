import React, { useState, useCallback } from "react";
import { getHistoricalDeposits, getHistoricalBorrows } from "scripts/Terra/Anchor";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './AnchorTotalDepositsSettings';
import { Line } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

interface PanelDataPoint {
    timestamp: number,
    deposit: string,
    borrow: string
}

function AnchorTotalDepositsPanel(props: WidgetProps) {
    const {name, timeSpan} = Object.assign({...defaults}, props.settings as Settings);
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        const deposits = await getHistoricalDeposits();
        const borrows = await getHistoricalBorrows();
        return () => {
            let combined = [] as PanelDataPoint[];
            borrows.forEach(borrow => {
                const deposit = deposits.total_ust_deposits.find(d => d.timestamp === borrow.timestamp);
                if (deposit) {
                    combined.push({
                        timestamp: borrow.timestamp,
                        deposit: deposit.deposit,
                        borrow: borrow.total_borrowed
                    });
                }
            });
            combined = combined.slice(0, Math.min(combined.length, timeSpan)).reverse();
            generateGraph(combined);
        }
    }, [timeSpan]);

    const generateGraph = (data: PanelDataPoint[]) => {
        const newData = {
            labels: data.map(d => formatTimestamp(d.timestamp, TimestampFormats.monthDay)),
            datasets: [
                {
                    label: 'Deposited',
                    data: data.map(d => (parseInt(d.deposit) / 1000000)),
                    backgroundColor: `${getStyleColor('icon-1')}44`,
                    borderColor: getStyleColor('icon-2'),
                    fill: true
                },
                {
                    label: 'Borrowed',
                    data: data.map(d => (parseInt(d.borrow) / 1000000)),
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
            svg={'anchor'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="labeled-graph-widget">
                    {graphData &&
                        <React.Fragment>
                            <div className="graph-label">Deposits and Borrows in UST ({graphData.labels.length} days)</div>
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

export default AnchorTotalDepositsPanel;
