import { generateId } from "scripts/Helpers";
import { templates as themeTemplates } from "templates/ThemeDefaults";

// Themes
export const THEMES = 'themes';
export const THEME_PREFIX = 'theme';
export const THEME_TEMPLATE_VERSION = 'v0.1';
const FALLBACK_THEME = themeTemplates.dark;

export interface Themes {
    themes: string[],
    default: string | undefined
}

export interface ThemeData {
    id: string,
    version: string,
    name: string,
    settings: { [name: string]: string }
}

export function duplicateTheme(theme: ThemeData) {
    const newTheme = {...theme};
    newTheme.id = generateId(THEME_PREFIX);
    newTheme.name = 'New Theme';
    saveTheme(newTheme);
    return newTheme;
}

export function getDefaultTheme() {
    const themes = getThemes();
    if (themes.default) {
        return getTheme(themes.default) || FALLBACK_THEME;
    } else if (themes.themes.length > 0) {
        return getTheme(themes.themes[0]) || FALLBACK_THEME;
    } else {
        return FALLBACK_THEME;
    }
}

export function getThemes(): Themes {
    const themesDataString = localStorage.getItem(THEMES);
    if (themesDataString === null) {
        saveThemes({themes: [], default: FALLBACK_THEME.id});
        return getThemes();
    }
    return JSON.parse(themesDataString) as Themes;
}

export function saveThemes(themes: Themes): void {
    localStorage.setItem(THEMES, JSON.stringify(themes));
}

export function getTheme(guid: string): ThemeData | undefined {
    for (const theme of Object.values(themeTemplates)) {
        if (theme.id === guid) {
            return theme;
        }
    }
    const jsonString = localStorage.getItem(guid);
    if (jsonString !== null)
        return JSON.parse(jsonString);
    return undefined;
}

export function deleteTheme(guid: string) {
    const theme = getTheme(guid);
    if (theme) {
        const themes = getThemes();
        themes.themes = themes.themes.filter(t => t !== guid);
        if (themes.themes.length > 0) {
            themes.default = themes.themes[0];
        } else {
            themes.default = undefined;
        }
        saveThemes(themes);
        localStorage.removeItem(guid);
    }
}

function _saveTheme(theme: ThemeData) {
    localStorage.setItem(theme.id, JSON.stringify(theme));
}

function _saveNewTheme(theme: ThemeData) {
    _saveTheme(theme);
    const themes = getThemes();
    themes.themes.push(theme.id)
    saveThemes(themes);
}

export function setDefaultTheme(theme: ThemeData): void {
    const themes = getThemes();
    themes.default = theme.id;
    saveThemes(themes);
}

export function saveTheme(theme: ThemeData, defaultTheme = false): void {
    const originalThemeData = getTheme(theme.id);
    if (!originalThemeData) {
        _saveNewTheme(theme)
    } else {
        _saveTheme(theme);
    }
    if (defaultTheme) {
        setDefaultTheme(theme);
    }
}
