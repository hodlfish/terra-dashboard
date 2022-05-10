import Panel, { WidgetProps } from "components/panels/Panel";
import { ImpermanentLossCalculator, RateCalculator } from "./CalculatorDefs";
import { defaults, Settings, SettingsPanel, CalculatorTypes } from './CalculatorSettings';

function CalculatorPanel(props: WidgetProps) {
    const {name, calculatorType, decimals} = Object.assign({...defaults}, props.settings as Settings);

    return (
        <Panel
            title={name}
            svg={'calculator'}
            size={'small'}
            events={props.events}
            content={
                <div id="calculator-component" className="small-data-list-widget">
                    {calculatorType === CalculatorTypes.aprApy && <RateCalculator decimals={decimals}/>}
                    {calculatorType === CalculatorTypes.impermanent && <ImpermanentLossCalculator decimals={decimals}/>}
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default CalculatorPanel;
