import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, defaults, Tooltip, BarElement, BarController} from 'chart.js'

export default function InitializeChartJS() {
    ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, BarController, Filler, Tooltip);
    defaults.animation = false;
}
