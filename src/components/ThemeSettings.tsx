import { useGlobalState } from "hooks/useGlobalState";
import { useEffect, useState } from "react";
import { deleteTheme, duplicateTheme, getDefaultTheme, getTheme, getThemes, saveTheme, setDefaultTheme, ThemeData } from "scripts/storage/theme-storage";
import { applyThemeSettings, ThemeSetting, ThemeSettings, ThemeSettingType } from "scripts/Themes";
import { templates } from "templates/ThemeDefaults";
import TextBox from "./TextBox";

function ThemeSettingsPanel() {
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

    const selectTheme = (theme: ThemeData) => {
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

    const duplicate = (theme: ThemeData) => {
        const newTheme = duplicateTheme(theme);
        saveTheme(newTheme);
        selectTheme(newTheme);
        setThemes({...getThemes()});
    }

    const removeTheme = (theme: ThemeData) => {
        deleteTheme(theme.id);
        selectTheme(getDefaultTheme());
        setThemes({...getThemes()});
    }

    const renderTheme = (theme: ThemeData, editable: boolean) => {
        const isSelected = selectedTheme.id === theme.id;
        return (
            <div className={'theme' + (isSelected ? ' selected' : '')} key={theme.id} >
                <div className="theme-header" onClick={() => selectTheme(theme)}>
                    <div className="theme-title">
                        { editable ?
                            <TextBox value={theme.name} onUpdate={(newValue: string) => onSetThemeName(theme, newValue)}/>
                            :
                            <>{theme.name}</>
                        }
                    </div>
                    <div className="theme-toolbar" onClick={(e) => e.stopPropagation()}>
                        <svg className="toolbar-item" height="28" width="28" onClick={() => duplicate(theme)}>
                            <use href="#copy"/>
                        </svg>
                        {editable &&
                            <svg className="toolbar-item" height="28" width="28" onClick={() => removeTheme(theme)}>
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
      </div>
    );
  }
    
  export default ThemeSettingsPanel;
  