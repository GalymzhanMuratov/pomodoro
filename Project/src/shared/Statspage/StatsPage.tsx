import React, { Children } from "react";
import styles from './statspage.css'
import { CurrentDate } from "./CurrentDate";
import { PomodoroCount } from "./PomodoroCount";
import { StatsDisplay } from "./StatsDisplay";
import { Select } from "./Select";
import Graph from "./Graph/Graph";


const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    values: [55, 85, 50, 110, 40, 0, 0]
};

export type StatsProps = {
    totaltime: number;
    pausetime: number;
    pauses: number;
    day?: string;
    timetoday?: string;
    pomodors?: number;
}

export function StatsPage(props: StatsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <h2>Ваша активность</h2>
                <Select />
            </div>
            <div className={styles.grid}>
                <div className={styles.div1}>
                    <CurrentDate day={props.day} timetoday={props.timetoday} />
                </div>
                <div className={styles.div2}>
                    <PomodoroCount pomodors={props.pomodors} />
                </div>
                <div className={styles.div3}>
                    <Graph data={data} />
                </div>
                <div className={styles.div4}>
                    <StatsDisplay totaltime={props.totaltime} pausetime={props.pausetime} pauses={props.pauses} />
                </div>
            </div>
        </div>
    )
}