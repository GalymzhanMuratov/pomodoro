import * as React from "react";
import { MenuIcon } from "../../../../../../Icons/MenuIcon";
import styles from './menu.css'

export function Menu() {
    return (
        <button className={styles.menuButton}>
            <MenuIcon />
        </button>
    )
}