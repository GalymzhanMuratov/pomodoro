import React from "react";
import styles from './statsdisplay.css'
import { StatsProps } from "../StatsPage";
import { FocusIcon, FocusIcon2, PauseIcon, PauseIcon2, PausetimeIcon, PausetimeIcon2 } from "../../Icons";

export function StatsDisplay({ totaltime, pausetime, pauses }: StatsProps) {
    const focus = Math.floor((totaltime - pausetime) / totaltime * 100)
    return (
        <div className={styles.container}>
            {focus === 0 && (
                <div className={styles.content}>
                    <div>
                        <h3 className={styles.title}>Фокус</h3>
                        <p className={styles.stat}>{focus} %</p>
                    </div>
                    <div>
                        <FocusIcon />
                    </div>
                </div>
            )}

            {focus !== 0 && (
                <div className={styles.contentfocus}>
                    <div>
                        <h3 className={styles.title}>Фокус</h3>
                        <p className={styles.stat}>{focus} %</p>
                    </div>
                    <div>
                        <FocusIcon2 />
                    </div>
                </div>
            )}

            {pausetime === 0 && (
                <div className={styles.content}>
                    <div>
                        <h3 className={styles.title}>Время на паузе</h3>
                        <p className={styles.stat}>{pausetime}м</p>
                    </div>
                    <PausetimeIcon />
                </div>
            )}
            {pausetime !== 0 && (
                <div className={styles.contentpausetime}>
                    <div>
                        <h3 className={styles.title}>Время на паузе</h3>
                        <p className={styles.stat}>{pausetime}м</p>
                    </div>
                    <PausetimeIcon2 />
                </div>
            )}

            {pauses === 0 && (
                <div className={styles.content}>
                    <div>
                        <h3 className={styles.title}>Остановки</h3>
                        <p className={styles.stat}>{pauses}</p>
                    </div>
                    <PauseIcon />
                </div>
            )}
            {pauses !== 0 && (
                <div className={styles.contentpauses}>
                    <div>
                        <h3 className={styles.title}>Остановки</h3>
                        <p className={styles.stat}>{pauses}</p>
                    </div>
                    <PauseIcon2 />
                </div>
            )}

        </div>
    )
}