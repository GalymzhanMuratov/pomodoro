import React, { useEffect, useState } from "react";
import styles from './timersettings.css'
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { setBigBreak, setBreak, setWork } from "../../../../store/timersettings/timersettingsSlice";

type TTProps = {
    toggle: () => void;
}

export function TimerSettings({ toggle }: TTProps) {
    const breakMinRedux = useSelector((state: RootState) => state.timersettings.breakMinutes)
    const bigbreakMinRedux = useSelector((state: RootState) => state.timersettings.bigbreakMinutes)
    const workMinRedux = useSelector((state: RootState) => state.timersettings.workMinutes)

    const dispatch = useDispatch()

    function changeWorkDur(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setWork(e.target.value))
    }
    function changeBreakDur(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setBreak(e.target.value))
    }
    function changeBigBreakDur(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setBigBreak(e.target.value))
    }

    useEffect(() => {

    }, [breakMinRedux, workMinRedux])

    const node = document.querySelector('#modal_root')
    if (!node) return null;
    return (
        <div className={styles.container}>

            <h1 className={styles.title}>
                Установите время для работы и отдыха.
            </h1>
            <div >
                <form >
                    <div>
                        <label >
                            Укажите время 1 помидорки для работы (в минутах):
                        </label>
                        <input
                            type="number"
                            value={workMinRedux}
                            onChange={changeWorkDur}
                        />
                    </div>
                    <div >
                        <label >
                            Укажите время для 1 короткого перерыва (в минутах):
                        </label>
                        <input
                            type="number"
                            value={breakMinRedux}
                            onChange={changeBreakDur}
                        />
                    </div>
                    <div className={styles.lastlabel} >
                        <label >
                            Укажите время для 1 длинного перерыва (в минутах):
                        </label>
                        <input
                            type="number"
                            value={bigbreakMinRedux}
                            onChange={changeBigBreakDur}
                        />
                    </div>


                    <button className={styles.btn} onClick={toggle}>
                        Сохранить настройки
                    </button>
                </form>
            </div>
        </div>
    )
}