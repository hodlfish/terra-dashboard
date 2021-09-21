import React, {useState} from "react";
import { useGlobalState } from 'hooks/useGlobalState';
import Modal from "./Modal";
import widgets, { RegisteredWidget, groups } from "../widgets/WidgetRegistry";
import { generateId } from "scripts/Helpers";

interface FilteredWidgets {
    group: string,
    widgets: RegisteredWidget[]
}

function AddWidgetModal(props: any) {
    const [selectedDashboard, setSelectedDashboard] = useGlobalState('selectedDashboard');
    const [selectedWidget, setSelectedWidget] = useState<any>();
    const [filterText, setFilterText] = useState<string>('');

    const onSelectWidget = (widget: any) => {
        if (widget.settingsComponent) {
            setSelectedWidget(widget);
        } else {
            onConfirmWidget(widget, widget.defaultSettings);
        }
    }

    const renderWidgetSettings = () => {
        return React.createElement(selectedWidget.settingsComponent, {
            settings: selectedWidget.defaultSettings,
            onUpdate: (settings: any) => onConfirmWidget(selectedWidget, settings),
            onCancel: onCancelWidget
        });
    }

    const getFilteredWidgets = () => {
        const filteredWidgetsMap = new Map() as Map<string, RegisteredWidget[]>;
        widgets.forEach(w => {
            if (w.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase() || '')) {
                filteredWidgetsMap.set(w.group, [...filteredWidgetsMap.get(w.group) || [], w]);
            }
        });
        const filteredWidgets = Array.from(filteredWidgetsMap.entries()).map(([key, value]) => {
            return {
                group: key,
                widgets: value
            }
        }).sort((a,b) => a.group === groups.terra ? -1 : b.group === groups.terra ? 1 : a.group.localeCompare(b.group));
        return filteredWidgets as FilteredWidgets[];
    }

    const onConfirmWidget = (widget: any, settings: any) => {
        selectedDashboard.dashboard.push({
            id: generateId(),
            type: widget.value,
            settings: settings
        })
        setSelectedDashboard({...selectedDashboard});
        props.onClose();
    }

    const onCancelWidget = () => {
        setSelectedWidget(undefined);
    }

    return (
        <Modal onClose={props.onClose} className={'add-widget-modal-component ' + (selectedWidget ? 'modal-two-sections' : 'widgets-modal')}>
            <div id="title">{selectedWidget ? selectedWidget.name : 'Add Widget'}</div>
            {selectedWidget ?
                renderWidgetSettings()
                :
                <React.Fragment>
                    <div id="filter-input">
                        <input type="text" defaultValue={filterText} placeholder='Widget name...' onChange={e => setFilterText(e.target.value)}/>
                    </div>
                    <div id="widget-groups">
                        {getFilteredWidgets().map(widgetsGroup => 
                            <div key={widgetsGroup.group}>
                                <div className="widget-group-title">{widgetsGroup.group}</div>
                                <div className="widget-list">
                                    {widgetsGroup.widgets.map(widget => 
                                        <div className="widget-item" key={widget.value} onClick={() => onSelectWidget(widget)}>
                                            <div>{widget.name}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            }
        </Modal>
    );
}

export default AddWidgetModal;