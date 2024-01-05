import React, { useEffect, useState } from "react";
import styles from './tasklist.css'
import { Task } from "./Task/Task";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

export function TaskList() {
    const taskslist = useSelector((state: RootState) => state.tasks.list)
    const [sumAmount, setSumAmount] = useState<number>(0)
    const [sumDisplayed, setSumDisplayed] = useState<string>('')



    useEffect(() => {
        if (taskslist) {
            const sum = taskslist.reduce((acc, task) => acc + task.amount, 0)
            setSumAmount(sum)
        }
    }, [taskslist])

    useEffect(() => {

        const displayedhours = Math.floor(sumAmount * 25 / 60)
        const displayedminutes = sumAmount * 25 % 60
        const displayedvalueFunc = () => {
            if (displayedhours === 0 && displayedminutes !== 0) {
                const displayedvalue = `${displayedminutes} минут`
                return displayedvalue
            } if (displayedhours === 1) {
                const displayedvalue = `${displayedhours} час ${displayedminutes} минут`
                return displayedvalue
            }
            if (displayedhours > 1 && displayedhours < 5) {
                const displayedvalue = `${displayedhours} часа ${displayedminutes} минут`
                return displayedvalue
            }
            if (displayedhours >= 5) {
                const displayedvalue = `${displayedhours} часов ${displayedminutes} минут`
                return displayedvalue
            }
            return ''
        }

        setSumDisplayed(displayedvalueFunc())
    }, [sumAmount])

    return (
        <div>

            <ul className={styles.list}>
                {taskslist && taskslist.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        amount={task.amount}
                    />
                ))}
            </ul>
            <span className={styles.amount}>{sumDisplayed}</span>
        </div>
    )
}