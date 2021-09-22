import { generateId } from "scripts/Helpers";
import { template } from "templates/default";

export const DASHBOARDS = 'dashboards';
export const THEME = 'theme';
export const CURRENT_TEMPLATE_VERSION = 'v0.1';

export interface Dashboards {
    dashboards: string[],
    default: string | undefined
}

export interface DashboardData {
    id: string,
    version: string,
    name: string,
    dashboard: any[]
}

export function isDashboardData(arg: any): arg is DashboardData {
    return (arg 
        && arg.id && typeof(arg.id) == 'string'
        && arg.version && typeof(arg.version) == 'string'
        && arg.name && typeof(arg.name) == 'string'
        && arg.dashboard && Array.isArray(arg.dashboard)
    );
}

export function getEmptyTemplate() {
    return {
        id: generateId(),
        version: CURRENT_TEMPLATE_VERSION,
        name: 'Untitled',
        dashboard: []
    } as DashboardData;
}

export function getCuratedTemplate() {
    const templateCopy = {...template};
    templateCopy.id = generateId();
    return templateCopy;
}

export function getDefaultTemplate() {
    const dashboards = getDashboards();
    if (dashboards.default) {
        return getDashboard(dashboards.default) || getEmptyTemplate();
    } else if (dashboards.dashboards.length > 0) {
        return getDashboard(dashboards.dashboards[0]) || getEmptyTemplate();
    } else {
        return getEmptyTemplate();
    }
}

export function getDashboards(): Dashboards {
    const dashboardDataString = localStorage.getItem(DASHBOARDS);
    if (dashboardDataString === null) {
        saveDashboards({dashboards: [], default: undefined});
        const defaultDashboard = getCuratedTemplate();
        saveDashboard(defaultDashboard, true);
        return getDashboards();
    }
    return JSON.parse(dashboardDataString) as Dashboards;
}

export function saveDashboards(dashboards: Dashboards): void {
    localStorage.setItem(DASHBOARDS, JSON.stringify(dashboards));
}

export function getDashboard(guid: string): DashboardData | undefined {
    const jsonString = localStorage.getItem(guid);
    if (jsonString !== null)
        return JSON.parse(jsonString);
    return undefined;
}

export function deleteDashboard(guid: string) {
    const dashboard = getDashboard(guid);
    if (dashboard) {
        const dashboards = getDashboards();
        dashboards.dashboards = dashboards.dashboards.filter(d => d !== guid);
        if (dashboards.dashboards.length > 0) {
            dashboards.default = dashboards.dashboards[0];
        } else {
            dashboards.default = undefined;
        }
        saveDashboards(dashboards);
        localStorage.removeItem(guid);
    }
}

function _saveDashboard(dashboard: DashboardData) {
    localStorage.setItem(dashboard.id, JSON.stringify(dashboard));
}

function _saveNewDashboard(dashboard: DashboardData) {
    _saveDashboard(dashboard);
    const dashboards = getDashboards();
    dashboards.dashboards.push(dashboard.id)
    saveDashboards(dashboards);
}

export function saveDashboard(dashboard: DashboardData, defaultDashboard = false): void {
    const originalDashboardData = getDashboard(dashboard.id);
    if (!originalDashboardData) {
        _saveNewDashboard(dashboard)
    } else {
        _saveDashboard(dashboard);
    }
    if (defaultDashboard) {
        const dashboards = getDashboards();
        dashboards.default = dashboard.id;
        saveDashboards(dashboards);
    }
}

// Themes
export interface Theme {
    dark: boolean
}

export function getTheme() {
    let themeDataString = localStorage.getItem(THEME);
    if (!themeDataString) {
        themeDataString = JSON.stringify({dark: true});
        localStorage.setItem(THEME, themeDataString);
    }
    return JSON.parse(themeDataString) as Theme;
}

export function setTheme(dark: boolean) {
    localStorage.setItem(THEME, JSON.stringify({dark: dark}))
}
