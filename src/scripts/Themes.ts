import { getDefaultTheme } from "./storage/theme-storage";

export enum ThemeSettingType {
    COLOR, NUMBER
}

export interface ThemeSetting {
    name: string,
    type: ThemeSettingType,
    min?: number,
    max?: number,
    formatter?: string
}

export const ThemeSettings: { [name: string]: ThemeSetting } = {
    '--bg-1': {
        name: 'Background 1',
        type: ThemeSettingType.COLOR
    },
    '--bg-2': {
        name: 'Background 2',
        type: ThemeSettingType.COLOR
    },
    '--bg-3': {
        name: 'Background 3',
        type: ThemeSettingType.COLOR
    },
    '--txt-1': {
        name: 'Text Primary',
        type: ThemeSettingType.COLOR
    },
    '--txt-2': {
        name: 'Text Secondary',
        type: ThemeSettingType.COLOR
    },
    '--shadow-1': {
        name: 'Widget Shadow',
        type: ThemeSettingType.COLOR
    },
    '--graph-border-color': {
        name: 'Graph Line',
        type: ThemeSettingType.COLOR
    },
    '--graph-background-color': {
        name: 'Graph Fill',
        type: ThemeSettingType.COLOR
    },
    '--icon-1': {
        name: 'Icon Primary',
        type: ThemeSettingType.COLOR
    },
    '--icon-2': {
        name: 'Icon Secondary',
        type: ThemeSettingType.COLOR
    },
    '--error': {
        name: 'Error',
        type: ThemeSettingType.COLOR
    },
    '--widget-border-radius': {
        name: 'Widget Border Radius',
        type: ThemeSettingType.NUMBER,
        min: 0,
        max: 48,
        formatter: '?px'
    }
}

export function Initialize() {
    applyThemeSettings(getDefaultTheme().settings);
}

export function applyThemeSettings(settings: { [name: string]: string }) {
    const root = document.querySelector(':root');
    if (root) {
        root.setAttribute('style', 
            Object.entries(settings).map(([key, value]) => {
                return (key in ThemeSettings) ? `${key}:${value};` : '';
            }).join('')
        );
    }
}
