import React from "react";
import styles from './pomodorocount.css'
import { TomatoIcon } from "../../Icons";
import { TomatoIcon2 } from "../../Icons/TomatoIcon2";

interface PomodoroCount {
    pomodors?: number
}

export function PomodoroCount({ pomodors = 0 }: PomodoroCount) {
    return (
        <div className={styles.container}>
            {pomodors === 0 && (
                <div className={styles.content}>
                    <TomatoIcon2 />
                </div>
            )}

            {pomodors > 0 && (
                <div className={styles.content}>
                    <TomatoIcon />
                    <p className={styles.xcounter}> x {pomodors}</p>
                    <div className={styles.down}>
                        <div>{pomodors} помидора </div>
                    </div>
                </div>
            )}
        </div>
    )
}