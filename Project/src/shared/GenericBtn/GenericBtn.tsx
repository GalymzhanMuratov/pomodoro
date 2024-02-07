import React from "react";
import styles from './genericbtn.css'

type BtnProps = {
    text: string;
    _type?: "button" | "submit" | "reset" | undefined;
    classtype?: "button" | 'delete' | 'stop' | 'editsave';
    onClick?: (e: any) => void
}

const NOOP = () => { }

export function GenericBtn({ text, _type = 'button', classtype = 'button', onClick = NOOP }: BtnProps) {
    return (
        <button className={classtype === 'delete' ? styles.delete : classtype === 'editsave' ? styles.editsave : classtype === 'stop' ? styles.stop : styles.button}
            type={_type}
            onClick={onClick}>
            {text}
        </button>
    )
}