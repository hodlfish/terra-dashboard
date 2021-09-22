import React, {useEffect, useRef, useState} from 'react';
import AddWidgetModal from "./modals/AddWidgetModal";
import { saveDashboard, getDashboard, getDashboards} from 'scripts/LocalStorage';
import { useGlobalState, setGlobalState } from 'hooks/useGlobalState';
import TextBox from './TextBox';
import widgets from './widgets/WidgetRegistry';
import WidgetMissingPanel from './widgets/WidgetMissing/WidgetMissingPanel';
import WidgetErrorPanel from './widgets/WidgetError/WidgetErrorPanel';
import { PanelEventProps } from './panels/Panel';
import SelectDashboardModal from './modals/SelectDashboardModal';
import ErrorBoundary from './widgets/WidgetError/ErrorBoundary';
import { HoverLocation } from 'components/panels/useDragState';

function Dashboard() {
    const [selectedDashboard, setSelectedDashboard] = useGlobalState('selectedDashboard');
    const [addWidgetModalOpen, setAddWidgetModalOpen] = useState<boolean>(false);
    const [dashboardModalOpen, setDashboardModalOpen] = useState<boolean>(false);
    const [showSaveIcon, setShowSaveIcon] = useState<boolean>(false);

    useEffect(() => {
        const savedDashboard = getDashboard(selectedDashboard.id);
        setShowSaveIcon(JSON.stringify(selectedDashboard) !== JSON.stringify(savedDashboard));
    }, [selectedDashboard]);

    const onSetDashboardName = (newName: string) => {
        const newDashboard = {...selectedDashboard};
        newDashboard.name = newName;
        saveDashboard(newDashboard);
        setSelectedDashboard(newDashboard);
        setGlobalState('dashboards', {...getDashboards()});
    }

    const onSaveDashboard = () => {
        saveDashboard(selectedDashboard);
        setSelectedDashboard({...selectedDashboard});
        setGlobalState('dashboards', {...getDashboards()});
    }

    const onRemoveWidget = (widget: any) => {
        selectedDashboard.dashboard = selectedDashboard.dashboard.filter(w => w !== widget)
        setSelectedDashboard({...selectedDashboard});
    }

    const onUpdateWidget = (id: string, settings: any) => {
        const index = selectedDashboard.dashboard.findIndex(w => w.id === id);
        selectedDashboard.dashboard[index].settings = settings;
        setSelectedDashboard({...selectedDashboard});
    }

    const onMoveWidget = (widget: any, moveUp = true) => {
        const oldIndex = selectedDashboard.dashboard.findIndex(w => w === widget);
        if (!(moveUp && oldIndex === 0) && !(!moveUp && oldIndex === selectedDashboard.dashboard.length - 1)) {
            const newIndex = oldIndex + (moveUp ? -1 : 1);
            const temp = selectedDashboard.dashboard[newIndex];
            selectedDashboard.dashboard[newIndex] = selectedDashboard.dashboard[oldIndex]
            selectedDashboard.dashboard[oldIndex] = temp;
            setSelectedDashboard({...selectedDashboard});
        }
    }

    const dragWidget = useRef<any>();
    const hoverWidget = useRef<any>();

    const onHoverOver = (hoverLocation: HoverLocation, widget: any) => {
        hoverWidget.current = [hoverLocation, widget];
    }

    const onDragStart = (widget: any) => {
        dragWidget.current = widget;
    }

    const onDragEnd = () => {
        if (dragWidget.current && hoverWidget.current) {
            if ([HoverLocation.Right, HoverLocation.Left].includes(hoverWidget.current[0])) {
                let newWidgets = selectedDashboard.dashboard.filter(d => d !== dragWidget.current);
                const hoverIndex = newWidgets.indexOf(hoverWidget.current[1]);
                const newIndex = hoverIndex + (hoverWidget.current[0] === HoverLocation.Left ? 0 : 1);
                newWidgets = [...newWidgets.slice(0, newIndex), dragWidget.current, ...newWidgets.slice(newIndex, newWidgets.length)];
                selectedDashboard.dashboard = newWidgets;
                setSelectedDashboard({...selectedDashboard});
            }
        }
        hoverWidget.current = null;
        dragWidget.current = null;
    }

    const renderWidget = (widget: any, index: number) => {
        const widgetComponent = widgets.find(w => w.value === widget.type);
        const events = {
            onUpdate: (settings: any) => onUpdateWidget(widget.id, settings),
            onRemove: () => onRemoveWidget(widget),
            onHover: (location: HoverLocation) => onHoverOver(location, widget),
            onDragStart: () => onDragStart(widget),
            onDragEnd: () => onDragEnd()
        } as PanelEventProps;
        if (index > 0) {
            events.onMoveUp = () => onMoveWidget(widget, true)
        }
        if (index < selectedDashboard.dashboard.length - 1) {
            events.onMoveDown = () =>  onMoveWidget(widget, false);
        }
        if (widgetComponent !== undefined) {
            return (
                <ErrorBoundary key={widget.id} errorChildren={(e: any) => renderErrorWidget(widget, events, e)}>
                    {React.createElement(widgetComponent.component, {
                        settings: widget.settings,
                        events: events,
                        key: widget.id
                    })}
                </ErrorBoundary>
            )
        } else {
            return React.createElement(WidgetMissingPanel, {
                name: widget.type,
                events: events,
                key: widget.id
            })
        }
    }

    const renderErrorWidget = (widget: any, events: PanelEventProps, error: any) => {
        return React.createElement(WidgetErrorPanel, {
            name: widget.type,
            error: error,
            events: events,
            key: widget.id
        });
    }

    return (
        <div id="dashboard-component">
            {dashboardModalOpen &&
                <SelectDashboardModal onClose={() => setDashboardModalOpen(false)}/>
            }
            <div id="dashboard-toolbar">
                <div id="dashboard-toolbar-container">
                    <div id="dashboard-title" className={showSaveIcon ? 'save-name' : ''}>
                        <svg className="dashboard-tool" height="28" width="28" onClick={() => setDashboardModalOpen(true)}>
                            <use href={"#hamburger"}/>
                        </svg>
                        <TextBox value={selectedDashboard.name} onUpdate={(newValue: string) => onSetDashboardName(newValue)}/>
                    </div>
                    <div id="dashboard-tools">
                        { showSaveIcon &&
                            <svg className="dashboard-tool" height="28" width="28" onClick={onSaveDashboard}>
                                <use href={"#save"}/>
                            </svg>
                        }
                        <svg className="dashboard-tool" height="28" width="28" onClick={() => setAddWidgetModalOpen(true)}>
                            <use href={"#add"}/>
                        </svg>
                        {addWidgetModalOpen &&
                            <AddWidgetModal onClose={() => setAddWidgetModalOpen(false)}/>
                        }
                    </div>
                </div>
            </div>

            <div id="dashboard-content">
                {selectedDashboard.dashboard && selectedDashboard.dashboard.length > 0 ?
                    selectedDashboard.dashboard.map((widget, index) => renderWidget(widget, index))
                    :
                    <div id="add-widget-button" onClick={() => setAddWidgetModalOpen(true)}>
                        <svg>
                            <use href="#add"/>
                        </svg>
                    </div>
                }
            </div>
        </div>
    );
}

export default Dashboard;
