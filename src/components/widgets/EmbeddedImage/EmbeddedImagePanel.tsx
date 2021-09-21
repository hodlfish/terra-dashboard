import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel, FitOptions } from './EmbeddedImageSettings';

function EmbeddedImagePanel(props: WidgetProps) {
    const {name, url, fit, size} = Object.assign({...defaults}, props.settings as Settings);

    const getStyle = () => {
        if (fit === FitOptions.contain) {
            return 'contain-img';
        } else if (fit === FitOptions.cover) {
            return 'cover-img';
        } else {
            return 'fill-img';
        }
    }

    return (
        <Panel
            svg={'logo'}
            size={size.toLowerCase()}
            title={name || ''}
            events={props.events}
            content={
                <div id="embedded-image-panel" >
                    <img alt="Custom" src={url} className={getStyle()}/>
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default EmbeddedImagePanel;