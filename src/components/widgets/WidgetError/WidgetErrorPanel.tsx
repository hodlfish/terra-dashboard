import Panel from "components/panels/Panel";

interface WidgetErrorProps {
    name: string,
    error: any,
    events: any
}

function WidgetErrorPanel(props: WidgetErrorProps) {
    const {name, error} = props;

    return (
        <Panel
            svg={'logo'}
            title={'Widget Error'}
            size={'small'}
            events={props.events}
            content={
                <div id="widget-error-component">
                    <p className="bold">Widget "{name}" encountered an error!</p>
                    <p>This widget may have been corrupted or contains a bug.  Please try the page again later or remove this widget.</p>
                    <p>To report a bug, contact us on twitter.</p>
                    <p className="error">{error && error.message}</p>
                </div>
            }
        />
    );
}

export default WidgetErrorPanel;