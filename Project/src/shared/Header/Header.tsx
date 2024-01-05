import * as React from 'react'
import styles from "./header.css";
import { LogoIcon, StatsIcon } from '../Icons'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.cont}>
                    <Link to={'/'} className={styles.center}>
                        <LogoIcon />
                        <h1 className={styles.logotitle}>pomodoro_box</h1>
                    </Link>
                    <Link to={'/stats'} className={styles.center2}>
                        <StatsIcon />
                        <span className={styles.link}>Статистика</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}