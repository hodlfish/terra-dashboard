import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import {getToken} from 'scripts/Terra/TokensAndContracts';
import { defaults, Settings, SettingsPanel, Sorts} from './SpectrumVaultsSettings';
import { sources } from 'scripts/Settings';
import { formatNumber } from "scripts/Helpers";
import { useSpectrumFinance, SpectrumLPVaultResponse, VaultStats } from "hooks/useSpectrumFinance";

function SpectrumVaultsPanel(props: WidgetProps) {
    const {name, sortBy} = Object.assign({...defaults}, props.settings as Settings);
    const [vaultStats, setVaultStats] = useState<SpectrumLPVaultResponse>();
    const { getVaults } = useSpectrumFinance();

    const refresh = useCallback(async () => {
        const vaultsResponse = await getVaults();
        return () => {
            setVaultStats(vaultsResponse);
        }
    }, []);

    // TODO: Correct to match spectrum rates
    const calculateAPY = (vault: VaultStats) => {
        return (vault.poolApy + vault.specApr) * 100
    }

    const sortAssets = () => {
        if (vaultStats) {
            const pairs = Object.entries(vaultStats.stat.pairs);
            if (sortBy === Sorts.apy) {
                return pairs.sort((a, b) => (
                    calculateAPY(a[1]) < calculateAPY(b[1])
                ) ? 1 : -1).map(p => p[0])
            } else {
                return pairs.sort((a, b) => (
                    parseFloat(a[1].tvl) < parseFloat(b[1].tvl)
                ) ? 1 : -1).map(p => p[0])
            }
        } else {
            return [];
        }
    }

    const renderAsset = (tokenContract: string) => {
        const poolInfo = vaultStats?.poolInfos[tokenContract];
        const vault = vaultStats?.stat.pairs[tokenContract];
        if (poolInfo && vault) {
            const assetToken = getToken(poolInfo.asset_token);
            const denomTokenContract = getToken(poolInfo.denomTokenContract);
            if (assetToken && denomTokenContract) {
                return (
                    <div key={tokenContract} className="spectrum-vault-container">
                        <img src={assetToken?.icon} alt={assetToken.symbol}/>
                        <div>{assetToken.symbol} - {denomTokenContract.symbol}</div>
                        <div>{poolInfo.farm}</div>
                        <div>{formatNumber(calculateAPY(vault), false, 2, false)}%</div>
                        <div>{formatNumber(parseFloat(vault.tvl), true, 2, true)}</div>
                    </div>
                )
            }
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
                        <div>Farm</div>
                        <div>APY</div>
                        <div>TVL (UST)</div>
                    </div>
                    {vaultStats &&
                        <div id="spectrum-vaults-list">
                            {sortAssets().map((key) => renderAsset(key))}
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
