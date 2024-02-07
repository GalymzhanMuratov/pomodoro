import * as React from 'react'
import styles from "./header.css";
import { EIcons, Icon } from '../Icons'
import { Link } from 'react-router-dom'
import { ThemeSwitcher } from './ThemeSwitcher';


type ThemeProps = {
    handleChange: () => void;

}


export function Header({ handleChange }: ThemeProps) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.cont}>
                    <Link to={'/'} className={styles.center}>
                        <Icon name={EIcons.logo} />
                        <h1 className={styles.logotitle}>pomodoro_box</h1>
                    </Link>

                    <div>
                        <ThemeSwitcher handleChange={handleChange} />
                        <Link to={'/stats'} className={styles.center2}>
                            <Icon name={EIcons.stats} />
                            <span className={styles.link}>Статистика</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}