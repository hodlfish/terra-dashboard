import { DataSource } from 'scripts/Settings';

interface DataSourceProps {
    links: DataSource[]
}

function DataSourceComponent(props: DataSourceProps) {
    return (
        <div id="data-source-component">
            <svg>
                <use href="#info"/>
            </svg>
            <span className="label">Powered by</span>
            {props.links.map((link, index) => 
                <span key={link.name}>
                    {index > 0 && ", "}
                    <a href={link.infoUrl} target="_blank" rel="noreferrer">{link.name}</a>
                </span>
            )}
        </div>
    )
}

export default DataSourceComponent;
