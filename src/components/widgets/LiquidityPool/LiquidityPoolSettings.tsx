import React, { useEffect, useState } from 'react';
import { displayContracts } from 'scripts/Terra/TokensAndContracts';
import { MAX_REFRESH_RATE, MIN_REFRESH_RATE } from '../common';
import DataSource from "components/DataSource";
import { sources } from "scripts/Settings";

export const Protocols = {
    terraswap: 'Terraswap',
    astroport: 'Astroport',
    loop: 'Loop'
}

export const defaults = {
    flipRatio: true,
    protocol: Protocols.terraswap,
    refreshRate: 30,
    decimals: 2
}

export interface Settings {
    name?: string,
    protocol: string,
    contractAddr: string,
    flipRatio?: boolean,
    refreshRate?: number,
    decimals?: number
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

const dataSources = [
    sources.terraFCD
]

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, protocol, contractAddr, flipRatio, refreshRate, decimals} = Object.assign({...defaults}, props.settings);
    const [pairs, setPairs] = useState<any[]>([]);
    const [dex, setDex] = useState<string>(protocol);

    useEffect(() => {
        setPairs(displayContracts(dex, 'Pair'));
    }, [dex])

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.protocol = form.protocol.value;
        newSettings.contractAddr = form.contractAddr.value;
        newSettings.flipRatio = form.flipRatio.checked;
        newSettings.refreshRate = parseInt(form.refreshRate.value);
        newSettings.decimals = parseInt(form.decimals.value);
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <DataSource links={dataSources}/>

            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Protocol</label>
            <select name="protocol" defaultValue={dex} onChange={e => setDex(e.target.value)}>
                {Object.values(Protocols).map(format => 
                    <option key={format} value={format}>{format}</option>
                )}
            </select>
            {pairs.length > 0 && 
                <React.Fragment>
                    <label>Swap Contract Address</label>
                    <select name="contractAddr" defaultValue={contractAddr}>
                        {pairs.map(pair => 
                            <option key={pair.contract} value={pair.contract}>{pair.name}</option>
                        )}
                    </select>
                </React.Fragment>
            }
            <label>Flip Ratio</label>
            <input type="checkbox" name="flipRatio" defaultChecked={flipRatio}/>
            <label>Refresh Rate (seconds)</label>
            <input type="number" name="refreshRate" min={MIN_REFRESH_RATE} max={MAX_REFRESH_RATE} defaultValue={refreshRate}/>
            <label>Decimals</label>
            <input required type="number" name="decimals" min="0" max="6" defaultValue={decimals}/>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
