import { useState, useCallback } from "react";
import { getWalletContents, WalletNativeToken, WalletContractToken } from 'scripts/Terra/Terra';
import { nativeTokens, cw20Tokens } from 'scripts/Terra/TokensAndContracts';
import Panel, { WidgetProps } from "components/panels/Panel";
import { Settings, defaults, SettingsPanel } from "./WalletSettings";
import { formatNumber } from "scripts/Helpers";

function WalletPanel(props: WidgetProps) {
    const { name, addr, hideLow, decimals } = Object.assign({...defaults}, props.settings as Settings);
    const [walletNativeTokens, setWalletNativeTokens] = useState<WalletNativeToken[]>([]);
    const [walletCW20Tokens, setWalletCW20Tokens] = useState<WalletContractToken[]>([]);

    const fetch = useCallback(async () => {
        const tokens = [] as string[];
        cw20Tokens.forEach(t => tokens.push(t.token));
        const data = await getWalletContents(addr, tokens);
        return () => {
            setWalletNativeTokens(data.native);
            setWalletCW20Tokens(data.cw20);
        }
    }, [addr]);

    const renderNativeToken = (token: WalletNativeToken) => {
        const tokenDetails = nativeTokens.get(token.denom);
        return (
            <div className="wallet-balance" key={token.denom}>
                <img alt="Token Icon" width="32" height="32" src={tokenDetails?.icon}/>
                <div className="name">{tokenDetails?.symbol}</div>
                <div className="balance">{formatNumber(token.balance, true, decimals)}</div>
            </div>
        );
    }

    const renderCW20Token = (token: WalletContractToken) => {
        const tokenDetails = cw20Tokens.get(token.contract);
        return (
            <div className="wallet-balance" key={token.contract}>
                <img alt="Token Icon" width="32" height="32" src={tokenDetails?.icon}/>
                <div className="name">{tokenDetails?.symbol}</div>
                <div className="balance">{formatNumber(token.balance, true, decimals)}</div>
            </div>
        );
    }

    const filteredNativeTokens = () => {
        if (hideLow) {
            return walletNativeTokens.filter(token => token.balance > 500000);
        } else {
            return walletNativeTokens;
        }
    }

    const filteredCW20Tokens = () => {
        const filteredTokens = walletCW20Tokens.filter(t => t.balance > 0);
        if (hideLow) {
            return filteredTokens.filter(token => token.balance > 500000);
        } else {
            return filteredTokens;
        }
    }

    return (
        <Panel
            title={name}
            svg={'wallet'}
            events={props.events}
            fetch={fetch}
            content={
                <div id="wallet-panel-component">
                    {filteredNativeTokens().map(token => 
                        renderNativeToken(token)
                    )}
                    {filteredCW20Tokens().map((token: any) => 
                        renderCW20Token(token)
                    )}
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default WalletPanel;