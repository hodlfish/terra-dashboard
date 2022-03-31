import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useRef, useState } from "react";
import { downloadJSON } from "scripts/Helpers";
import { deleteTheme, duplicateTheme, getDefaultTheme, getEmptyTheme, getTheme, getThemes, isThemeData, saveTheme, setDefaultTheme, ThemeData } from "scripts/storage/theme-storage";
import { applyThemeSettings, ThemeSetting, ThemeSettings, ThemeSettingType } from "scripts/Themes";
import { templates } from "templates/ThemeDefaults";
import TextBox from "./TextBox";

function ThemeSettingsPanel() {
    const inputFile = useRef<any>();
    const [themes, setThemes] = useGlobalState('themes');
    const [selectedTheme, setSelectedTheme] = useGlobalState('selectedTheme');
    const [customThemes, setCustomThemes] = useState<ThemeData[]>([]);

    useEffect(() => {
        const data = themes.themes.map(id => getTheme(id));
        if (data !== undefined) {
            setCustomThemes((data || []) as ThemeData[]);
        } else {
            setCustomThemes([]);
        }
    }, [themes, selectedTheme]);

    const onSelectTheme = (theme: ThemeData) => {
        applyThemeSettings(theme.settings);
        setDefaultTheme(theme);
        setSelectedTheme(theme);
    }

    const onSetThemeName = (theme: ThemeData, newName: string) => {
        const updatedTheme = {...theme};
        updatedTheme.name = newName;
        saveTheme(updatedTheme);
        setThemes({...getThemes()});
    }

    const onDuplicateTheme = (theme: ThemeData) => {
        const newTheme = duplicateTheme(theme);
        saveTheme(newTheme);
        onSelectTheme(newTheme);
        setThemes({...getThemes()});
    }

    const onRemoveTheme = (theme: ThemeData) => {
        deleteTheme(theme.id);
        onSelectTheme(getDefaultTheme());
        setThemes({...getThemes()});
    }

    const onValueUpdated = (e: any) => {
        let value = e.target.value;
        const key = e.target.name;
        const themeSetting = ThemeSettings[key];
        
        if (themeSetting.type === ThemeSettingType.NUMBER && themeSetting.min !== undefined && themeSetting.max !== undefined) {
            value = parseInt(value);
            value = Math.min(Math.max(value, themeSetting.min), themeSetting.max);
            e.target.value = value;
        }
        if (themeSetting.formatter != null) {
            value = themeSetting.formatter.replace('?', value);
        }
        const newSettings = {...selectedTheme.settings};
        newSettings[key] = value;
        selectedTheme.settings = newSettings;
        saveTheme(selectedTheme)
        applyThemeSettings(newSettings);
    }

    const getDefaultValue = (key: string) => {
        const themeSetting = ThemeSettings[key];
        let value = selectedTheme.settings[key];
        if (themeSetting.formatter != null) {
            const formatSections = themeSetting.formatter.split('?');
            formatSections.forEach(formatSection => value = value.replace(formatSection, ''));
        }
        return value;
    }

    const createNewTheme = () => {
        const newTemplate = getEmptyTheme();
        setSelectedTheme(newTemplate);
        setThemes({...getThemes()});
    }

    const onDownloadTheme = (theme: ThemeData) => {
        downloadJSON(theme.name, theme);
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
                    let uploadedTheme = JSON.parse(data.target?.result as string) as ThemeData;
                    const valid = isThemeData(uploadedTheme);
                    if (!valid) {
                        alert('Invalid theme JSON.')
                        return;
                    }
                    uploadedTheme = duplicateTheme(uploadedTheme, uploadedTheme.name);
                    applyThemeSettings(uploadedTheme.settings);
                    setThemes({...getThemes()});
                    setSelectedTheme(uploadedTheme);
                } catch (error) {
                    console.log(error)
                    alert('Unexpected upload value.  Please check the file format.')
                }
            });
            reader.readAsText(f);
            e.target.value = null;
        }
    }

    const renderTheme = (theme: ThemeData, editable: boolean) => {
        const isSelected = selectedTheme.id === theme.id;
        return (
            <div className={'list-item' + (isSelected ? ' selected' : '')} key={theme.id} >
                <div className="list-item-header" onClick={() => onSelectTheme(theme)}>
                    <div className="list-item-title">
                        { editable ?
                            <TextBox value={theme.name} onUpdate={(newValue: string) => onSetThemeName(theme, newValue)}/>
                            :
                            <>{theme.name}</>
                        }
                    </div>
                    <div className="list-item-toolbar" onClick={(e) => e.stopPropagation()}>
                        <svg className="toolbar-item" height="28" width="28" onClick={() => onDuplicateTheme(theme)}>
                            <use href="#copy"/>
                        </svg>
                        <svg className="toolbar-item" height="28" width="28" onClick={() => onDownloadTheme(theme)}>
                            <use href="#download"/>
                        </svg>
                        {editable &&
                            <svg className="toolbar-item" height="28" width="28" onClick={() => onRemoveTheme(theme)}>
                                <use href="#trash"/>
                            </svg>
                        }
                    </div>
                </div>
                {(isSelected && editable) &&
                    <div className="theme-settings">
                        {Object.entries(ThemeSettings).map(([variableName, themeSettings]) => 
                            renderSetting(variableName, themeSettings)
                        )}
                    </div>
                }
            </div>
        );
    }

    const renderSetting = (key: string, themeSettings: ThemeSetting) => {
        if (themeSettings.type == ThemeSettingType.COLOR) {
            return (
                <div className="setting-item" key={key}>
                    <div className="setting-item-title">{themeSettings.name}</div>
                    <input className="setting-item-tool" name={key} type="color" defaultValue={getDefaultValue(key)} onChange={e => onValueUpdated(e)}/>
                </div>
            );
        } else {
            return (
                <div className="setting-item" key={key}>
                    <div className="setting-item-title">{themeSettings.name}</div>
                    <input className="setting-item-tool" name={key} type="number" step={1} min={themeSettings.min} max={themeSettings.max} defaultValue={getDefaultValue(key)} onChange={e => onValueUpdated(e)}/>
                </div>
            );
        }
    }

    return (
        <div id="theme-settings-component">
            {Object.values(templates).map(theme => 
                renderTheme(theme, false)
            )}
            {Object.values(customThemes).map(theme => 
                renderTheme(theme, true)
            )}
            <div className="list-item-footer">
                <div className="footer-button" onClick={() => createNewTheme()}>New</div>
                <div className="footer-button" onClick={() => onUploadFileClicked()}>Upload
                    <input ref={inputFile} type='file' 
                        accept=".json"
                        style={{display: 'none'}} 
                        onChange={onUploadFile}
                    />
                </div>
            </div>
        </div>
    );
  }
    
  export default ThemeSettingsPanel;
  