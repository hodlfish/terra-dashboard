import { useState, useCallback } from "react";
import { getTransactions, TransactionData } from "scripts/Terra/Terra";
import Panel, { WidgetProps } from "components/panels/Panel";
import { Settings, defaults, SettingsPanel } from './RecentTransactionsSettings';

function RecentTransactionsPanel(props: WidgetProps) {
    const {name, addr} = Object.assign({...defaults}, props.settings as Settings);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);

    const refresh = useCallback(async () => {
        const transactions = await getTransactions(addr);
        return () => {
            setTransactions(transactions.txs);
        }
    }, [addr]);

    const extraterrestrialLink = (transaction: TransactionData) => {
        return `https://finder.extraterrestrial.money/${transaction.chainId}/tx/${transaction.txhash}`;
    }

    const terraFinder = (transaction: TransactionData) => {
        return `https://finder.terra.money/${transaction.chainId}/tx/${transaction.txhash}`
    }

    const convertTimestamp = (transaction: TransactionData) => {
        return new Date(transaction.timestamp).toLocaleString();
    }

    return (
        <Panel
            title={name}
            svg={'terra'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div id="recent-transactions-component">
                    {transactions.map(transaction => 
                        <div key={transaction.txhash} className="transaction-container">
                            <div className="datetime">{convertTimestamp(transaction)}</div>
                            <div className="memo-container">
                                <div className="memo">
                                    {transaction.memo ? transaction.memo : 'No Memo'}
                                </div>
                            </div>
                            <div className="links">
                                <a href={extraterrestrialLink(transaction)} target="_blank" rel="noreferrer">
                                    <img alt="Extraterrestrial Icon" src="https://finder.extraterrestrial.money/favicon.png"/>
                                </a>
                                <a href={terraFinder(transaction)} target="_blank" rel="noreferrer">
                                    <img alt="TerraFinder Icon" src="https://finder.terra.money/favicon.png"/>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default RecentTransactionsPanel;
