import React from "react";
import styles from './pomodorocount.css'
import { EIcons, Icon } from "../../Icons";


interface PomodoroCount {
    pomodors?: number
}

export function PomodoroCount({ pomodors = 0 }: PomodoroCount) {
    return (
        <div className={styles.container}>
            {pomodors === 0 && (
                <div className={styles.content}>
                    <Icon name={EIcons.tomato2} />
                </div>
            )}

            {pomodors > 0 && (
                <div className={styles.content}>
                    <Icon name={EIcons.tomato} />
                    <p className={styles.xcounter}> x {pomodors}</p>
                    <div className={styles.down}>
                        <div>{pomodors} помидора </div>
                    </div>
                </div>
            )}
        </div>
    )
}