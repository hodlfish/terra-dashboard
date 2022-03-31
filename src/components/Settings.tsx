import ThemeSettings from "./ThemeSettings";

function Settings() {
  return (
    <div id="settings-component">
        <div id="settings-toolbar">

        </div>
        <div id="settings-items">
            <div className="settings-item">
                <div className="settings-item-title">Themes</div>
                <div className="settings-item-content">
                    <ThemeSettings/>
                </div>
            </div>
            <div className="settings-item">
                <div className="settings-item-title">Data Management</div>
                <div className="settings-item-content">
                    TODO
                </div>
            </div>
        </div>
    </div>
  );
}
  
export default Settings;
