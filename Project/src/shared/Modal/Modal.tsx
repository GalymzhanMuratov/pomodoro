import React, { useEffect, useRef } from "react";
import styles from './modal.css'
import ReactDOM from "react-dom";

interface IModal {
    onClose?: () => void
    onDelete: () => void
}

export function Modal(props: IModal) {


    useEffect(() => {
        console.log('ABOBO')
        const handleClick = (event: MouseEvent) => {
            const modalPortal = document.querySelector("#modalPortal")
            console.log('GG', modalPortal)
            if (modalPortal && modalPortal === event.target) {
                console.log(event.target)
                props.onClose?.();
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, [props.onClose])

    const node = document.querySelector('#modal_root')
    if (!node) return null;
    return ReactDOM.createPortal((
        <div className={styles.modal}>
            <div className={styles.overlay} id="modalPortal" ></div>
            <div className={styles.modalContent}>
                <h3 className={styles.title}>Удалить задачу?</h3>
                <button onClick={props.onDelete} className={styles.deletebtn}>Удалить</button>
                <div onClick={props.onClose} className={styles.cancel}>Отмена</div>
                <div onClick={props.onClose} className={styles.cross}>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.9115 8.80583L2.84406 13.9567L0.961665 12.0433L6.02911 6.89245L1.0675 1.84914L2.85992 0.0272091L7.82153 5.07052L12.7673 0.0433371L14.6497 1.95672L9.70392 6.9839L14.6655 12.0272L12.8731 13.8491L7.9115 8.80583Z" fill="#C4C4C4" />
                    </svg>
                </div>
            </div>

        </div>
    ), node)
}