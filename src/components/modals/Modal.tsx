interface ModalProps {
    onClose: any,
    children: any
    className?: string
}

function Modal(props: ModalProps) {
    const {onClose, children, className = ''} = props;
    return (
        <div id="modal-component">
            <div id="modal-background" onClick={onClose}/>
            <div id="modal-content" className={className}>
                <svg id="close-modal-button" height="24" width="24" onClick={props.onClose}>
                    <use href="#close"/>
                </svg>
                {children}
            </div>
        </div>
    );
}

export default Modal;