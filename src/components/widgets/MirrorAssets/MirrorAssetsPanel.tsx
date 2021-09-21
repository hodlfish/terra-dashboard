import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import {getToken} from 'scripts/Terra/TokensAndContracts';
import { defaults, Settings, SettingsPanel, MirrorAssetSorts} from './MirrorAssetsSettings';
import { getMirrorAssets, MirrorAsset } from 'scripts/Terra/Mirror';

function MirrorAssetsPanel(props: WidgetProps) {
    const {name, sortBy} = Object.assign({...defaults}, props.settings as Settings);
    const [assets, setAssets] = useState<MirrorAsset[]>([]);

    const fetch = useCallback(async () => {
        const mirrorAssets = await getMirrorAssets();
        return () => {
            setAssets(mirrorAssets);
        }
    }, []);

    const sortAssets = () => {
        if (sortBy === MirrorAssetSorts.longAPR) {
            return assets.sort((a, b) => (
                    parseFloat(a.statistic.apr.long) < parseFloat(b.statistic.apr.long)
                ) ? 1 : -1)
        } else if (sortBy === MirrorAssetSorts.shortAPR) {
            return assets.sort((a, b) => (
                parseFloat(a.statistic.apr.short) < parseFloat(b.statistic.apr.short)
            ) ? 1 : -1)
        } else if (sortBy === MirrorAssetSorts.price) {
            return assets.sort((a, b) => (
                parseFloat(a.price.price) < parseFloat(b.price.price)
            ) ? 1 : -1)
        } else {
            return assets;
        }
    }

    const renderAsset = (asset: MirrorAsset) => {
        const token = getToken(asset.token);
        if (token) {
            const longAPR = `${(parseFloat(asset.statistic.apr.long) * 100).toFixed(2)}%`;
            const shortAPR = `${(parseFloat(asset.statistic.apr.short) * 100).toFixed(2)}%`;
            const price = `$${parseFloat(asset.price.price).toFixed(2)}`
            return (
                <div key={asset.token} className="mirror-asset-container">
                    <img src={token?.icon} alt={token.symbol}/>
                    <div>{token.symbol}</div>
                    <div>{longAPR}</div>
                    <div>{shortAPR}</div>
                    <div>{price}</div>
                </div>
            )
        }
        return '';
    }

    return (
        <Panel
            title={name}
            svg={'mirror'}
            size={'medium'}
            events={props.events}
            fetch={fetch}
            content={
                <div id="mirror-assets-component">
                    <div id="mirror-assets-labels">
                        <div></div>
                        <div>Ticker</div>
                        <div>Long APR</div>
                        <div>Short APR</div>
                        <div>Price</div>
                    </div>
                    <div id="mirror-assets-list">
                        {sortAssets().map(asset => renderAsset(asset))}
                    </div>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default MirrorAssetsPanel;