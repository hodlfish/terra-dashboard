import { useState, useRef } from "react";
import ClickAwayListener from 'react-click-away-listener';

interface TextBoxProps {
    value: string,
    maxChars?: number,
    onUpdate: any
}

function TextBox(props: TextBoxProps) {
    const {value, maxChars = 32, onUpdate} = props;
    const inputEl = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState<boolean>(false);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        let newValue = e.target.input.value;
        if (!newValue || newValue.length === 0) {
            newValue = 'Untitled';
        }
        onUpdate(newValue);
        setEditing(false);
    }

    const onStartEditing = (e: any) => {
        e.stopPropagation();
        if (inputEl.current) {
            inputEl.current.focus();
            inputEl.current.value = value;
        }
        setEditing(true);
    }

    return (
        <ClickAwayListener onClickAway={() => setEditing(false)}>
            <div id="text-box-component">
                <form id="text-edit" className={!editing ? 'hidden' : ''} autoComplete="off" onSubmit={onFormSubmit}>
                    <input type="text" ref={inputEl} autoComplete="off" name="input" maxLength={maxChars} defaultValue={value}/>
                    <button type="submit"  onClick={(e) => e.stopPropagation()}>
                        <svg width="32" height="32" className="button-icon">
                            <use href="#save"/>
                        </svg>
                    </button>
                    <button type="button" onClick={() => setEditing(false)}>
                        <svg width="24" height="24" className="button-icon">
                            <use href="#close"/>
                        </svg>
                    </button>
                </form>
                <div id="text-display" className={editing ? 'hidden' : ''}>
                    <div id="display-value">{value}</div>
                    <svg width="28" height="28" id="edit-icon" onClick={e => onStartEditing(e)}>
                        <use href="#edit"/>
                    </svg>
                </div>
            </div>
        </ClickAwayListener>
    );
}

export default TextBox;
