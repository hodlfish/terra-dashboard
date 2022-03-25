import { useState, useCallback } from "react";
import { getLunaPrice, LunaPriceIntervals } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './LunaPriceSettings';
import { Chart } from "react-chartjs-2";
import { formatTimestamp, TimestampFormats, getStyleColor } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function LunaPricePanel(props: WidgetProps) {
    const {name, interval, refreshRate, decimals} = Object.assign({...defaults}, props.settings as Settings);
    const [lunaPrice, setLunaPrice] = useState<string>();
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        const data = await getLunaPrice(interval);
        return () => {
            let format = TimestampFormats.hoursMinutes;
            if (LunaPriceIntervals.oneHour === interval) {
                format = TimestampFormats.hours;
            } else if (interval === LunaPriceIntervals.oneDay) {
                format = TimestampFormats.monthDay;
            }

            const newData = {
                labels: data.prices.map((p: any) => formatTimestamp(p.datetime, format)),
                datasets: [
                    {
                        data: data.prices.map((p: any) => parseFloat(p.price).toFixed(decimals)),
                        backgroundColor: `${getStyleColor('icon-1')}44`,
                        borderColor: getStyleColor('icon-2'),
                        fill: true
                    }
                ]
            }
            setGraphData(newData);
            setLunaPrice(data?.lastPrice.toFixed(decimals));
        }
    }, [interval, decimals]);

    return (
        <Panel
            title={name}
            svg={'terra'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            refreshRate={refreshRate}
            content={
                <div className="labeled-graph-widget">
                    <div className="graph-label">$LUNA: {lunaPrice} UST</div>
                    {graphData &&
                        <div className="graph-container">
                            <Chart type="line" data={graphData} options={defaultLineChartOptions}/>
                        </div>
                    }
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default LunaPricePanel;
