import React, { useEffect, useState } from "react";
import styles from './droplist.css'
import ReactDOM from "react-dom";
import { EIcons, Icon } from "../../../../../../Icons";
import { useDispatch, useSelector } from "react-redux";
import { addAmount, decreaseAmount, removeTask } from "../../../../../../../store/tasks/tasksSlice";
import { RootState } from "../../../../../../../store/store";
import { Modal } from "../../../../../../Modal/Modal"

type Coords = {
    left: number;
    top: number;
    width: number;
};

interface DropListProps {
    coords: Coords;
    myid: number;
    onClose: () => void;
    onEditClick: () => void;
}

export function DropList({ coords, myid, onClose, onEditClick }: DropListProps) {
    const node = document.querySelector('#modal_root')
    if (coords == null) return null;
    if (!node) return null;

    const tasks = useSelector((state: RootState) => state.tasks.list);
    const task = tasks.find((task) => task.id === myid);
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const addClick = () => {
        console.log('Click, myid:', myid)

        dispatch(addAmount({ id: myid }))
    }
    const decreaseClick = () => {
        if (task) {
            dispatch(decreaseAmount({ id: myid }))
        }
    }

    const editClick = () => {
        if (task) {
            onEditClick()
        }
    }

    const removeClick = () => {
        if (task) {
            setIsModalOpen(true)
        }
    }

    const deleteTask = () => {
        if (task) {
            dispatch(removeTask({ id: myid }))
        }
    }

    useEffect(() => {

    }, [tasks, task])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const portal = document.querySelector("#portal-drop-list");
            if (portal && !portal.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        if (isModalOpen) {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose, isModalOpen]);


    return ReactDOM.createPortal((
        <div>

            <ul
                id="portal-drop-list"
                className={styles.menuItemsList}
                style={{
                    position: "absolute",
                    left: `${coords.left}px`,
                    top: `${coords.top}px`,
                }}>
                <li >
                    <div className={styles.menuLinkDesc} onClick={addClick}>
                        <div>
                            <Icon name={EIcons.zoomin} />
                        </div>
                        Увеличить
                    </div>
                </li>
                <li>
                    <div className={styles.menuLinkDesc} onClick={decreaseClick} >
                        <div>
                            <Icon name={EIcons.zoomout} />
                        </div>
                        Уменьшить
                    </div>
                </li>
                <li>
                    <div className={styles.menuLinkDesc} onClick={editClick}>
                        <div>
                            <Icon name={EIcons.edit} />
                        </div>
                        Редактировать
                    </div>
                </li>
                <li>
                    <div className={styles.menuLinkDesc} onClick={removeClick}>
                        <div>
                            <Icon name={EIcons.delete} />
                        </div>
                        Удалить
                    </div>
                </li>
            </ul>

            {isModalOpen && (
                <div>

                    <Modal
                        onClose={onClose}
                        onDelete={deleteTask}
                    />
                </div>
            )}
        </div>
    ), node);
}