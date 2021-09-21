export const defaultLineChartOptions = {
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
