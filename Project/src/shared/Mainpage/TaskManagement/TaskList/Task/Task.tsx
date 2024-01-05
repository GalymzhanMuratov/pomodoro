import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './task.css'
import { Dropdown } from "./Dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { editTask } from "../../../../../store/tasks/tasksSlice";

interface ITaskProps {
    name: string;
    id: number;
    amount: number;
}

type TaskStatus = 'neutral' | 'modalEdit';



export function Task({ name, id, amount }: ITaskProps) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState<TaskStatus>('neutral')
    const [editName, setEditName] = useState(name)

    const openEdit = () => {
        setStatus('modalEdit')
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditName(event.target.value)
    }

    const handleSave = () => {
        dispatch(editTask({ id: id, name: editName }))
        setStatus('neutral')
    }


    useEffect(() => {

    }, [status])

    return (



        <li className={styles.container}>
            {status === 'neutral' && (
                <div className={styles.neutralwrap}>

                    <div className={styles.wrapper}>
                        <span className={styles.amount}>{amount}</span>
                        <p>{name}</p>
                    </div>
                    <Dropdown myid={id} onEditClick={openEdit} />
                </div>
            )}
            {status === 'modalEdit' && (
                <div className={styles.wrapper}>
                    <div className={styles.editwrap}>
                        <input className={styles.editinput} type="text" value={editName} onChange={handleNameChange}></input>
                        <button className={styles.savebtn} onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}

        </li>
    )
}
