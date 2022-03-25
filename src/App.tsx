import './App.scss';
import React, { useState, useEffect } from 'react';
import Icons from 'components/Icons';
import Dashboard from 'components/Dashboard';
import About from 'components/About';
import Menu from 'components/Menu';
import Loading from 'components/Loading';
import { getTokensAndContracts } from 'scripts/Terra/TokensAndContracts';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getDefaultTemplate, getTheme, setTheme, getDashboards } from 'scripts/LocalStorage';
import { setGlobalState } from 'hooks/useGlobalState';
// TODO: Move chart js defaults to new location
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, defaults, Tooltip} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);
defaults.animation = false;

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Initialize dashboards and assets.
    useEffect(() => {
        setDarkMode(getTheme().dark);
        setGlobalState('dashboards', { ...getDashboards() });
        setGlobalState('selectedDashboard', getDefaultTemplate());
        getTokensAndContracts().then(() => {
            setLoading(false)
        })
    }, []);

    const setPageTheme = (dark: boolean) => {
        setTheme(dark);
        setDarkMode(dark);
    }

    const getAppClass = () => {
        return (darkMode ? 'theme-dark' : 'theme-light');
    }

    const links = [
        { 'name': 'Dashboard', 'path': '/dashboard' },
        { 'name': 'About', 'path': '/about' },
    ];

    return (
        <div id="app-component" className={getAppClass()}>
            <Icons />
            {loading ?
                <div id="app-loading">
                    <Loading />
                </div>
                :
                <React.Fragment>
                    <div id="header">
                        <div id="header-container">
                            <div id="header-title">
                                <svg height="32" width="32">
                                    <use href="#logo" />
                                </svg>
                                <div id="title-text">Terra Dashboard</div>
                                <Menu links={links} />
                            </div>
                            <div id="header-icons">
                                <svg id="theme-toggle" height="32" width="32" onClick={() => setPageTheme(!darkMode)}>
                                    <use href={darkMode ? '#luna' : '#terra'} />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div id="page-content">
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard/>} />
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
