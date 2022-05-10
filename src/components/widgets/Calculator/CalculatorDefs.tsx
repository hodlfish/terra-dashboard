import InfoIcon from "components/InfoIcon";
import { useState } from "react";

interface CalculatorTypeProps {
    decimals: number
}

const DEFAULT_INTERVAL = 0;
const DEFAULT_COMPOUNDS = 12;
export function RateCalculator(props: CalculatorTypeProps) {
    const {decimals} = props;
    const [intervalRate, setIntervalRate] = useState<number>(DEFAULT_INTERVAL);
    const [compounds, setCompounds] = useState<number>(DEFAULT_COMPOUNDS);
    
    const calculateAPR = () => {
        return Math.max(-1, intervalRate / 100 * compounds);
    }

    const calculateAPY = () => {
        return Math.max(-1, Math.pow(1 + intervalRate / 100, compounds) - 1);
    }

    const formatPercent = (value: number) => {
        return `${(value * 100).toFixed(decimals)}%`;
    }

    return (
        <div className="data-list">
            <label>Interval Rate (%)</label>
            <input type="number" name="name" step={0.01} defaultValue={DEFAULT_INTERVAL} onChange={e => setIntervalRate(Number(e.target.value))}/>
            <label>Intervals per Year</label>
            <input type="number" name="name" step={1} defaultValue={DEFAULT_COMPOUNDS} onChange={e => setCompounds(Number(e.target.value))}/>
            <div>APR: {formatPercent(calculateAPR())}</div>
            <div>APY: {formatPercent(calculateAPY())}</div>
        </div>
    );
}

export function ImpermanentLossCalculator(props: CalculatorTypeProps) {
    const {decimals} = props;
    const [currentPriceA, setCurrentPriceA] = useState<number>(0);
    const [currentPriceB, setCurrentPriceB] = useState<number>(0);
    const [futurePriceA, setFuturePriceA] = useState<number>(0);
    const [futurePriceB, setFuturePriceB] = useState<number>(0);

    const calculateRateOfChange = (a: number, b: number) => {
        return (b - a) / a;
    }

    const formatPercent = (value: number) => {
        return `${(value * 100).toFixed(decimals)}%`;
    }

    const renderResults = () => {
        const aRate = calculateRateOfChange(currentPriceA, futurePriceA);
        const bRate = calculateRateOfChange(currentPriceB, futurePriceB);
        const heldValue = ((1 + aRate) * .5) + ((1 + bRate) * .5);
        const poolValue = Math.pow(1 + aRate, .5) * Math.pow(1 + bRate, .5);
        const il = Math.abs(poolValue / heldValue - 1);
        if (Number.isNaN(heldValue) || Number.isNaN(poolValue) || Number.isNaN(il)) {
            return <></>;
        } else {
            return (
                <>
                    <div className="title">
                        <InfoIcon info={'Calculations based on 50/50 split in a Constant Product pool.'}/>
                        Results
                    </div>
                    <div>Held: {formatPercent(heldValue - 1)}</div>
                    <div>Pooled: {formatPercent(poolValue - 1)}</div>
                    <div>IL: {formatPercent(il)}</div>
                </>
            );
        }
    }

    return <div className="data-list">
        <div className="title">Current Price</div>
        <div className="value-grid-horizontal">
            <div>
                <label>Asset A</label>
                <input type="number" min={0} step={0.01} defaultValue={0} onChange={e => setCurrentPriceA(Number(e.target.value))}/>
            </div>
            <div>
                <label>Asset B</label>
                <input type="number" min={0} step={0.01} defaultValue={0} onChange={e => setCurrentPriceB(Number(e.target.value))}/>
            </div>
        </div>
        <div className="title">Future Price</div>
        <div className="value-grid-horizontal">
            <div>
                <label>Asset A</label>
                <input type="number" min={0} step={0.01} defaultValue={0} onChange={e => setFuturePriceA(Number(e.target.value))}/>
            </div>
            <div>
                <label>Asset B</label>
                <input type="number" min={0} step={0.01} defaultValue={0} onChange={e => setFuturePriceB(Number(e.target.value))}/>
            </div>
        </div>
        {renderResults()}
    </div>;
}
