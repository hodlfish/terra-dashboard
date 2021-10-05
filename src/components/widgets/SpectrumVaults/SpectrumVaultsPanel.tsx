import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import {getToken} from 'scripts/Terra/TokensAndContracts';
import { defaults, Settings, SettingsPanel, Sorts} from './SpectrumVaultsSettings';
import { getVaults, SpectrumLPVaultResponseStats, VaultStats } from "scripts/Terra/Spectrum";
import { sources } from 'scripts/Settings';
import { formatNumber } from "scripts/Helpers";

function SpectrumVaultsPanel(props: WidgetProps) {
    const {name, sortBy} = Object.assign({...defaults}, props.settings as Settings);
    const [vaultStats, setVaultStats] = useState<SpectrumLPVaultResponseStats>();

    const refresh = useCallback(async () => {
        const vaultsResponse = await getVaults();
        return () => {
            setVaultStats(vaultsResponse.stat);
        }
    }, []);

    const calculateAPY = (vault: VaultStats) => {
        const farmApr = vault.farmApr;
        const specApy = vault.specApr + vault.specApr * (parseFloat(vaultStats?.govApr || '0')) / 2;
        const compoundApy = (vault.poolApy + specApy) * 100;
        const farmApy = vault.poolApy + vault.poolApy * farmApr / 2;
        const stakeApy = farmApy + specApy;
        return Math.max(compoundApy, stakeApy);
    }

    const sortAssets = () => {
        if (vaultStats) {
            const pairs = Object.entries(vaultStats.pairs);
            if (sortBy === Sorts.apy) {
                return pairs.sort((a, b) => (
                    calculateAPY(a[1]) < calculateAPY(b[1])
                ) ? 1 : -1)
            } else {
                return pairs.sort((a, b) => (
                    parseFloat(a[1].tvl) < parseFloat(b[1].tvl)
                ) ? 1 : -1)
            }
        } else {
            return [];
        }
    }

    const renderAsset = (tokenContract: string, vault: VaultStats) => {
        const token = getToken(tokenContract);
        if (token) {
            return (
                <div key={tokenContract} className="spectrum-vault-container">
                    <img src={token?.icon} alt={token.symbol}/>
                    <div>{token.symbol} - UST</div>
                    <div>{formatNumber(calculateAPY(vault), false, 2, false)}%</div>
                    <div>{formatNumber(parseFloat(vault.tvl), true, 2, true)}</div>
                </div>
            )
        }
        return '';
    }

    return (
        <Panel
            title={name}
            img={sources.spectrumAPI.icon}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div id="spectrum-vaults-component">
                    <div id="spectrum-vaults-labels">
                        <div></div>
                        <div>Vault</div>
                        <div>APY</div>
                        <div>TVL (UST)</div>
                    </div>
                    {vaultStats &&
                        <div id="spectrum-vaults-list">
                            {sortAssets().map(vault => renderAsset(vault[0], vault[1]))}
                        </div>
                    }
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default SpectrumVaultsPanel;
