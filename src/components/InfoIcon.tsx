interface InfoIconProps {
    info: string,
    right?: boolean
}

function InfoIcon(props: InfoIconProps) {
    const {info, right = true} = props;
    return (
        <div id="info-icon-component">
            <svg height="16" width="16">
                <use href="#info"/>
            </svg>
            <div className={(right)?'hang-right':'hang-left'}>{info}</div>
        </div>
    );
}

export default InfoIcon;