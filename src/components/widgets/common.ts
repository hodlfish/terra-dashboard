import { getStyleColor } from "scripts/Helpers";

export const defaultLineChartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
}

export const defaultBarChartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
}

export const defaultPieChartOptions = {
    plugins: {
        legend: {
            display: false
        }
    }
}

export const MIN_REFRESH_RATE = 6;
export const MAX_REFRESH_RATE = 24 * 60 * 60;

export function hideImgOnError(e: any) {
    e.target.style.display = 'none';
}

export function getGraphBorderColor() {
    return getStyleColor('graph-border-color');
}

export function getGraphBackgroundColor() {
    return `${getStyleColor('graph-background-color')}44`;
}
