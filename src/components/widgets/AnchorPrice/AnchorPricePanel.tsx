import { useState, useCallback } from "react";
import { getANCHistoricalPrices, getANCPrice } from "scripts/Terra/Anchor";
import Panel, {WidgetProps} from "components/panels/Panel";
import { Line } from "react-chartjs-2";
import { defaults, Settings, SettingsPanel } from './AnchorPriceSettings';
import { formatTimestamp, getStyleColor, TimestampFormats } from 'scripts/Helpers';
import { defaultLineChartOptions } from "../common";

function AnchorPricePanel(props: WidgetProps) {
    const {name, decimals} = Object.assign({...defaults}, props.settings as Settings);
    const events = props.events;
    const [graphData, setGraphData] = useState<any>();
    const [currentPrice, setCurrentPrice] = useState<string>();

    const refresh = useCallback(async() => {
        const ancPrice = await getANCPrice();
        const historicalData = await getANCHistoricalPrices();
        return () => {
            const newData = {
                labels: historicalData.map(d => formatTimestamp(d.timestamp, TimestampFormats.monthDay)),
                datasets: [
                    {
                        label: 'Anchor Price',
                        data: historicalData.map(d => parseFloat(d.anc_price) as number),
                        backgroundColor: `${getStyleColor('icon-1')}44`,
                        borderColor: getStyleColor('icon-2'),
                        fill: true
                    }
                ]
            }
            setGraphData(newData);
            setCurrentPrice(parseFloat(ancPrice.anc_price).toFixed(decimals));
        }
    }, [decimals]);

    return (
        <Panel
            title={name}
            svg={'anchor'}
            size={'medium'}
            events={events}
            refresh={refresh}
            content={
                <div className="labeled-graph-widget">
                    <div className="graph-label">$ANC: {currentPrice} UST</div>
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

export default AnchorPricePanel;
