import { generateId } from "scripts/Helpers";
import { template as dashboardTemplate } from "templates/DashboardDefaults";

export const DASHBOARDS = 'dashboards';
export const DASHBOARD_PREFIX = 'dashboard';
export const DASHBOARD_TEMPLATE_VERSION = 'v0.1';

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
        id: generateId(DASHBOARD_PREFIX),
        version: DASHBOARD_TEMPLATE_VERSION,
        name: 'Untitled',
        dashboard: []
    } as DashboardData;
}

export function getCuratedTemplate() {
    const templateCopy = {...dashboardTemplate};
    templateCopy.id = generateId(DASHBOARD_PREFIX);
    return templateCopy;
}

export function getDefaultDashboard() {
    const dashboards = getDashboards();
    if (dashboards.default) {
        return getDashboard(dashboards.default) || getEmptyTemplate();
    } else if (dashboards.dashboards.length > 0) {
        return getDashboard(dashboards.dashboards[0]) || getEmptyTemplate();
    } else {
        return getEmptyTemplate();
    }
}

export function duplicateDashboard(dashboard: DashboardData, name?: string) {
    const newDashboard = {...dashboard};
    newDashboard.id = generateId(DASHBOARD_PREFIX);
    newDashboard.name = (name !== undefined) ? name : 'New Dashboard';
    saveDashboard(newDashboard);
    return newDashboard;
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
