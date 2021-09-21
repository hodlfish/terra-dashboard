import { createGlobalState } from 'react-hooks-global-state';
import { DashboardData, Dashboards, getEmptyTemplate } from 'scripts/LocalStorage';

interface GlobalStateInterface {
  dashboards: Dashboards,
  selectedDashboard: DashboardData
}

const initialState = {
  dashboards: {
    dashboards: [],
    default: ''
  },
  selectedDashboard: getEmptyTemplate()
};

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState as GlobalStateInterface);

export {useGlobalState, getGlobalState, setGlobalState};