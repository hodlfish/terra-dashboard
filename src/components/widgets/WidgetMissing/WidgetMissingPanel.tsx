import Panel from "components/panels/Panel";

interface WidgetMissingProps {
    name: string,
    events: any
}

function WidgetMissingPanel(props: WidgetMissingProps) {
    const {name} = props;

    return (
        <Panel
            svg={'logo'}
            title={'Widget Missing'}
            size={'small'}
            events={props.events}
            content={
                <div id="widget-missing-component">
                    <p className="bold">Widget "{name}" could not be found.</p>
                    <p>This widget may have been removed or renamed.</p>
                </div>
            }
        />
    );
}

export default WidgetMissingPanel;