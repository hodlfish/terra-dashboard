import { createGlobalState } from 'react-hooks-global-state';
import { DashboardData, Dashboards, getDefaultDashboard } from 'scripts/storage/dashboard-storage';
import { getDefaultTheme, ThemeData, Themes } from 'scripts/storage/theme-storage';

interface GlobalStateInterface {
  dashboards: Dashboards,
  selectedDashboard: DashboardData,
  themes: Themes,
  selectedTheme: ThemeData,
  dragging: boolean // Determines if a widget is being moved
}

const initialState = {
  dashboards: {
    dashboards: [],
    default: ''
  },
  selectedDashboard: getDefaultDashboard(),
  themes: {
      themes: [],
      default: ''
  },
  selectedTheme: getDefaultTheme(),
  dragging: false
};

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState as GlobalStateInterface);

export {useGlobalState, getGlobalState, setGlobalState};
