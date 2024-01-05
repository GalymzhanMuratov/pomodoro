import React from "react";
import styles from './currentdate.css'
interface DateProps {
    day: string | undefined;
    timetoday: string | undefined;
}


export function CurrentDate({ day, timetoday = 'Нет данных' }: DateProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{day = 'Понедельник'}</h3>
            {timetoday === 'Нет данных' && (
                <p>  {timetoday} </p>
            )}
            {timetoday !== 'Нет данных' && (
                <p>
                    Вы работали над задачами в течение <span className={styles.red}>{timetoday}</span>
                </p>
            )}

        </div>
    )
}