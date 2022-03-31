import { ThemeData } from "scripts/storage/theme-storage";

export const templates = {
    light: {
        id: 'theme-default-light',
        version: 'v0.1',
        name: 'Light',
        settings: {
            '--bg-1': '#ffffff',
            '--bg-2': '#f0f0f0',
            '--bg-3': '#e2e2e2',
            '--txt-1': '#414141',
            '--txt-2': '#494949',
            '--shadow-1': '#0000003a',
            '--graph-background-color': '#73a9ff',
            '--graph-border-color': '#6889ff',
            '--icon-1': '#73a9ff',
            '--icon-2': '#6889ff',
            '--error': '#ff6464',
            '--widget-border-radius': '12px'
        }
    },
    dark: {
        id: 'theme-default-dark',
        version: 'v0.1',
        name: 'Dark',
        settings: {
            '--bg-1': '#141414',
            '--bg-2': '#1F1F1F',
            '--bg-3': '#292929',
            '--txt-1': '#d3d3d3',
            '--txt-2': '#d3d3d3',
            '--shadow-1': '#000000aa',
            '--graph-background-color': '#66adff',
            '--graph-border-color': '#55779d',
            '--icon-1': '#66adff',
            '--icon-2': '#55779d',
            '--error': '#ff6464',
            '--widget-border-radius': '12px'
        }
    }
} as {[name: string]: ThemeData}
