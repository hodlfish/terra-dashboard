import {useState, useEffect, useRef} from "react";
import { useGlobalState } from 'hooks/useGlobalState';
import Modal from "./Modal";
import TextBox from "../TextBox";
import { downloadJSON } from "scripts/Helpers";
import {
    getDashboard,
    getDashboards,
    saveDashboard,
    deleteDashboard,
    DashboardData,
    saveDashboards,
    getEmptyTemplate,
    getDefaultDashboard,
    isDashboardData,
    getCuratedTemplate,
    duplicateDashboard
} from 'scripts/storage/dashboard-storage';

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

    const onCreateNewDashboard = () => {
        const newTemplate = getEmptyTemplate();
        saveDashboard(newTemplate);
        setSelectedDashboard(newTemplate);
        setDashboards({...getDashboards()});
    }

    const onCreateDefaultDashboard = () => {
        const newTemplate = getCuratedTemplate();
        saveDashboard(newTemplate);
        setSelectedDashboard(newTemplate);
        setDashboards({...getDashboards()});
    }

    const onSelectDashboard = (dashboard: DashboardData) => {
        setSelectedDashboard(dashboard);
    }

    const removeDashboard = (dashboard: DashboardData) => {
        deleteDashboard(dashboard.id);
        setSelectedDashboard(getDefaultDashboard() || getEmptyTemplate());
        setDashboards({...getDashboards()});
    }

    const getClass = (dashboard: DashboardData) => {
        let className = 'list-item';
        if (selectedDashboard.id === dashboard.id) {
            className += ' selected';
        }
        return className;
    }

    const isDefault = (dashboard: DashboardData) => {
        return dashboards.default === dashboard.id;
    }

    const onSetDefault = (dashboard: DashboardData) => {
        dashboards.default = dashboard.id;
        saveDashboards({...dashboards});
        setDashboards({...dashboards});
    }

    const onDownloadDashboard = (dashboard: DashboardData) => {
        downloadJSON(dashboard.name, dashboard);
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
                    let uploadedDashboard = JSON.parse(data.target?.result as string) as DashboardData;
                    const valid = isDashboardData(uploadedDashboard);
                    if (!valid) {
                        alert('Invalid dashboard JSON.')
                        return;
                    }
                    uploadedDashboard = duplicateDashboard(uploadedDashboard, uploadedDashboard.name);
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
            <div style={{overflow: 'auto'}}>
                { dashboardList.map(dashboard => 
                    <div className={getClass(dashboard)} key={dashboard.id} onClick={() => onSelectDashboard(dashboard)}>
                        <div className="list-item-header">
                            <div className="list-item-title">
                                <TextBox value={dashboard.name} onUpdate={(newName: string) => onSetDashboardName(dashboard, newName)}/>
                            </div>
                            <div className="list-item-toolbar" onClick={(e) => e.stopPropagation()}>
                                <svg className="toolbar-item" height="28" width="28" onClick={() => onDownloadDashboard(dashboard)}>
                                    <use href="#download"/>
                                </svg>
                                <svg className="toolbar-item" height="28" width="28" onClick={() => onSetDefault(dashboard)}>
                                    <use href={isDefault(dashboard) ? "#star-filled" : "#star-empty"}/>
                                </svg>
                                <svg className="toolbar-item" height="28" width="28" onClick={() => removeDashboard(dashboard)}>
                                    <use href="#trash"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="list-item-footer">
                <div className="footer-button" onClick={onCreateNewDashboard}>Empty</div>
                <div className="footer-button" onClick={onCreateDefaultDashboard}>Default</div>
                <div className="footer-button" onClick={onUploadFileClicked}>
                    Import
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
