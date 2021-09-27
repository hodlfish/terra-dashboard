import { useState, useCallback } from "react";
import { getNativeTokenSupplies } from 'scripts/Terra/Terra';
import { nativeTokens, NativeData } from "scripts/Terra/TokensAndContracts";
import Panel, { WidgetProps } from "components/panels/Panel";
import {Settings, defaults, SettingsPanel} from "./NativeTokenSupplySettings";
import { formatNumber } from "scripts/Helpers";

export interface NativeTokenSupplyProps {
    settings: Settings,
    panelEvents: any,
    onUpdate: any
}

interface NativeTokenDisplayData {
    denom: string,
    token: NativeData,
    supplyNumber: number,
    supplyFormatted: string

}

function NativeTokenSupplyPanel(props: WidgetProps) {
    const { name, denom, decimals } = Object.assign({...defaults}, props.settings);
    const [selectedTokenSupply, setSelectedTokenSupply] = useState<NativeTokenDisplayData>();
    const [tokenSupplies, setTokenSupplies] = useState<NativeTokenDisplayData[]>([]);

    const refresh = useCallback(async () => {
        const data = await getNativeTokenSupplies();
        return () => {
            let tokenSupplies = data.map(d => {
                return {
                    denom: d.denom,
                    token: nativeTokens.get(d.denom),
                    supplyNumber: parseInt(d.amount),
                    supplyFormatted: formatNumber(parseInt(d.amount), true, decimals, true)
                } as NativeTokenDisplayData;
            }).filter(
                d => d.token !== undefined
            ).sort(
                (a, b) => (a.supplyNumber < b.supplyNumber) ? 1 : -1
            );
            const selected = tokenSupplies.find(t => t.denom === denom);
            if (selected) {
                setSelectedTokenSupply(selected);
            }
            tokenSupplies = tokenSupplies.filter(t => t.denom !== denom);
            setTokenSupplies(tokenSupplies);
        }
    }, [decimals, denom]);

    return (
        <Panel
            title={name}
            size={'small'}
            svg={'terra'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="small-data-list-widget">
                    <div className="data-list">
                        {selectedTokenSupply &&
                            <div className="data-item" key={selectedTokenSupply.denom}>
                                <div className='title'>{selectedTokenSupply.token.symbol} Supply</div>
                                <div className="data">{selectedTokenSupply.supplyFormatted}</div>
                            </div>
                        }
                        {tokenSupplies.map(d => 
                            <div className="data-item" key={d.denom}>
                                <div className='title'>{d.token.symbol} Supply</div>
                                <div className="data">{d.supplyFormatted}</div>
                            </div>
                        )}
                    </div>
                    <svg>
                        <use href="#terra"/>
                    </svg>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default NativeTokenSupplyPanel;
