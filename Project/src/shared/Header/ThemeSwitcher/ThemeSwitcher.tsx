import React from "react";
import styles from './themeSwitcher.css'

type ThemeProps = {
    handleChange: () => void;

}

export function ThemeSwitcher({ handleChange }: ThemeProps) {
    return (
        <div>
            <input type="checkbox" id="check" className={styles.toggle} onChange={handleChange} />
            <label htmlFor="check">Поменять цветовую тему</label>
        </div>
    )
}