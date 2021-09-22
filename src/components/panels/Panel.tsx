import React, { useState, useEffect, useCallback } from "react";
import Loading from "components/Loading";
import { useGlobalState as useDragState, HoverLocation } from "./useDragState";
import ClickAwayListener from "react-click-away-listener";
import useIsMounted from "hooks/useIsMounted";
import useInterval from "hooks/useInterval";
import { MIN_REFRESH_RATE } from "components/widgets/common";

export interface WidgetProps {
    settings: any,
    events: PanelEventProps
}

export interface PanelEventProps {
    onRemove: any,
    onUpdate?: any,
    onCancelUpdate?: any,
    onMoveUp?: any,
    onMoveDown?: any,
    onHover?: any,
    onDragStart?: any,
    onDragEnd?: any
}

interface PanelProps {
    title: string,
    content: any,
    size?: string | undefined,
    loading?: boolean,
    error?: any
    svg?: string,
    img?: string,
    fetch?: any,
    parse?: any,
    refreshRate?: any,
    events: PanelEventProps,
    settingsComponent?: any,
    settings?: any
}

function Panel(props: PanelProps) {
    const {
        title = '',
        content = props.content,
        size = 'small',
        svg = undefined,
        img = undefined,
        events = props.events,
        fetch = undefined,
        refreshRate = undefined,
        settingsComponent = undefined,
        settings = undefined,
    } = props;

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [showTools, setShowTools] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const isMounted = useIsMounted();
    useInterval(
        () => refresh(false),
        refreshRate ? Math.max(MIN_REFRESH_RATE, refreshRate) * 1000 : refreshRate
    );

    const refresh = useCallback(
        async (showLoading = true) => {
            try {
                setLoading(showLoading);
                setError(false);
                if (!fetch) {
                    setLoading(false);
                    return;
                }
                const setData = await fetch();
                if (isMounted()) {
                    setData();
                    setLoading(false);
                }
            }
            catch (error) {
                if (isMounted()) {
                    setError(error);
                    setLoading(false);
                }
            }
        }, [fetch, isMounted]
    );
    
    useEffect(() => {refresh()}, [refresh]);

    const renderPanelContent = () => {
        if (settingsOpen) {
            const baseCancel = events.onCancelUpdate;
            events.onCancelUpdate = () => {
                if (baseCancel) {
                    baseCancel();
                }
                setSettingsOpen(false);
            }
            const baseUpdate = events.onUpdate;
            events.onUpdate = (settings: any) => {
                if (baseUpdate) {
                    baseUpdate(settings);
                }
                setSettingsOpen(false);
            }
            return (
                React.createElement(settingsComponent, {
                    settings: settings,
                    onUpdate: events.onUpdate,
                    onCancel: events.onCancelUpdate
                })
            );
        } else if (loading) {
            return (<Loading/>);
        } else if (error) {
            return (
                <div id="widget-error">
                    <p className="bold">Failed to load "{title}"</p>
                    <p>Please try again later.  This can occur during network downtime.</p>
                    {error.message && 
                        <p className="error">{error.message}</p>
                    }
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    {content}
                </React.Fragment>
            );
        }
    }

    // Drag and drop logic
    const [drag, setDrag] = useState<boolean>(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0});
    const [dragging, setDragging] = useDragState('dragging');
    // NOTE: Using hoverSpot to highlight divs instead of onhover
    //       Safari does not recognize onhover selector while dragging.
    const [hoverLocation, setHoverLocation] = useState<HoverLocation>(HoverLocation.None)

    useEffect(() => {
        setHoverLocation(HoverLocation.None);
        const setMousePosition = (e: any) => {
            e.preventDefault();
            setPosition({ x: e.clientX, y: e.clientY });
        }
        if (drag) {
            window.addEventListener('mousemove', setMousePosition, false);
            window.addEventListener('mouseup', () => setDrag(false), false);
            setDragging(true)
            setHoverLocation(HoverLocation.Center)
            events.onDragStart();
        }
        return () => {
            window.removeEventListener("mousemove", setMousePosition, false);
            window.removeEventListener('mouseup', () => setDrag(false), false);
            setDragging(false)
            events.onDragEnd();
        };
    }, [dragging, drag, events, setDragging]);

    const onMouseDown = (e: any) => {
        setDrag(true);
        setDragOffset({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
        setPosition({ x: e.clientX, y: e.clientY });
    }

    const getPanelClass = () => {
        return `${size} ${drag ? 'dragging' : ''}`
    }

    const getPanelStyle = () => {
        if (drag) {
            // Note: - 10 for margin.
            return {
                'left': position.x - dragOffset.x - 10,
                'top': position.y - dragOffset.y - 10
            }
        }
        return {};
    }

    const onMouseEnter = (location: HoverLocation) => {
        setHoverLocation(location);
        if (events.onHover) {
            events.onHover(location);
        }
    }

    return (
        <React.Fragment>
            {drag && 
                <div id="panel-component" 
                    className={`${size} pseudo ${hoverLocation === HoverLocation.Center && 'active'}`}
                    onMouseEnter={() => onMouseEnter(HoverLocation.Center)}
                    onMouseLeave={() => onMouseEnter(HoverLocation.None)}/>
            }
            <ClickAwayListener onClickAway={() => setShowTools(false)}>
                <div id="panel-component" className={getPanelClass()} style={getPanelStyle()}>
                    {(dragging && !drag) && 
                        <div className="widget-hover-spots">
                            <div className={`left-hover ${hoverLocation === HoverLocation.Left && 'active'}`} 
                                onMouseEnter={() => onMouseEnter(HoverLocation.Left)}
                                onMouseLeave={() => onMouseEnter(HoverLocation.None)}/>
                            <div className={`right-hover ${hoverLocation === HoverLocation.Right && 'active'}`}
                                onMouseEnter={() => onMouseEnter(HoverLocation.Right)}
                                onMouseLeave={() => onMouseEnter(HoverLocation.None)}/>
                        </div>
                    }
                    <div className="widget-header">
                        { !showTools ?
                            <div className="widget-header-title">
                                <div className="widget-icon">
                                    { svg && 
                                        <svg>
                                            <use href={`#${svg}`}/>
                                        </svg>
                                    }
                                    { (!svg && img) && 
                                        <img alt={`${title}-icon`} src={img}/>
                                    }
                                </div>
                                <div className="widget-title">{title}</div>
                                <div className="title-drag-mask" onMouseDown={onMouseDown}/>
                            </div>
                            :
                            <div className="widget-header-tools">
                                { fetch !== undefined &&
                                    <svg className="widget-settings" height="24" width="24" onClick={() => refresh()}>
                                        <use href="#refresh"/>
                                    </svg>
                                }
                                { settingsComponent !== undefined &&
                                    <svg className="widget-settings" height="24" width="24" onClick={() => setSettingsOpen(!settingsOpen)}>
                                        <use href="#gear"/>
                                    </svg>
                                }
                                { events.onMoveUp !== undefined &&
                                    <svg className="widget-settings" height="24" width="24" onClick={() => events.onMoveUp()}>
                                        <use href="#up-arrow"/>
                                    </svg>
                                }
                                { events.onMoveDown !== undefined &&
                                    <svg className="widget-settings" height="24" width="24" onClick={() => events.onMoveDown()}>
                                        <use href="#down-arrow"/>
                                    </svg>
                                }
                                <svg className="widget-settings" height="24" width="24" onClick={() => events.onRemove()}>
                                    <use href="#close"/>
                                </svg>
                            </div>
                        }
                        <svg className={`show-tools-icon ${showTools ? 'active' : ''}`} onClick={() => setShowTools(!showTools)}>
                            <use href="#ellipses"/>
                        </svg>
                    </div>
                    { renderPanelContent() }
                </div>
            </ClickAwayListener>
        </React.Fragment>
    );
}

export default Panel;
