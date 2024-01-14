import React, { useEffect, useState } from "react";
import styles from './timer.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { decreaseAmountAuto, removeTask } from "../../../../store/tasks/tasksSlice";
import checkPageStatus from '../../../../../utils/checkpagestatus'
import { GenericBtn } from "../../../GenericBtn";

type TimerProps = {
    workMinutes: number;
    breakMinutes: number;
}

type taskCycle = 'task1' | 'task2' | 'task3' | 'break1' | 'break2' | 'bigbreak'

export function Timer() {
    const breakMinRedux = useSelector((state: RootState) => state.timersettings.breakMinutes)
    const bigbreakMinRedux = useSelector((state: RootState) => state.timersettings.bigbreakMinutes)
    const workMinRedux = useSelector((state: RootState) => state.timersettings.workMinutes)
    const initseconds = workMinRedux * 60
    const taskslist = useSelector((state: RootState) => state.tasks.list)
    const current = taskslist[0]

    const dispatch = useDispatch()

    const [currentPom, setCurrentPom] = useState<number>(1)
    const [isActive, setActive] = useState(false);
    const [isTask, setTask] = useState<taskCycle>('task1');
    const [minutes, setMinutes] = useState<number>(Number(workMinRedux));
    const [seconds, setSeconds] = useState<number>(initseconds % 60);

    function toggleTimer() {
        setActive(!isActive);
    }

    function addTime() {
        setMinutes(minutes + 1)
    }

    function monitorCurrentPom() {
        if (current && current.amount > 1) {
            setCurrentPom(currentPom + 1)
            return
        } else {
            setCurrentPom(1)
            return
        }
    }

    function decreaseCurrent() {
        if (current) {
            dispatch(decreaseAmountAuto({ id: current.id }))
            monitorCurrentPom();
        }
    }


    function resetTimer() {
        setActive(false);

        switch (isTask) {
            case 'task1': {
                decreaseCurrent()
                setTask('break1');
                setMinutes(breakMinRedux);
                setSeconds(0);
                break
            }
            case 'task2': {
                decreaseCurrent()
                setTask('break2');
                setMinutes(breakMinRedux);
                setSeconds(0);
                break
            }
            case 'task3': {
                decreaseCurrent()
                setTask('bigbreak');
                setMinutes(bigbreakMinRedux);
                setSeconds(0);
                break
            }
            case 'break1': {
                setTask('task2');
                setMinutes(workMinRedux);
                setSeconds(0);
                break
            }
            case 'break2': {
                setTask('task3');
                setMinutes(workMinRedux);
                setSeconds(0);
                break
            }
            case 'bigbreak': {
                setTask('task1');
                setMinutes(workMinRedux);
                setSeconds(0);
                break
            }
        }
    }

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isActive) {
            intervalId = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        checkPageStatus('Время вышло!')
                        resetTimer()
                        clearInterval(intervalId);
                        return;
                    }
                    setSeconds(59);
                    setMinutes((prevMinutes) => prevMinutes - 1);
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, minutes, seconds, breakMinRedux, workMinRedux]);

    useEffect(() => {
        if (current && current.amount === 0) {
            dispatch(removeTask({ id: current.id }))
        }

    }, [current])

    return (
        <div className={styles.container}>
            <div className={isActive ? isTask === 'task1' ? styles.upperAct : isTask === 'task2' ? styles.upperAct : isTask === 'task3' ? styles.upperAct : styles.upperBre : styles.upperNeut}>
                <h3 className={styles.title}>{current ? current.name : "Текущая задача"}</h3>
                <span className={styles.taskname}>{isActive ? isTask === 'task1' ? "Помидор" : isTask === 'task2' ? "Помидор" : isTask === 'task3' ? "Помидор" : "Перерыв" : "Помидор"} {currentPom}</span>
            </div>
            <div className={styles.wrap}>
                <div className={isActive ? isTask === 'task1' ? styles.textAct : isTask === 'task2' ? styles.textAct : isTask === 'task3' ? styles.textAct : styles.textBreak : styles.text}>
                    {minutes} : {seconds < 10 ? '0' + seconds : seconds}
                    <div onClick={addTime} className={styles.plus}> + </div>
                </div>
                <span className={styles.taskbody}><span className={styles.taskbody2}>Задача 1</span> - {current ? current.name : "Текущая задача"} </span>
                <div className={styles.wrapper}>
                    <GenericBtn
                        text={isActive ? 'Пауза' : 'Старт'}
                        onClick={toggleTimer}
                    />
                    <GenericBtn
                        text={isActive ? 'Пропустить' : 'Стоп'}
                        classtype="stop"
                        onClick={resetTimer}
                    />
                </div>
            </div>
        </div>
    )
}