export const CalculatorTypes = {
    aprApy: 'APR and APY',
    impermanent: 'Impermanent Loss'
}

export const defaults = {
    name: 'Calculator',
    calculatorType: CalculatorTypes.impermanent,
    decimals: 2
}

export interface Settings {
    name?: string,
    calculatorType: string,
    decimals?: number
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, calculatorType, decimals} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.calculatorType = form.calculatorType.value || CalculatorTypes.aprApy;
        newSettings.decimals = parseInt(form.decimals.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Interval</label>
            <select name="calculatorType" defaultValue={calculatorType}>
                {Object.values(CalculatorTypes).map(option => 
                    <option key={option} value={option}>{option}</option>
                )}
            </select>
            <label>Decimals</label>
            <input required type="number" name="decimals" min="0" max="10" defaultValue={decimals}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
