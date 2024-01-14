import React, { useEffect } from "react";
import styles from './modal.css'
import ReactDOM from "react-dom";
import { EIcons, Icon } from "../Icons";
import { GenericBtn } from "../GenericBtn";

interface IModal {
    onClose?: () => void
    onDelete: () => void
}

export function Modal(props: IModal) {


    useEffect(() => {
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
                <GenericBtn
                    text="Удалить"
                    classtype="delete"
                    onClick={props.onDelete}
                />
                <div onClick={props.onClose} className={styles.cancel}>Отмена</div>
                <div onClick={props.onClose} className={styles.cross}>
                    <Icon name={EIcons.cross} />
                </div>
            </div>

        </div>
    ), node)
}