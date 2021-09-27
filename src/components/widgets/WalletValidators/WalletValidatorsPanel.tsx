import { useState, useCallback } from "react";
import { getWalletStakingBalances, ValidatorDelegation } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './WalletValidatorsSettings';
import { Doughnut } from "react-chartjs-2";
import { formatNumber } from 'scripts/Helpers';
import { defaultPieChartOptions } from "../common";

function WalletValidatorsPanel(props: WidgetProps) {
    const {name, addr, decimals} = Object.assign({...defaults}, props.settings as Settings);
    const [validators, setValidators] = useState<ValidatorDelegation[]>([]);
    const [graphData, setGraphData] = useState<any>();

    const refresh = useCallback(async () => {
        let validators = await getWalletStakingBalances(addr);
        return () => {
            validators = validators.sort((a, b) => (parseInt(b.delegation.shares) - parseInt(a.delegation.shares)));
            generateGraph(validators);
            setValidators(validators)
        }
    }, [addr]);

    const generateGraph = (validators: ValidatorDelegation[]) => {
        const backgroundColor = [];
        for(let i = 0; i < validators.length; i++) {
            backgroundColor.push(`hsla(${i / validators.length * 360}, 80%, 60%, 0.7)`)
        }

        const newData = {
            labels: validators.map(v => v.validator.description.moniker),
            height: 120,
            width: 120,
            datasets: [
                {
                    label: 'Validators',
                    data: validators.map(v => parseFloat(v.delegation.shares) / 1000000),
                    backgroundColor: backgroundColor,
                    borderWidth: 0
                }
            ]
        }
        setGraphData(newData);
    }

    const renderValidator = (validator: ValidatorDelegation) => {
        const shares = formatNumber(parseInt(validator.delegation.shares), true, decimals);
        const commission = formatNumber(parseFloat(validator.validator.commission.commission_rates.rate), false, 2);
        return (
            <div key={validator.validator.operator_address} className="validator-container">
                <div className="validator-moniker">{validator.validator.description.moniker}</div>
                <div className="validator-details">Delegation: {shares}</div>
                <div className="validator-details">Commission Rate: {commission}</div>
            </div>
        );
    }

    return (
        <Panel
            title={name}
            svg={'terra'}
            size={'small'}
            events={props.events}
            refresh={refresh}
            content={
                <div id="wallet-validators-component">
                    {graphData &&
                        <div id="graph-container">
                            <Doughnut data={graphData} options={defaultPieChartOptions}/>
                        </div>
                    }
                    {validators.map(v => 
                        renderValidator(v)
                    )}
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default WalletValidatorsPanel;
