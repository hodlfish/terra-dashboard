export const FitOptions = {
    contain: 'Contain',
    cover: 'Cover',
    fill: ' Fill'
}

export const WidgetSizes = {
    small: 'Small',
    medium: 'Medium',
    large: 'Large'
}

export const defaults = {
    fit: FitOptions.contain,
    size: WidgetSizes.medium
}

export interface Settings {
    name?: string,
    url: string,
    fit: string,
    size: string
}

interface SettingsPanelProps {
    settings: Settings,
    onUpdate: any,
    onCancel?: any
}

export function SettingsPanel(props: SettingsPanelProps) {
    const {name, url, fit, size} = Object.assign({...defaults}, props.settings);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        const form = e.target
        const newSettings = {...props.settings};
        newSettings.name = form.name.value || undefined;
        newSettings.url = form.url.value;
        newSettings.fit = form.fit.value;
        newSettings.size = form.size.value;
        props.onUpdate(newSettings);
    }

    return (
        <form id="settings-form" onSubmit={onFormSubmit}>
            <label>Custom Title</label>
            <input type="text" name="name" defaultValue={name}/>
            <label>Image URL (png, jpg, gif, etc.)</label>
            <input required type="text" name="url" defaultValue={url}/>
            <label>Fit Options</label>
            <select name="fit" defaultValue={fit}>
                {Object.values(FitOptions).map(fitOption => 
                    <option key={fitOption} value={fitOption}>{fitOption}</option>
                )}
            </select>
            <label>Widget Size</label>
            <select name="size" defaultValue={size}>
                {Object.values(WidgetSizes).map(sizeOption => 
                    <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                )}
            </select>
            <div id="settings-button-container">
                <div onClick={props.onCancel}>Cancel</div>
                <button type="submit">Confirm</button>
            </div>
        </form>
    )
}
