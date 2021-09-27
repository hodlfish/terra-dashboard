import { useState, useCallback } from "react";
import Panel, { WidgetProps } from "components/panels/Panel";
import { defaults, Settings, SettingsPanel } from './MineProjectsSettings';
import { getPylonProjects, PylonProject } from "scripts/Terra/Pylon";

const linkIcons = new Map<string, string>([
    ['Twitter', '#twitter'],
    ['Website', '#website'],
    ['Telegram', '#telegram']
])

function MineProjectsPanel(props: WidgetProps) {
    const {name} = Object.assign({...defaults}, props.settings as Settings);
    const [projects, setProjects] = useState<PylonProject[]>([]);

    const refresh = useCallback(async () => {
        const projects = await getPylonProjects();
        return () => {
            setProjects(projects);
        }
    }, []);

    const onProjectClicked = (project: PylonProject) => {
        window.open(`https://gateway.pylon.money/tokens/${project.symbol.toLocaleLowerCase()}`, '_blank');
    }

    return (
        <Panel
            title={name}
            svg={'pylon'}
            size={'medium'}
            events={props.events}
            refresh={refresh}
            content={
                <div id="pylon-projects">
                    {projects.map(p => 
                        <div key={p.name} className="project-block" onClick={() => onProjectClicked(p)}>
                            <div className="project-title">{p.name} - ${p.symbol}</div>
                            <div>{p.summary}</div>
                            <div onClick={e => e.stopPropagation()}>
                                {p.links.map(l => 
                                    <a key={l.name} href={l.href} target="_blank" rel="noreferrer">
                                        <svg>
                                            <use href={linkIcons.get(l.name)}/>
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            }
            settingsComponent={SettingsPanel}
            settings={props.settings}
        />
    );
}

export default MineProjectsPanel;
