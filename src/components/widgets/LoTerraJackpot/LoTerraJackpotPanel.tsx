import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './LoTerraJackpotSettings';
import { getConfig, getPlayers, getTickets, getBalance } from 'scripts/Terra/LoTerra';
import { hideImgOnError } from "../common";
import { formatNumber } from "scripts/Helpers";
import { sources } from 'scripts/Settings';

interface LotteryData {
    tickets: any,
    players: any,
    jackpot: any,
    ticketsPerPlayer: any,
    config: any
}

function LoTerraJackpotPanel(props: WidgetProps) {
    const {name} = Object.assign({...defaults}, props.settings as Settings);
    const [lotteryData, setLotteryData] = useState<LotteryData>();

    const refresh = useCallback(async () => {
        const config = await getConfig();
        const tickets = await getTickets(config.lottery_counter);
        const players = await getPlayers(config.lottery_counter);
        const balance = await getBalance();
        return () => {
            setLotteryData({
                tickets: tickets,
                players: players,
                ticketsPerPlayer: (tickets / players).toFixed(2),
                jackpot: formatNumber(balance * (config.jackpot_percentage_reward / 100), true, 2),
                config: config
            });
        }
    }, []);

    return (
        <Panel
            title={name}
            img={sources.loterraAPI.icon}
            size={'small'}
            events={props.events}
            refresh={refresh}
            content={
                <div className="small-data-list-widget">
                    <div className="data-list space-evenly">
                        <div className="data-item">
                            <div className="title">Jackpot</div>
                            <div className="data">{lotteryData?.jackpot} UST</div>
                        </div>
                        <div className="data-item">
                            <div className="title">Players</div>
                            <div className="data">{lotteryData?.players}</div>
                        </div>
                        <div className="data-item">
                            <div className="title">Tickets</div>
                            <div className="data">{lotteryData?.tickets}</div>
                        </div>
                        <div className="data-item">
                            <div className="title">Tickets Per Player</div>
                            <div className="data">{lotteryData?.ticketsPerPlayer}</div>
                        </div>
                    </div>
                    <img className="background-img" alt="LoTerra Icon" src={sources.loterraAPI.icon} onError={hideImgOnError}/>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default LoTerraJackpotPanel;
