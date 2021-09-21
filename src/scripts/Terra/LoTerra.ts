import axios from 'axios';
import { sources } from 'scripts/Settings';

const lotteryContract = 'terra1q2k29wwcz055q4ftx4eucsq6tg9wtulprjg75w';
// const cw20Contract = 'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr';

interface LoTerraConfig {
    admin: string,
    block_time_play: number,
    every_block_time_play: number,
    denom_stable: string,
    combination_len: number,
    jackpot_percentage_reward: number,
    token_holder_percentage_fee_reward: number,
    fee_for_drand_worker_in_percentage: number,
    prize_rank_winner_percentage: number[],
    poll_count: number,
    poll_default_end_height: number,
    price_per_ticket_to_register: number,
    terrand_contract_address: string,
    loterra_cw20_contract_address: string,
    altered_contract_address: string,
    safe_lock: boolean,
    lottery_counter: number,
    holders_bonus_block_time_end: number,
    bonus_burn_rate: number,
    bonus: number
}

export function getConfig(): Promise<LoTerraConfig> {
    return axios.get(`${sources.terraLCD.dataUrl}/wasm/contracts/${lotteryContract}/store?query_msg=%7B%22config%22:%7B%7D%7D`).then(response => {
        return response.data.result as LoTerraConfig;
    });
}

export function getPlayers(lotteryId: number): Promise<number> {
    return axios.get(`${sources.terraLCD.dataUrl}/wasm/contracts/${lotteryContract}/store?query_msg=%7B%22count_player%22:%7B%22lottery_id%22:${lotteryId}%7D%7D`).then(response => {
        return parseInt(response.data.result);
    });
}

export function getTickets(lotteryId: number): Promise<number> {
    return axios.get(`${sources.terraLCD.dataUrl}/wasm/contracts/${lotteryContract}/store?query_msg=%7B%22count_ticket%22:%7B%22lottery_id%22:${lotteryId}%7D%7D`).then(response => {
        return parseInt(response.data.result);
    });
}

export function getBalance(): Promise<number> {
    return axios.get(`${sources.terraLCD.dataUrl}/bank/balances/${lotteryContract}`).then(response => {
        return parseInt(response.data.result.find((d: any) => d.denom === 'uusd').amount);
    });
}
