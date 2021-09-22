import React, {useState, useEffect, useRef} from "react";
import { useGlobalState } from 'hooks/useGlobalState';
import Modal from "./Modal";
import TextBox from "../TextBox";
import {
    getDashboard,
    getDashboards,
    saveDashboard,
    deleteDashboard,
    DashboardData,
    saveDashboards,
    getEmptyTemplate,
    getDefaultTemplate,
    isDashboardData,
    getCuratedTemplate
} from 'scripts/LocalStorage';
import { generateId } from "scripts/Helpers";

function SelectDashboardModal(props: any) {
    const inputFile = useRef<any>();
    const [dashboards, setDashboards] = useGlobalState('dashboards');
    const [selectedDashboard, setSelectedDashboard] = useGlobalState('selectedDashboard');
    const [dashboardList, setDashboardList] = useState<DashboardData[]>([]);

    useEffect(() => {
        const data = dashboards.dashboards.map(id => getDashboard(id));
        if (data !== undefined) {
            setDashboardList((data || []) as DashboardData[]);
        } else {
            setDashboardList([]);
        }
    }, [dashboards]);

    const createNewTemplate = () => {
        const newTemplate = getEmptyTemplate();
        saveDashboard(newTemplate);
        setSelectedDashboard(newTemplate);
        setDashboards({...getDashboards()});
    }

    const createCuratedTemplate = () => {
        const newTemplate = getCuratedTemplate();
        saveDashboard(newTemplate);
        setSelectedDashboard(newTemplate);
        setDashboards({...getDashboards()});
    }

    const onSelectDashboard = (dashboard: DashboardData) => {
        setSelectedDashboard(dashboard);
    }

    const removeDashboard = (dashboard: DashboardData, e: any) => {
        e.stopPropagation();
        deleteDashboard(dashboard.id);
        setSelectedDashboard(getDefaultTemplate() || getEmptyTemplate());
        setDashboards({...getDashboards()});
    }

    const getClass = (dashboard: DashboardData) => {
        let className = 'dashboard-list-item';
        if (selectedDashboard.id === dashboard.id) {
            className += ' selected';
        }
        return className;
    }

    const isDefault = (dashboard: DashboardData) => {
        return dashboards.default === dashboard.id;
    }

    const onSetDefault = (dashboard: DashboardData, e: any) => {
        e.stopPropagation();
        dashboards.default = dashboard.id;
        saveDashboards({...dashboards});
        setDashboards({...dashboards});
    }

    const onDownloadDashboard = (dashboard: DashboardData, e: any) => {
        e.stopPropagation();
        const json = JSON.stringify(dashboard, null, 4);
        const blob = new Blob([json],{type:'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${dashboard.name}.json`;
        document.body.appendChild(link);
        link.click();
    }

    const onUploadFileClicked = () => {
        if (inputFile && inputFile.current) {
            inputFile.current.click();
        }
    };

    const onUploadFile = (e: any) => {
        const files = e.target.files;
        if (files.length > 0) {
            const f = files[0];
            const reader = new FileReader();
            reader.onload = (data => {
                try {
                    const uploadedDashboard = JSON.parse(data.target?.result as string) as DashboardData;
                    const valid = isDashboardData(uploadedDashboard);
                    if (!valid) {
                        alert('Invalid dashboard JSON.')
                        return;
                    }
                    uploadedDashboard.id = generateId();
                    saveDashboard(uploadedDashboard);
                    setDashboards({...getDashboards()});
                    onSelectDashboard(uploadedDashboard);
                } catch (error) {
                    console.log(error)
                    alert('Unexpected upload value.  Please check the file format.')
                }
            });
            reader.readAsText(f);
            e.target.value = null;
        }
    }

    const onSetDashboardName = (dashboard: DashboardData, newName: string) => {
        const newDashboard = {...dashboard};
        newDashboard.name = newName;
        saveDashboard(newDashboard);
        setSelectedDashboard(newDashboard);
        setDashboards({...getDashboards()});
    }

    return (
        <Modal onClose={props.onClose} className={'select-dashboard-modal-component modal-three-sections'}>
            <div id="title">Dashboards</div>
            <div id="content">
                { dashboardList.map(dashboard => 
                    <div className={getClass(dashboard)} key={dashboard.id} onClick={() => onSelectDashboard(dashboard)}>
                        <div className="dashboard-title">
                            <TextBox value={dashboard.name} onUpdate={(newName: string) => onSetDashboardName(dashboard, newName)}/>
                        </div>
                        <div className="dashboard-icons">
                            <svg height="28" width="28" onClick={(e) => onDownloadDashboard(dashboard, e)}>
                                <use href="#download"/>
                            </svg>
                            <svg height="28" width="28" onClick={(e) => onSetDefault(dashboard, e)}>
                                <use href={isDefault(dashboard) ? "#star-filled" : "#star-empty"}/>
                            </svg>
                            <svg height="28" width="28" onClick={(e) => removeDashboard(dashboard, e)}>
                                <use href="#trash"/>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            <div id="new-dashboard-buttons">
                <div className="new-dashboard-button" onClick={createNewTemplate}>
                    <svg height="24" width="24">
                        <use href="#add"/>
                    </svg>
                    <div>Empty</div>
                </div>
                <div className="new-dashboard-button" onClick={createCuratedTemplate}>
                    <svg height="24" width="24">
                        <use href="#add"/>
                    </svg>
                    <div>Default</div>
                </div>
                <div className="new-dashboard-button" onClick={onUploadFileClicked}>
                    <svg height="24" width="24">
                        <use href="#upload"/>
                    </svg>
                    <div>Import</div>
                    <input ref={inputFile} type='file' 
                        accept=".json"
                        style={{display: 'none'}} 
                        onChange={onUploadFile}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default SelectDashboardModal;
