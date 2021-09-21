function Loading() {
    return (
        <div id="loading-component">
            <svg id="terra-icon" height="64" width="64">
                <use href="#terra"/>
            </svg>
            <svg id="luna-icon" height="18" width="18">
                <use href="#luna"/>
            </svg>
            <svg id="luna-icon" className="delay-1" height="18" width="18">
                <use href="#luna"/>
            </svg>
            <svg id="luna-icon" className="delay-2" height="18" width="18">
                <use href="#luna"/>
            </svg>
        </div>
    );
}

export default Loading;