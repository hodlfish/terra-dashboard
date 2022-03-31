import './App.scss';
import React, { useState, useEffect } from 'react';
import Icons from 'components/Icons';
import Dashboard from 'components/Dashboard';
import About from 'components/About';
import Menu from 'components/Menu';
import Loading from 'components/Loading';
import { getTokensAndContracts } from 'scripts/Terra/TokensAndContracts';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setGlobalState } from 'hooks/useGlobalState';
import Settings from 'components/Settings';
import { getDashboards, getDefaultDashboard } from 'scripts/storage/dashboard-storage';
import { getDefaultTheme, getThemes } from 'scripts/storage/theme-storage';
import { applyThemeSettings } from 'scripts/Themes';

function App() {
    const [loading, setLoading] = useState<boolean>(true);

    // Initialize dashboards and assets.
    useEffect(() => {
        // Themes
        const theme = getDefaultTheme();
        applyThemeSettings(theme.settings);
        setGlobalState('themes', {... getThemes()});
        setGlobalState('selectedTheme', theme);

        // Dashboards
        setGlobalState('dashboards', { ...getDashboards() });
        setGlobalState('selectedDashboard', getDefaultDashboard());

        // Tokens and Contracts
        getTokensAndContracts().then(() => {
            setLoading(false)
        })
    }, []);

    const links = [
        { 'name': 'Dashboard', 'path': '/dashboard' },
        { 'name': 'Settings', 'path': '/settings' },
        { 'name': 'About', 'path': '/about' },
    ];

    return (
        <div id="app-component">
            <Icons />
            {loading ?
                <div id="app-loading">
                    <Loading />
                </div>
                :
                <React.Fragment>
                    <div id="header">
                        <div id="header-container">
                            <svg id="header-icon" height="32" width="32">
                                <use href="#logo" />
                            </svg>
                            <Menu links={links} />
                        </div>
                    </div>
                    <div id="page-content">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard/>} />
                            <Route path="/settings" element={<Settings/>} />
                            <Route path="/about" element={<About/>} />
                            <Route path="*" element={<Navigate replace to="/dashboard"/>} />
                        </Routes>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default App;
